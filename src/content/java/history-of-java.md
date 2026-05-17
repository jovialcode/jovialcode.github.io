---
slug: "history-of-java"
title: "History of Java"
date: "2023-03-11"
category: "Java"
featuredImage: "../../static/images/contents/java/java_history.png"
tag: ["Core"]
---

### Intro
자바(Java)는 1991년 제임스 고슬링(James Gosling)과 그의 동료들이 선보인 프로그래밍 언어로서, 처음에는 Oak라는 이름으로 시작했다.
가전 제품 소프트웨어를 개발하기 위한 프로그래밍 언어였으나 웹을 동적으로 구성할 수 있는 애플릿(Applet) 때문에 웹 애플리케이션 개발을 위한 주요 언어로 자리 잡았다.
1995년 Oak라는 이름에서 Java로 변경하였으며 1995년 The Times Magazine을 통해 그 해 최고 발명품으로 선정되었다.

### Concept of WORA
자바는 다양한 플랫폼에서 동작할 수 있는 특징을 갖춘 "플랫폼 독립적(Platform-Independent)" 언어로 알려져 있다. 
C++와 같은 언어들과는 달리 특정 플랫폼에 종속되지 않고 어느 플랫폼에서나 실행될 수 있는 환경을 제공한다. 
이를 위해서 자바에는 JVM이라는 Java Virutual Machine이 있다.  
#
Java로 작성된 코드는 컴파일러에 의해 바이트코드로 변환되어 .class 파일에 저장된다. 
JVM 내부에 존재하는 Class Loader를 통해서 .class 파일은 JVM에 로딩, 링킹되며 JVM은 바이트 코드를 실행한다. 
JVM이 플랫폼에 필요한 작업들을 대신하기 떄문에 개발자는 플랫폼에 독립적으로 Java코드를 작성할 수 있다. 
이를 자바의 특징인 "Write Once, Run Anywhere(WORA)"라고 한다.

### History of Java
1995년 5월 23일, 썬 마이크로시스템즈(Sun Microsystems)에서 자바 1.0 버전이 공식적으로 발표되었다.
이 버전은 당시에는 주로 애플릿(Applet)이라는 작은 프로그램을 만드는데 사용되었다.
애플릿은 웹 페이지에 삽입되어 웹 브라우저에서 실행되는 프로그램으로, 당시에는 인터넷에서 동적인 콘텐츠를 제공하는 주요 방법 중 하나였다.  
#
J2SE 1.2의 출현으로 다양한 유형의 플랫폼에 맞게 여러 구성이 구축되었다.
J2EE에는 일반적으로 서버 환경에서 실행되는 엔터프라이즈 애플리케이션을 위한 기술과 API가 포함되어 있는 반면,
J2ME에는 모바일 애플리케이션에 최적화된 API가 포함되어 있다. J2SE는 Java Standard Edition을 나타내며 데스크탑 개발에 사용했다.
2006년에 Sun은 마케팅 목적으로 새로운 J2 버전의 이름을 각각 Java EE , Java ME 및 Java SE 로 변경했다.  
#
1998년 Microsystems는 다른 회사와 조직이 Java 개발 및 표준화에 참여할 수 있도록 JCP(Java Community Process)를 확립했다.
이를 통해 Java 개발자들은 안정적이고 표준화된 환경에서 개발을 진행할 수 있으며, Java 기술의 발전과 확산을 촉진할 수 있다.
자바는 JSP와 커뮤니티를 기반으로 계속해서 발전해왔고 각 버전별로 여러 가지 주요 기능이 추가되었다.

### Major Feature
Java의 주요 특징들을 하나씩 버전별로 정리해본다.


#### JDK 1.1
#### JDK 1.2
#### JDK 1.3
#### JDK 1.4

#### JDK 5
- Generics
- Enhanced for loop
- Autoboxing and Unboxing
- Enums
#### JDK 6
- Scripting API
- Pluggable Annotation Processing
#### JDK 7
- Try-with-resources
- Diamond Operator
- Strings in switch
- Fork/Join Framework
#### JDK 8
- Lambda Expression
- Stream API
- Default Methods
- Date and Time API
#### JDK 9
- [모듈 시스템](/blog/module-java/)
- Reactive Stream API
- Private Methods in Interfaces
#### JDK 10
- Local Variable Type Inference(var)
#### JDK 11
- HTTP Client (Async)
#### JDK 12
- [Switch Expression](/blog/switch-statement/)
- JVM Constants API
