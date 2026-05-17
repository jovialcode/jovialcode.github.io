---
slug: "switch-statement"
title: "Switch statement"
date: "2023-04-20"
category: "Java"
featuredImage: "../../static/images/contents/java/switch_expression.png"
tag: ["JDK1.0", "JDK12"]
---
### Intro
Switch Statement Java 1.0부터 지원한 문법이며 주로 if-else 문이 중첩되거나 복잡해질 때 코드의 가독성을 높이기 위해 사용된다. 여러 버전을 거치면서 기능이 보완되고 Switch Expression이 추가됨으로써 코드 작성의 편의성과 가독성이 향상되었다.

### Switch Statement
Java 1.0 버전에서 Primitive 타입만 비교하였다. 
Java5에서 Primitive 타입에 대한 Wrapper 타입도 추가되었으며 Java5에 Enum 타입이 추가되면서 Switch Statement에서도 Enum 타입을 사용할 수 있다.
Java7에 String 타입이 추가되면서 익히 사용하는 Switch Statement 문법을 갖추게 되었다.

```java
public String dayName(){
    int dayOfWeek = 3;
    String dayName = "Unknown";
    if (dayOfWeek == 1){
        dayName = "Sunday";
    }else if(dayOfWeek == 2){
        dayName = "Monday";
    }else if(dayOfWeek == 3){
        dayName = "Tuesday";
    }
    return dayName;
}
```

```java
public String dayName(){
    int dayOfWeek = 3;
    String dayName;
    switch (dayOfWeek) {
        case 1:
            dayName = "Sunday";
            break;
        case 2:
            dayName = "Monday";
            break;
        case 3:
            dayName = "Tuesday";
            break;
        default:
            dayName = "Unknown";
            break;
    }
    return dayName;
}
```
### Switch Expression

Java 12에서 처음 소개 되었으며 Java13, 14를 거치면서 약간 개선되었다.  자세한 내용은 JEP 361을 읽어봅시다.
Expression과 Statement 용어가 헷갈릴 수 있어 간단하게 정리하면 Statement는 if, while, for와 같은 명령어 이다.  
Expression은 값을 반환한다. 아래 예시를 바탕으로 Statement와 Expression을 정리해보세요.

```java
5 // Expression
getValue(); //getValue() 함수의 실행 결과는 값이므로 Expression입니다. 
var x = 5; // Statement
var y = getValue(); // Statement
```

Java 12부터는 Switch문법이 값을 표현할 수 있다. 아래 코드에서 Switch의 결과가 "Tuesday"라는 값을 반환하므로 Expression이라고 한다.

```java
public String dayName(){
    int dayOfWeek = 3;
    String dayName = switch (dayOfWeek) {
        case 1 -> "Sunday";
        case 2 -> "Monday";
        case 3 -> "Tuesday";
        default -> "Unknown";
    };

    return dayName;
}

enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

public String emotion(Day day){
    String emotion = switch (day) {
        case Monday, Tuesday, Wednesday -> "What!";
        case Thursday, Friday-> "Amm";
        case Saturday, Sunday -> "Love";
        default -> "Unknown";
    };
    return emotion;
}

```

### Don't forget it

Switch Statement/Expression 문법에는 몇가지 주의사항이 있다.  
1.Switch Statement에서는 Break 문을 작성해야 한다.  
case 3 라벨에서 break문이 없는 경우 default까지 실행되어 Unknown으로 설정된다. 
```java
public String dayName(){
    int dayOfWeek = 3;
    String dayName;
    switch (dayOfWeek) {
        case 1:
            dayName = "Sunday";
            break;
        case 2:
            dayName = "Monday";
            break;
        case 3:
            dayName = "Tuesday";
            // break;가 없어 default 라벨까지 실행.
        default:
            dayName = "Unknown";
            break;
}
return dayName;
}
```
2.Switch Expression에서는 비교되는 모든 경우가 case 라벨로 선언되어야한다. or default 문을 선언해야한다.
모든 경우가 case 라벨로 선언되지 않으면 컴파일 오류가 발생한다.
```java
enum Day { Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday }

public String emotion(Day day){
    String emotion = switch (day) {
        case Monday, Tuesday, Wednesday -> "What!";
        case Thursday, Friday-> "Amm";
        // case Frideay, Staturday 가 없어 컴파일 오류 발생
    };
    return emotion;
}

```
