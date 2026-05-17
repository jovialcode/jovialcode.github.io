---
slug: "java-collection"
title: "Collection Framework"
date: "2023-05-04"
category: "Java"
featuredImage: "../../static/images/contents/java/java_collection_hierarchy.jpg"
tag: ["JDK1.2"]
---

### Intro

`Collections Framework`는 JDK 1.2에 도입되었다. 
`Collections Framework`는 `Set`, `List`, `Deque`, `Map`과 같은 자료구조를 효율적으로 표현하고 조작하기 위한 API를 제공하며 구현 세부사항과 독립적으로 자료구조를 조작하기 위한 Interface를 제공한다.

### Collection Interface

- [java.util.Set](https://docs.oracle.com/javase/8/docs/api/java/util/Set.html)
- [java.util.SortedSet](https://docs.oracle.com/javase/8/docs/api/java/util/SortedSet.html)
- [java.util.NavigableSet](https://docs.oracle.com/javase/8/docs/api/java/util/NavigableSet.html)
- [java.util.Queue](https://docs.oracle.com/javase/8/docs/api/java/util/Queue.html)
- [java.util.concurrent.BlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingQueue.html)
- [java.util.concurrent.TransferQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/TransferQueue.html)
- [java.util.Deque](https://docs.oracle.com/javase/8/docs/api/java/util/Deque.html)
- [java.util.concurrent.BlockingDeque](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingDeque.html)

Collection의 Interfaces는 `Iterable Interface`를 상속하는 `Set`, `List`, `Queue`가 있으며 Collection-View를 포함하는 `Map`으로 2개의 그룹으로 나눈다. 
`Map`은 `Iterable/Collection Interface`를 직접적으로 상속/구현하지 않아 정확하게 Collection이라고 볼순 없지만 `Map Interface`에 정의된 메서드의 리턴값이 Collection Interface를 반환하여 
마치 Collection Interface를 상속한 `Set`, `List`와 같이 Collection 자료구조를 조작할 수 있다.  
# 
`Map Interface`의 Collection-View 메서드는 아래와 같다. 
- keySet() → Set  
- values() → Collection
- entrySet() → Set
# 

### Collection Implementations
<div class="tableWrapper">

| Interface | Hash Table                                                                  | Resizable Array                                                                   | Balanced Tree                                                               | Linked List | Hash Table + Linked List                                                                |
| --- |-----------------------------------------------------------------------------|-----------------------------------------------------------------------------------|-----------------------------------------------------------------------------| --- |-----------------------------------------------------------------------------------------|
| Set | [HashSet](https://docs.oracle.com/javase/8/docs/api/java/util/HashSet.html) |                                                                                   | [TreeSet](https://docs.oracle.com/javase/8/docs/api/java/util/TreeSet.html) |  | [LinkedHashSet](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedHashSet.html) |
| List |                                                                             | [ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)   |                                                                             | [LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html) |                                                                                         |
| Deque |                                                                             | [ArrayDeque](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayDeque.html) |                                                                             | [LinkedList](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedList.html) |                                                                                         |
| Map | [HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html) |                                                                                   | [TreeMap](https://docs.oracle.com/javase/8/docs/api/java/util/TreeMap.html) |  | [LinkedHashMap](https://docs.oracle.com/javase/8/docs/api/java/util/LinkedHashMap.html)             |

</div>

Collection 구현체는 어떻게 구현하는가에 따라 동작 방식이 조금씩 다르다. `Map Interface` 구현체들을 살펴보면 `Map`에서 `HashMap`, `TreeMap`, `LinkedList` 구현체가 있다.
# 
**HashMap**  
- 요소의 순서를 보장하지 않는다. 따라서 저장된 요소들의 순서를 유지하지 않는다.
- 해시맵은 해시 함수를 사용하여 요소를 저장하고 검색한다. 이는 평균적으로 상수 시간(O(1))에 요소를 삽입, 삭제, 조회할 수 있다.
# 
**TreeMap**  
- 트리맵은 정렬된 순서로 유지한다.
- Binary Search와 같이 정리된 경우에는 로그 시간(O(log n))에 요소를 삽입, 삭제, 조회할 수 있다.
# 
**LinkedHashMap**
- 링크드해시맵은 해시맵과 연결 리스트의 조합으로 구현되어 있다.
- 삽입된 순서대로 요소들을 유지하므로, 순서가 보장된다.
- 해시맵과 마찬가지로 상수 시간(O(1))에 요소를 삽입, 삭제, 조회할 수 있다.

다른 자료구조 구현체들도 동작 방식이 조금씩 다르므로 한번씩 살펴보면 좋을 것 같다.
# 
Collection 구현체 중 일부는 `Thread-Safe`하지 않은 구현체가 있다.  
- ArrayList 
- LinkedList
- HashMap
- HashSet
멀티쓰레드 환경에서 자료구조를 공유해야하는 경우는 Concurrent 구현체를 사용하거나 
Collections 클래스의 여러가지 정적 팩토리 메서드를 통해서 `Wrapping`하여 사용해야한다. 
동기화가 가능하도록 Collectin 구현체를 `Wrapping`하거나 `Immutable`하게 처리하는 방법이 있다.

- synchronizedCollection(Collection<T> c)
- synchronizedList(List<T> list)
- synchronizedSet(Set<T> s)
- synchronizedMap(Map<K,V> m)
- unmodifiableCollection(Collection<? extends T> c) 
- unmodifiableList(List<? extends T> list)
- unmodifiableSet(Set<? extends T> s)
- unmodifiableMap(Map<? extends K,? extends V> m)

### Concurrent Collections
멀티스레드 환경일때는 `Thread-Safe`한 자료구조를 사용하는 것이 중요하다.
`Thread-Safe`하지 않은 경우 발생할 수 있는 문제점은 디버깅도 어렵기 때문에 어떤 에러가 발생할지 짐작하기 어렵다.
Collections Framework에서 제공하는 Concurrent Interface와 Implementation은 아래와 같다.

- [BlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingQueue.html)
- [TransferQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/TransferQueue.html)
- [BlockingDeque](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/BlockingDeque.html)
- [ConcurrentMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentMap.html)
- [ConcurrentNavigableMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentNavigableMap.html)
# 
- [LinkedBlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedBlockingQueue.html)
- [ArrayBlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ArrayBlockingQueue.html)
- [PriorityBlockingQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/PriorityBlockingQueue.html)
- [DelayQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/DelayQueue.html)
- [SynchronousQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/SynchronousQueue.html)
- [LinkedBlockingDeque](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedBlockingDeque.html)
- [LinkedTransferQueue](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/LinkedTransferQueue.html)
- [CopyOnWriteArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CopyOnWriteArrayList.html)
- [CopyOnWriteArraySet](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CopyOnWriteArraySet.html)
- [ConcurrentSkipListSet](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentSkipListSet.html)
- [ConcurrentHashMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentHashMap.html)
- [ConcurrentSkipListMap](https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ConcurrentSkipListMap.html)
