---
slug: "fork-and-join"
title: "ForkAndJoin Framework"
date: "2023-05-25"
category: "Java"
featuredImage: "../../static/images/contents/java/java_forkAndJoin.png"
tag: ["JDK7", "Concurrency"]
---

### Intro

`Fork/Join` 프레임워크는 병렬 프로그래밍을 위한 도구로 `JDK 7`에 `java.util.concurrent` 패키지에 등장했다. 이름과 같이 분할할 수 있는 작업을 더 작은 작업으로 나누고(Fork)
처리하여 각각의 결과를 합쳐서(Join) 반환하는 프레임워크이다. 분할된 작업들을 처리하기 위해서 내부적으로 `스레드 풀`을 구성하여 작업을 병렬로 처리한다. 이를 통해 멀티코어 프로세서를 최대한 활용하여 성능을
향상시킬 수 있다.

#  

`Executors`, `java.util.concurrent` 패키지를 통해서 `스레드`를 어떻게 생성하고 관리할지에 대한 부분이 정리가 되었다면
`Fork/Join` 프레임워크를 통해서 `스레드`를 활용하여 어떻게 작업을 병렬로 처리할지에 대해서 다룬다.

#  

`Fork/Join`프레임워크는
`ForkJoinPool`, `ForkJoinTask`, `RecursiveTask` 및 `RecursiveAction` 등의 주요 클래스로 구성된다.

<div class="TableWrapper">

| 클래스           | 설명                                                                               |
|-----------------|----------------------------------------------------------------------------------|
| ForkJoinPool    | Fork/Join 작업을 실행하는 스레드 풀을 나타낸다. 병렬 작업을 실행하고 관리하며 스레드를 효율적으로 할당한다.              |
| ForkJoinTask    | Fork/Join 프레임워크의 작업을 나타내는 추상 클래스이다. `RecursiveTask` 및 `RecursiveAction`이 상속한다. |
| RecursiveTask   | `ForkJoinTask`를 상속하는 클래스로, 결과를 반환하는 작업을 정의한다. 병렬 작업의 결과를 합치는 역할을 수행한다.         |
| RecursiveAction | `ForkJoinTask`를 상속하는 클래스로, 결과를 반환하지 않는 작업을 정의한다. 주로 부수 효과를 갖는 작업에 사용된다.        |

</div>

### ForkJoinPool

`ForkJoinPool` 클래스는 `ExecutorService` 인터페이스의 구현체로 분할된 작업을 병렬로 실행할 수 있도록 `스레드 풀`을 구성하고 작업을 관리한다.
`스레드 풀`의 스레드 개수는 보통 프로세서 코어 수에 맞게 자동으로 생성되며 각 스레드는 자신의 작업 `Queue`를 가지고 있다. 컴퓨터가 4코어를 갖고 있다면 `ForkJoinPool`은 기본적으로 4개의
스레드로 구성된다.

#  

`ForkJoinPool`은 작업을 효율적으로 분배하기 위해 `Work-Stealing` 알고리즘을 사용한다. 이 알고리즘은 각 스레드가 자신의 작업을 처리한 후 자신의 `Queue`가 비어있으면 다른
스레드의 `Queue`에서 작업을 가져와 처리한다. 이를 통해 작업을 공평하게 분배하고 스레드 간의 부하를 균형있게 유지할 수 있다.

#  

예를 들어 분할된 작업이 6개라면 4개의 작업이 우선적으로 처리되고 나머지 2개의 작업은 `Queue`에 대기하게 된다. 이때 `스레드 A`가 작업을 완료하고 자신의 큐가 비어있고 다른 스레드의 `Queue`에
작업이 있다면 해당 작업을 가져와 처리하게 된다.

#

`ForkJoinPool`은 아래와 같이 생성하여 `ForkJoinTask`를 전달하여 작업을 분할하고 결과를 반환한다.

```java
public static void main(String[] args) {
    int[] array = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // ForkJoinPool 생성
    ForkJoinPool forkJoinPool = new ForkJoinPool();

    // 작업 생성 및 실행
    int sum = forkJoinPool.invoke(new MyRecursiveTask(array, 0, array.length));

    // 결과 출력
    System.out.println("Sum: " + sum);
}
```

작업을 비동기/동기적으로 호출하는 것과 호출하는 시점에 따라 API가 조금 다르다.

<div class="TableWrapper">

| 호출 유형     | Fork/Join 외부에서 호출 | Fork/Join 내부에서 호출     |
|-----------|-------------------|-----------------------|
| 비동기 실행    | execute()         | ForkJoinTask.fork()   |
| 동기 실행     | invoke()          | ForkJoinTask.invoke() |
| Future 반환 | submit()          | ForkJoinTask.fork()   |

</div>


### ForkJoinTask / RecursiveTask / RecursiveAction
`ForkJoinTask`은 `ForJoinPool`에서 실행되는 작업나타내는 추상 클래스이다.
`fork()` 및 `join()` 메서드를 통해 작업을 분할하고 실행한다.
또한 `Future`인터페이스를 구현하고 있어 완료, 취소와 같은 작업상태를 확인할 수 있으며 get() 메서드를 통해 결과를 반환받기 위한 API를 제공한다.

# 
실제 작업은 `ForkJoinTask`를 상속하는 `RecursiveTask`와 `RecursiveAction`의 compute()을 구현하여 나타낸다. 
일반적으로 compute()는 divide-and-conquer 알고리즘을 작성하는 형태로 구현한다.
만약 작업이 분리될 수 있으면 하위 작업으로 분리하고 fork()를 실행하여 `스레드`의 Queue에서 대기하게 된다.

```java
if (하위 작업으로 분리할 수 있는지 판단)
    하위 작업으로 분리,
    fork()
else {
    태스크 실행
} 

```
`RecursiveTask`는 제네릭 타입을 반환하며 `RecursiveAction`은 반환 타입이 없을 경우 사용하게 된다.

### Example 
디렉토리 내의 파일들의 사이즈룰 조회해야하는 상황을 생각해봅시다.
디렉토리 내부에는 파일도 있지만 디렉토리도 존재할 수 있다.
그러므로 디렉토리 내부에 다른 디렉토리가 존재하면 하위 작업으로 분리할 수 있을 것 같다.

```java
public class DirectorySizeCalculator extends RecursiveTask<Long> {
    private final File directory;

    public DirectorySizeCalculator(File directory) {
        this.directory = directory;
    }

    @Override
    protected Long compute() {
        long size = 0;
        File[] files = directory.listFiles();
        // 반환 조건을 명시합니다.
        if (Objects.isNull(files)) {
            return size;
        }

        // 파일 목록을 순회하면서 파일의 크기를 합산합니다.
        List<DirectorySizeCalculator> subTasks = new ArrayList<>();
        for (File file : files) {
            if (file.isDirectory()) {
                // 하위 디렉토리인 경우, 하위 작업을 생성하여 ForkJoinPool에 제출합니다.
                DirectorySizeCalculator subTask = new DirectorySizeCalculator(file);
                subTasks.add(subTask);
                subTask.fork();
            } else {
                size += file.length();
            }
        }

        // 하위 디렉토리들의 작업 결과를 합산합니다.
        for (DirectorySizeCalculator subTask : subTasks) {
            size += subTask.join();
        }

        return size;
    }

    public static void main(String[] args) {
        File directory = new File("/path/to/your/directory");

        // ForkJoinPool을 생성합니다.
        ForkJoinPool pool = new ForkJoinPool();
        
        // 결과값을 받기 위해서 invoke 메서드를 호출합니다.
        long totalSize = pool.invoke(new DirectorySizeCalculator(directory));  

        // 디렉토리의 전체 크기를 출력합니다.
        System.out.println("Total size of directory: " + totalSize + " bytes");
    }
}
```

### Outro
병렬로 모든것을 처리하면 좋겠지만 장점 뒤에 있는 단점을 잘 유의하면서 사용해야한다.
먼저 작업의 분할과 병합에 대한 비용을 고려해야 한다. 
작은 작업을 분할할 때는 오버헤드가 발생할 수 있으므로 너무 작은 작업을 분할하지 않도록 주의해야 한다.
# 
그리고 `Fork/Join` 프레임워크를 사용할 때는 작업을 가능한 한 순수 함수로 구현하는 것이 좋다. 
순수 함수는 입력을 받아 결과를 반환하는데 외부 상태를 변경하지 않고 순수한 입력에만 의존하는 함수이다.
이렇게 하면 병렬 처리가 더 쉬워지고 데드락, 가시성 등의 스레딩 문제가 발생하지 않는다.
