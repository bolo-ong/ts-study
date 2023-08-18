{
  // 기본적으론 타입설정을 해주지 않아도, 자동으로 정해줌
  let name: string = "CM";
  let age = 29;
}

{
  //obj와 arr 타입 지정하는법
  let songAndSinger: { song: string; singer: string } = {
    song: "가시",
    singer: "버즈",
  };

  let project: {
    member: string[];
    days: number;
    started: boolean;
  } = {
    member: ["kim", "park"],
    days: 30,
    started: true,
  };
}

{
  //union타입, 복합적으로 타입을 갖음, 사칙연산 불가
  let arr: (string | number)[] = [1, "2", 3];
  let obj: { a: string | number } = {
    a: 123,
  };
}

{
  //ts를 js처럼 쓰는법, 모든타입 가능, 버그캐칭도 안됨
  let any: any = "123";

  // any와 비슷하게, 모든 타입의 데이터가 들어가지만, unknown타입이기 때문에, 사칙연산이나 타입이 정해져있는 테이블에 넣을 시 오류발생
  let unknown: unknown = "123";
}

{
  //ex)
  let user: string = "kim";
  let unionAge: undefined | number = undefined;
  let married: boolean = false;
  let chelsu: (string | undefined | number | boolean)[] = [
    user,
    unionAge,
    married,
  ];

  let school: {
    score: (number | boolean)[];
    teacher: string;
    friend: string | string[];
  } = {
    score: [100, 97, 84],
    teacher: "phil",
    friend: "John",
  };
  school.score[4] = false;
  school.friend = ["Lee", school.teacher];
}

{
  //파라미터와, 출력값의 타입을 지정해줄 수 있음, 파라미터의 타입을 지정했다면, 함수를 사용할때 파라미터를 꼭 넣어줘야함, 안넣으면 에러발생함
  function 함수(x: number): number {
    return x * 2;
  }
  /*만약 파라미터에 타입을 지정하고, 함수를 사용할 때 파라미터 없이 불러오고 싶다면
  ?연산자 == undefined와 같음
  ex) (x?: number) == (x: number | undefined)*/
  function 함수2(x?: number): number {
    return x * 2;
  }
  //void를 사용해서, return값이 있다면 에러발생
  function 함수3(x: number): void {
    1 + 1;
  }
}

{
  //ex)
  function helloName(name?: string) {
    if (name) {
      console.log("안녕하세요" + name);
    } else {
      console.log("이름이 없습니다.");
    }
  }
  helloName("홍길동");
  helloName();

  function numLength(num: number | string): number {
    return num.toString().length;
  }
  console.log(numLength("245"));
  console.log(numLength(9567));

  function isEligible(
    payCheck: number,
    hasHouse: boolean,
    charmLevel: string
  ): string | void {
    let score: number = 0;
    score += payCheck;
    if (hasHouse) {
      score += 500;
    }
    if (charmLevel === "상") {
      score += 100;
    }
    if (score >= 600) {
      return "결혼가능";
    }
  }
  console.log(isEligible(700, false, "중"));
  console.log(isEligible(100, false, "상"));
}

{
  //Narrowing, typeof를 사용하면 타입을 문자열로 출력해줌 , in 키워드(오브젝트 안에 있는지), instanceof 키워드도(부모요소 안에 있는지) 사용 가능
  function 함수5(x: number | string) {
    if (typeof x === "string") {
      return x + 1;
    } else {
      return x + 2;
    }
  }
  //number타입이기 때문에 125출력
  console.log(함수5(123));

  //assertion, 임의의 타입으로 덮어 씌워줌, union타입일 때, 원하는 타입으로 정할 때 사용, 거의 사용하지 않고 디버깅용으로 사용가능, 혹은 타입을 부여하는 함수를 짤 수 있음
  function 함수6(x: number | string) {
    x = x as number;
    //<number>x 레거시 표현
    return x + 1;
  }
  //   console.log(함수6(123));
}

{
  //ex
  function cleanArr(arr: (string | number)[]): number[] {
    return arr.map((num) => (typeof num === "string" ? parseFloat(num) : num));
  }
  console.log(cleanArr(["1", 2, "3"])); // [ 1, 2, 3 ]

  //as number를 사용해봤더니, 문자열이 그대로 출력됨, 타입을 변환시켜서 타입스크립트가 에러를 감지하진 않으나, 요소는 그대로이다.
  function cleanArr2(arr: (string | number)[]): number[] {
    return arr.map((num) => num as number);
  }
  console.log(cleanArr2(["1", 2, "3"])); // [ '1', 2, '3' ]

  let 철수쌤 = { subject: "math" };
  let 영희쌤 = { subject: ["science", "english"] };
  let 민수쌤 = { subject: ["science", "art", "korean"] };
  let 함정 = { trap: ["hi"] };

  function getLastSubject(obj: { subject: string | string[] }): string {
    return typeof obj.subject === "string"
      ? obj.subject
      : obj.subject[obj.subject.length - 1];
  }

  console.log(getLastSubject(철수쌤)); //'math'
  console.log(getLastSubject(영희쌤)); //'english'
  console.log(getLastSubject(민수쌤)); //'korean'
  //   console.log(getLastSubject(함정)) //'err'

  /*ex코드들의 경우, string이 아니면~ 으로 삼항연산자로 처리했지만, 
  if(typeof obj.subject === "string"){ ~~ } 
  if(Array.isArray(obj.subject)){ ~~ }
  이런식의 if문을 사용해 정확한 타입으로 체크하는게 좋을 것 같다.
  추가적으로 undefined일 수 있으니, else를 이용해서 예외처리도 해주자*/
}

{
  //type alias, type Animal = string | number | undefined; 이런식으로 타입을 변수로 지정할 수 있다, PascalCase로 작명
  //type alias를 이용해 타입을 변수로 작성할 때, readonly속성을 사용하면, arr나 obj자료안에 요소의 변경도 캐치해준다.
  type Student = {
    readonly name: string;
  };
  type Student2 = {
    name?: string; // name : string | undefined 와 같다.
  };
  type Name = string;
  type Age = number;
  type Person = Name | Age; // string | number 와 같다

  //&연산자로 obj타입 extend하기
  type PositionX = { x: number };
  type PositionY = { y: number };
  type NewType = PositionX & PositionY; //{ x: number } & { x: number } 와 같다.
  let position: NewType = { x: 10, y: 20 };
}

{
  //ex)
  type Obj = {
    color?: string;
    size: number;
    readonly position: number[];
  };

  type User = {
    name: string;
    phone: number;
    email?: string;
  };

  type IsAdult = boolean;

  type IsAdultUser = User & IsAdult;
}

{
  //Literal Types 정확하게 원하는 데이터만 들어올 수 있게 설정가능, const변수와 비슷하나 다중값을 입력할 수 있음
  let num: 123;
  num = 123;
  //num = 1 err발생

  let gender: "male" | "female";
  //gender는 'male' 혹은 'female'만 입력가능

  function 함수7(a: "hello"): 0 | 1 {
    return 1;
  }
  함수7("hello"); // 'hello'외 인자는 모두 에러발생

  function rps(
    rps: "rock" | "paper" | "scissors"
  ): ("rock" | "paper" | "scissors")[] {
    return ["rock"];
  }
  rps("rock");

  var data = {
    name: "kim",
  }; //as const, 아래 에러를 이렇게 처리 가능, obj의 value를 타입으로 지정해주며, 모든 속성에 readonly를 붙여줌

  function 함수8(a: "kim") {}
  함수8("kim");
  //함수8(data.name) 에러발생, 'kim'이라는 자료가 아닌, 'kim'이라는 타입을 허용하기 때문에 data.name의 'kim'은 string타입이라 에러가 발생함
  함수8(data.name as "kim"); //때문에 이런식으로 가능 혹은 Ln 240참고
}

{
  //함수 타입 지정
  type TypeFunction = (a: number) => number;

  let 함수: TypeFunction = function () {
    return 10;
  };

  //obj내의 함수 타입지정
  type Member = {
    name: string;
    plusOne: TypeFunction;
    changeName: () => void;
  };

  let 회원정보: Member = {
    name: "kim",
    plusOne(a: number): number {
      return a + 1;
    },
    changeName: () => {
      console.log("hi");
    },
  };
  회원정보.plusOne(1);
  회원정보.changeName();
}

{
  //ex
  const cutZero = (str: string): string => {
    if (str.charAt(0) === "0") {
      return str.slice(1, str.length);
    } else {
      return str;
    }
  };
  console.log(cutZero("Orange")); // Orange
  console.log(cutZero("0range")); // range

  type RemoveDash = (param: string) => number;
  const removeDash: RemoveDash = (phone) => {
    return parseInt(phone.replace(/-/g, ""));
  };
  console.log(removeDash("010-1234-5678")); // orange

  type CallBackFunction = (
    phone: string,
    func1: (str: string) => string,
    func2: RemoveDash
  ) => {};
  const callBackFunction: CallBackFunction = (phone, cutZero, removeDash) => {
    return removeDash(cutZero(phone));
  };

  console.log(callBackFunction("010-1111-2222", cutZero, removeDash));
}

{
  class Car {
    //작성 안해도 디폴트값으로, 스트링이나 넘버타입을 갖고있음
    model: string;
    price: number;
    constructor(modelName: string, carPrice: number) {
      this.model = modelName;
      this.price = carPrice;
    }
    tax = (): number => this.price / 10;
  }
  let car1 = new Car("소나타", 3000);
  console.log(car1);
  console.log(car1.tax());

  class Word {
    str: string[];
    num: number[];
    constructor(...param: (string | number)[]) {
      this.str = [];
      this.num = [];
      param.forEach((v) =>
        typeof v === "string" ? this.str.push(v) : this.num.push(v)
      );
    }
  }

  let obj = new Word("kim", 3, 5, "park");
  console.log(obj.num);
  console.log(obj.str);
}

{
  //interface문법, 작성법은 type과 다르게 class만들 때 처럼 = 기호를 안씀, 장점으로는 extends로 복사가능
  interface Student {
    name: string;
  }
  let 학생: Student = { name: "cm" };

  interface Teacher extends Student {
    // name: string;
    age: number;
  }
  let 선생: Teacher = { name: "cm", age: 10 };

  //type에서는 & 기호로 intersection type 가능
  type Animal = { name: string };
  type Cat = { age: number } & Animal;

  //두 방법의 차이는, interface문법은 중복선언을 허용해줌, type은 중복선언 시 에러 발생
  interface Student {
    //위에서 선언했던 Student interface를 재선언, 재선언 시에는 두개가 extend처럼 합쳐짐
    // name: number; 같은 name을 재선언 하면서, 타입을 다르게 할 시 에러발생
    // score: number; score라는 속성을 추가해줌
  }

  /*type의 &기호에선, 같은 속성을 선언할 땐 오류가 발생하지 않으나, 해당 타입을 사용해서 오브젝트를 생성할 때 never타입이 발생함, 
  이런면에서 interface가 더 좋을 수 있음, 때문에 오브젝트 자료형의 경우 interface를 많이 사용*/
}

{
  interface Item {
    brand: string;
    serialNumber: number;
    model: string[];
  }
  let item: Item = {
    brand: "samsung",
    serialNumber: 1360,
    model: ["tv", "phone"],
  };

  interface Cart {
    product: string;
    price: number;
  }
  let cart: Cart[] = [
    { product: "청소기", price: 7000 },
    { product: "삼다수", price: 800 },
  ];
  interface NewCart extends Cart {
    card: boolean;
  }

  interface PlusMinus {
    plus: (a: number, b: number) => number;
    minus: (a: number, b: number) => number;
  }

  let FcPlusMinus: PlusMinus = {
    plus: (a, b) => a + b,
    minus: (a, b) => a - b,
  };
}

{
  //rest parameter 타입은 배열 형식으로
  function 함수9(...a: number[]) {
    // console.log(a)
  }
  함수9(1, 2, 3, 4, 5);

  interface Person {
    student: boolean;
    age: number;
  } //type Person = {student:boolean, age:number}

  let person: Person = { student: true, age: 20 };

  function 함수10({ student, age }: Person) {
    console.log(student, age);
  }
  함수10(person);

  function maxNumber(...v: number[]): number {
    let result = 0;
    v.forEach((num) => {
      if (result < num) {
        result = num;
      }
    });
    return result;
  }
  console.log(maxNumber(1, 3, 2, 6, 5, 4, 8));
}

{
  }
  example.arrowFunction(); //42
  const regularFunction = example.regularFunction;
  regularFunction(); // TypeError: Cannot read property 'value' of undefined, 함수 자체만 꺼내온것
  example.regularFunction(); //42

  /*정리하자면, const obj = { }는 new Object()함수를 사용하는 것이기 때문에, 새로운 객체를 생성하는거며, 생성하는 위치의 스코프에서 this값을 바인딩
  new Example()은 class내부의 constructor()함수를 호출하고, constructor를 호출한 class의 스코프에서 this값을 바인딩 */
}
