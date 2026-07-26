---
slug: "data-platform-iceberg-cow"
title: "Iceberg COW MERGE INTO가 변경 없는 파일까지 재작성하는 이유"
date: "2026-07-26"
category: "Data Platform"
tag: ["데이터플랫폼", "Iceberg", "Spark"]
---

### Intro
`Copy-On-Write(COW)`는 `Iceberg` 같은 데이터 레이크 테이블 포맷에서 행 단위 변경(`UPDATE`/`DELETE`/`MERGE`)이 발생했을 때, 변경된 행이 포함된 파일 전체를 새로 복사해서 다시 쓰는 방식이다.
읽는 시점에는 데이터 파일만 그대로 읽으면 되므로 읽기 성능이 좋지만, 그 대가는 쓰기 시점에 치른다.
#
이 트레이드오프의 크기는 결국 "몇 개의 파일이, 몇 바이트나 다시 쓰이는가"에 달려 있다.
그런데 최근 겪은 사례를 보면 이 재작성 범위가 직관과는 전혀 다르게 결정된다는 것을 알 수 있었다. `WHEN`절에 값 비교 조건을 넣어 "최적화했다"고 믿었던 `MERGE` 쿼리가, 실제로는 값이 하나도 바뀌지 않은 파일까지 통째로 다시 쓰고 있었다.

### 문제 상황
`patient` 테이블은 `COW` 모드로 운영되며 파일 3개로 구성되어 있다.
```
file_A.parquet : pk 1, 2, 3, 4
file_B.parquet : pk 5, 6, 7, 8
file_C.parquet : pk 9, 10, 11, 12
```
#
소스 테이블 `tmp_patient`에는 3개 행이 변경분으로 들어와 있다. `pk=2`는 값이 타깃과 완전히 동일한 `no-op`이고, `pk=6`은 `name` 컬럼이 실제로 바뀐 실변경이며, `pk=13`은 타깃에 아예 없는 신규 행이다.
#
실행한 쿼리는 값 비교 조건을 `WHEN`절에 넣어 불필요한 `UPDATE`를 걸러내려 한, 흔히 "최적화됐다"고 여겨지는 형태다.
```sql
MERGE INTO patient AS a
USING tmp_patient AS b
   ON a.pk = b.pk
 WHEN MATCHED AND NOT (a.name <=> b.name AND a.addr <=> b.addr) THEN
      UPDATE SET
          a.name = b.name,
          a.addr = b.addr
 WHEN NOT MATCHED THEN
      INSERT (pk, name, addr)
      VALUES (b.pk, b.name, b.addr);
```
`pk=2`는 값이 같으니 `NOT (a.name <=> b.name AND a.addr <=> b.addr)`가 `false`가 되어 `UPDATE`를 건너뛴다. 그러니 `file_A`는 애초에 건드릴 일이 없을 것이라 기대하게 된다.
하지만 실제로는 그렇게 되지 않는다. `file_A`는 재작성되고, 커밋 후 새 스냅샷은 원본과 바이트 단위로 동일한 파일을 가리키게 된다.

### MERGE는 두 단계로 실행된다
이 결과를 이해하려면 `Spark`가 `Iceberg` 테이블에 `MERGE INTO`를 실행할 때 내부적으로 두 단계를 거친다는 사실을 알아야 한다.
#
첫 번째는 **파일 선정 단계**다. `Spark-Iceberg`는 먼저 "어느 파일을 재작성 후보로 올릴지"를 정하기 위해, `Iceberg`가 각 행에 부여하는 숨은 메타데이터 컬럼 `_file`을 이용해 오직 `ON` 조건만으로 조인을 수행한다. 개념적으로는 아래 쿼리와 동일하다.
```sql
SELECT DISTINCT t._file
FROM patient t
JOIN tmp_patient b
  ON t.pk = b.pk
-- WHEN절 조건은 여기 전혀 반영되지 않는다
```
`pk=2`는 `pk` 기준으로 매칭되어 `file_A`가, `pk=6`은 `file_B`가 재작성 대상에 오른다. `pk=13`은 매칭되는 기존 행이 없으니 `insert` 전용이라 기존 파일과 무관하다. 결과적으로 재작성 대상은 `{ file_A, file_B }`가 된다.
이 시점에서 `pk=2`의 값이 실제로 바뀌었는지는 판단 대상조차 아니다. `ON`절은 `pk` 동등 비교뿐이므로 "매칭됐다"는 사실 하나만으로 `file_A`는 재작성 명단에 오르고, `WHEN`절의 값 비교 조건은 이 단계에 아예 존재하지 않는다.
#
두 번째는 **전체 재작성 단계**다. 앞서 선정된 `file_A`와 `file_B`의 8개 행을 전부 읽어 소스와 `full outer join`한 뒤, 행마다 `WHEN`절을 평가하며 새 파일을 쓴다.
```
pk=1  매칭 없음                → 그대로 복사
pk=2  매칭, WHEN 조건 false    → 그대로 복사   ← 문제 지점
pk=3  매칭 없음                → 그대로 복사
pk=4  매칭 없음                → 그대로 복사
pk=5  매칭 없음                → 그대로 복사
pk=6  매칭, WHEN 조건 true     → 새 값으로 기록
pk=7  매칭 없음                → 그대로 복사
pk=8  매칭 없음                → 그대로 복사
pk=13 not matched              → insert
```
출력은 `file_A'`(내용이 원본 `file_A`와 바이트 단위로 동일), `file_B'`(`pk=6` 한 줄만 값이 다름), 그리고 `pk=13`이 담긴 신규 파일이다. 커밋 후 스냅샷은 `file_A`, `file_B`를 버리고 `file_A'`, `file_B'`를 가리킨다.
내용이 하나도 바뀌지 않은 파일조차 통째로 새로 쓰이는 셈이다.

### 왜 이런 구조로 동작하는가
`Iceberg`의 `MERGE INTO` 실행 계획, 즉 `Spark`의 `row-level rewrite`와 `dynamic file filtering`은 비용을 줄이기 위해 파일 스캔 범위를 조인 키(`ON` 조건) 기준으로만 좁힌다.
#
`WHEN`절의 조건까지 반영해 파일 단위로 정적 프루닝을 하려면, 값 비교 조건을 만족하는 행이 어느 파일에 있는지를 먼저 알아야 한다. 그런데 이는 사실상 파일을 열어 값을 읽어봐야만 알 수 있는 정보다. 즉 "파일을 열어보지 않고도 재작성이 필요 없다"고 판단할 수 있는 정보는 조인 키뿐이고, `WHEN`절의 값 비교는 파일을 이미 열어 읽는 두 번째 단계에서만 활용할 수 있다.
결과적으로 `WHEN`절의 값 비교는 "쓰기 대상에서 파일을 빼는" 역할이 아니라, "파일 안에서 어떤 행의 값을 바꿀지"만 결정하는 역할에 그친다.

### 실무적 영향
이 구조는 소스에 `no-op` 행(타깃과 값이 동일한 행)이 섞여 있을수록 손해가 커진다.
소스가 대량의 `upsert` 배치이고 그중 상당수가 이미 반영된 값을 다시 보내는 재전송이라면, 그 `no-op` 행들이 흩어져 있는 모든 파일이 실질적인 변경 없이 통째로 재작성된다.
파일이 크고 파티션당 파일 수가 적은 테이블일수록, 그리고 배치 처리 주기가 잦을수록 이 `write amplification`은 누적되어 스토리지 쓰기 비용과 커밋 충돌 가능성을 함께 키운다.

### 완화 방안
가장 근본적인 해결책은 **소스에서 `no-op` 행을 미리 제거하는 것**이다. `MERGE`를 실행하기 전에 `tmp_patient`를 타깃과 안티조인해서, 실제로 값이 다르거나 신규인 행만 남긴다.
```sql
CREATE OR REPLACE TEMP VIEW tmp_patient_diff AS
SELECT b.*
FROM tmp_patient b
LEFT JOIN patient a ON a.pk = b.pk
WHERE a.pk IS NULL
   OR NOT (a.name <=> b.name AND a.addr <=> b.addr);
```
이렇게 하면 첫 번째 단계의 `ON` 조인 자체에 `pk=2`가 등장하지 않으므로, `file_A`는 애초에 재작성 후보에 오르지 않는다.
```sql
MERGE INTO patient AS a
USING (
    SELECT b.*
    FROM tmp_patient b
    LEFT JOIN patient a ON a.pk = b.pk
    WHERE a.pk IS NULL
       OR NOT (a.name <=> b.name AND a.addr <=> b.addr)
) AS b
   ON a.pk = b.pk
 WHEN MATCHED THEN
      UPDATE SET a.name = b.name, a.addr = b.addr
 WHEN NOT MATCHED THEN
      INSERT (pk, name, addr) VALUES (b.pk, b.name, b.addr);
```
`USING` 서브쿼리로 미리 필터링하는 방식이라, `WHEN`절의 값 비교를 파일 선정 이전 단계로 끌어올리는 것이 핵심이다.
#
`MOR(Merge-On-Read)`로 전환하는 것도 고려할 수 있다. `MOR`은 변경된 행만 `delete file`과 소량의 신규 `data file`로 기록하고 기존 파일은 그대로 둔다. 쓰기 비용은 크게 줄지만 읽을 때 `delete file`을 병합해야 하므로 읽기 비용이 늘고, 주기적인 `compaction`이 필요해진다. `COW`의 "읽기 최적화, 쓰기 비용" 트레이드오프를 정확히 뒤집는 선택인 셈이다.
#
파일 크기와 정렬(`clustering`) 전략을 재검토하는 것도 도움이 된다. `pk` 기준으로 정렬하거나 버킷팅해서 관련 없는 `pk`가 같은 파일에 섞이지 않게 하면, 특정 `pk`에 대한 업데이트가 끌고 들어오는 무고한 이웃 행의 수, 즉 `blast radius`를 줄일 수 있다.

### Outro
`Iceberg COW MERGE`에서 "어느 파일을 재작성할지"는 `ON` 조건(조인 키)만으로 정해지고, `WHEN`절의 값 비교는 그 이후 단계에서 "행의 값을 바꿀지"만 결정한다.
따라서 `no-op` 매칭을 걸러내려면 `WHEN`절이 아니라 소스 자체를 `MERGE` 이전에 필터링해야 한다. 쿼리 문법상으로는 같은 조건을 `WHEN`절에 넣으나 소스를 미리 걸러내나 결과가 같아 보이지만, `Iceberg`의 2단계 실행 모델에서는 전혀 다른 비용을 낳는다는 점을 이번 사례로 확실히 알게 됐다.
