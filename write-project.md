# Playground 새 프로젝트 추가 템플릿

## 수정 파일
- `src/pages/index.tsx` — Project 컴포넌트 블록 추가

## 이미지 추가

프로젝트 이미지는 `src/static/images/playground/` 에 저장한다.

**GIF 애니메이션** → public URL 방식 (파일을 `static/images/playground/` 에 복사 후 public URL로 참조)
```ts
const myProjectGif = '/images/playground/my-project.gif'
```

**PNG 정적 이미지** → import 방식
```ts
import myProjectPng from '../static/images/playground/my-project.png'
```

## index.tsx에 추가할 코드 블록

`src/pages/index.tsx` 상단 import 섹션에 이미지 import 추가:
```ts
// GIF는 const로, PNG는 import로
const myProjectGif = '/images/playground/my-project.gif'     // GIF용
import myProjectPng from '../static/images/playground/my-project.png'  // PNG용
```

`<div className={"grid ..."}>` 안에 `<Project>` 블록 추가:
```tsx
<Project title={"프로젝트 이름"} tags={["태그1", "태그2", "태그3"]}>
  <div className={"flex flex-col items-center"}>
    <a className={"block relative"} href={"https://링크"} target={"_blank"}>
      <img className={"absolute top-2.5 left-1"} width={190} src={myProjectGif} alt={"project"}/>
      <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
    </a>
    <p className={"mt-3"}>
      - 설명 1 <br/>
      - 설명 2 <br/>
    </p>
  </div>
</Project>
```

## 채워야 할 항목

| 항목 | 설명 |
|------|------|
| `title` | 프로젝트 이름 |
| `tags` | 기술 스택 (예: `["react", "typescript", "fastapi"]`) |
| `href` | 프로젝트 링크 (GitHub, 배포 URL, Notion 등) |
| 이미지 파일 | `src/static/images/playground/` 에 추가 |
| `src` (img) | 이미지 변수명 |
| `top-*` (img) | 이미지 위치 조정 (phone 목업 위에 올리는 절대 위치) |
| 설명 문장 | 프로젝트 핵심 기능 간단 설명 |

## 현재 프로젝트 예시 참고

### GIF 이미지 + 외부 URL 링크
```tsx
<Project title={"Speaksalot"} tags={["gpt-3.5", "python3", "reactJS", "fastAPI"]}>
  <div className={"flex flex-col items-center"}>
    <a className={"block relative"} href={"https://speaksalot.com"} target={"_blank"}>
      <img className={"absolute top-2.5 left-1"} width={190} src={speaksALotGif} alt={"project"}/>
      <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
    </a>
    <p className={"mt-3"}>
      - GPT와 음성을 활용하여 영어 회화 공부<br/>
      - STT / TTS / Prompt를 활용하여 AI가 Follow Up Question을 제공 <br/>
    </p>
  </div>
</Project>
```

### PNG 이미지 + Notion 링크
```tsx
<Project title={"Crawler"} tags={["java", "kafka", "flink", "mongoDB", "reactJS"]}>
  <div className={"flex flex-col"}>
    <a className={"block relative"} href={"https://notion.so/..."} target={"_blank"}>
      <img className={"absolute top-20 left-1"} width={190} src={crawlerPng} alt={"project"}/>
      <StaticImage width={200} src={"../static/images/phone.png"} alt={"project"}/>
    </a>
    <p className={"mt-3"}>
      - 필요한 각종 데이터를 수집 <br/>
      - 스트리밍 데이터 처리 <br/>
    </p>
  </div>
</Project>
```

## 이미지 위치 조정 가이드 (`top-*`, `left-*`)

phone 목업(`phone.png`) 위에 프로젝트 스크린샷을 절대 위치로 올린다.  
이미지 크기와 내용에 따라 `top-` 값을 조정한다.

| 이미지 타입 | 권장 top 값 |
|------------|------------|
| 앱 스크린샷 (상단 시작) | `top-2.5` |
| 앱 스크린샷 (중간 시작) | `top-20` |
| 프로필/통계 이미지 | `top-2` |
