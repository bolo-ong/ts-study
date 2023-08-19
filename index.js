var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _this = this;
{
    // 기본적으론 타입설정을 해주지 않아도, 자동으로 정해줌
    var name_1 = "CM";
    var age = 29;
}
{
    //obj와 arr 타입 지정하는법
    var songAndSinger = {
        song: "가시",
        singer: "버즈",
    };
    var project = {
        member: ["kim", "park"],
        days: 30,
        started: true,
    };
}
{
    //union타입, 복합적으로 타입을 갖음, 사칙연산 불가
    var arr = [1, "2", 3];
    var obj = {
        a: 123,
    };
}
{
    //ts를 js처럼 쓰는법, 모든타입 가능, 버그캐칭도 안됨
    var any = "123";
    // any와 비슷하게, 모든 타입의 데이터가 들어가지만, unknown타입이기 때문에, 사칙연산이나 타입이 정해져있는 테이블에 넣을 시 오류발생
    var unknown = "123";
}
{
    //ex)
    var user = "kim";
    var unionAge = undefined;
    var married = false;
    var chelsu = [
        user,
        unionAge,
        married,
    ];
    var school = {
        score: [100, 97, 84],
        teacher: "phil",
        friend: "John",
    };
    school.score[4] = false;
    school.friend = ["Lee", school.teacher];
}
{
    //파라미터와, 출력값의 타입을 지정해줄 수 있음, 파라미터의 타입을 지정했다면, 함수를 사용할때 파라미터를 꼭 넣어줘야함, 안넣으면 에러발생함
    function 함수(x) {
        return x * 2;
    }
    /*만약 파라미터에 타입을 지정하고, 함수를 사용할 때 파라미터 없이 불러오고 싶다면
    ?연산자 == undefined와 같음
    ex) (x?: number) == (x: number | undefined)*/
    function 함수2(x) {
        return x * 2;
    }
    //void를 사용해서, return값이 있다면 에러발생
    function 함수3(x) {
        1 + 1;
    }
}
{
    //ex)
    function helloName(name) {
        if (name) {
            console.log("안녕하세요" + name);
        }
        else {
            console.log("이름이 없습니다.");
        }
    }
    helloName("홍길동");
    helloName();
    function numLength(num) {
        return num.toString().length;
    }
    console.log(numLength("245"));
    console.log(numLength(9567));
    function isEligible(payCheck, hasHouse, charmLevel) {
        var score = 0;
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
    function 함수5(x) {
        if (typeof x === "string") {
            return x + 1;
        }
        else {
            return x + 2;
        }
    }
    //number타입이기 때문에 125출력
    console.log(함수5(123));
    //assertion, 임의의 타입으로 덮어 씌워줌, union타입일 때, 원하는 타입으로 정할 때 사용, 거의 사용하지 않고 디버깅용으로 사용가능, 혹은 타입을 부여하는 함수를 짤 수 있음
    function 함수6(x) {
        x = x;
        //<number>x 레거시 표현
        return x + 1;
    }
    //   console.log(함수6(123));
}
{
    //ex
    function cleanArr(arr) {
        return arr.map(function (num) { return (typeof num === "string" ? parseFloat(num) : num); });
    }
    console.log(cleanArr(["1", 2, "3"])); // [ 1, 2, 3 ]
    //as number를 사용해봤더니, 문자열이 그대로 출력됨, 타입을 변환시켜서 타입스크립트가 에러를 감지하진 않으나, 요소는 그대로이다.
    function cleanArr2(arr) {
        return arr.map(function (num) { return num; });
    }
    console.log(cleanArr2(["1", 2, "3"])); // [ '1', 2, '3' ]
    var 철수쌤 = { subject: "math" };
    var 영희쌤 = { subject: ["science", "english"] };
    var 민수쌤 = { subject: ["science", "art", "korean"] };
    var 함정 = { trap: ["hi"] };
    function getLastSubject(obj) {
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
    var position = { x: 10, y: 20 };
}
{
}
{
    //Literal Types 정확하게 원하는 데이터만 들어올 수 있게 설정가능, const변수와 비슷하나 다중값을 입력할 수 있음
    var num = void 0;
    num = 123;
    //num = 1 err발생
    var gender = void 0;
    //gender는 'male' 혹은 'female'만 입력가능
    function 함수7(a) {
        return 1;
    }
    함수7("hello"); // 'hello'외 인자는 모두 에러발생
    function rps(rps) {
        return ["rock"];
    }
    rps("rock");
    var data = {
        name: "kim",
    }; //as const, 아래 에러를 이렇게 처리 가능, obj의 value를 타입으로 지정해주며, 모든 속성에 readonly를 붙여줌
    function 함수8(a) { }
    함수8("kim");
    //함수8(data.name) 에러발생, 'kim'이라는 자료가 아닌, 'kim'이라는 타입을 허용하기 때문에 data.name의 'kim'은 string타입이라 에러가 발생함
    함수8(data.name); //때문에 이런식으로 가능 혹은 Ln 240참고
}
{
    var 함수_1 = function () {
        return 10;
    };
    var 회원정보 = {
        name: "kim",
        plusOne: function (a) {
            return a + 1;
        },
        changeName: function () {
            console.log("hi");
        },
    };
    회원정보.plusOne(1);
    회원정보.changeName();
}
{
    //ex
    var cutZero = function (str) {
        if (str.charAt(0) === "0") {
            return str.slice(1, str.length);
        }
        else {
            return str;
        }
    };
    console.log(cutZero("Orange")); // Orange
    console.log(cutZero("0range")); // range
    var removeDash = function (phone) {
        return parseInt(phone.replace(/-/g, ""));
    };
    console.log(removeDash("010-1234-5678")); // orange
    var callBackFunction = function (phone, cutZero, removeDash) {
        return removeDash(cutZero(phone));
    };
    console.log(callBackFunction("010-1111-2222", cutZero, removeDash));
}
{
    var Car = /** @class */ (function () {
        function Car(modelName, carPrice) {
            var _this = this;
            this.tax = function () { return _this.price / 10; };
            this.model = modelName;
            this.price = carPrice;
        }
        return Car;
    }());
    var car1 = new Car("소나타", 3000);
    console.log(car1);
    console.log(car1.tax());
    var Word = /** @class */ (function () {
        function Word() {
            var param = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                param[_i] = arguments[_i];
            }
            var _this = this;
            this.str = [];
            this.num = [];
            param.forEach(function (v) {
                return typeof v === "string" ? _this.str.push(v) : _this.num.push(v);
            });
        }
        return Word;
    }());
    var obj = new Word("kim", 3, 5, "park");
    console.log(obj.num);
    console.log(obj.str);
}
{
    var 학생 = { name: "cm" };
    var 선생 = { name: "cm", age: 10 };
    /*type의 &기호에선, 같은 속성을 선언할 땐 오류가 발생하지 않으나, 해당 타입을 사용해서 오브젝트를 생성할 때 never타입이 발생함,
    이런면에서 interface가 더 좋을 수 있음, 때문에 오브젝트 자료형의 경우 interface를 많이 사용*/
}
{
    var item = {
        brand: "samsung",
        serialNumber: 1360,
        model: ["tv", "phone"],
    };
    var cart = [
        { product: "청소기", price: 7000 },
        { product: "삼다수", price: 800 },
    ];
    var FcPlusMinus = {
        plus: function (a, b) { return a + b; },
        minus: function (a, b) { return a - b; },
    };
}
{
    //rest parameter 타입은 배열 형식으로
    function 함수9() {
        var a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            a[_i] = arguments[_i];
        }
        // console.log(a)
    }
    함수9(1, 2, 3, 4, 5);
    var person = { student: true, age: 20 };
    function 함수10(_a) {
        var student = _a.student, age = _a.age;
        console.log(student, age);
    }
    함수10(person);
    function maxNumber() {
        var v = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            v[_i] = arguments[_i];
        }
        var result = 0;
        v.forEach(function (num) {
            if (result < num) {
                result = num;
            }
        });
        return result;
    }
    console.log(maxNumber(1, 3, 2, 6, 5, 4, 8));
    function 함수11(_a) {
        var user = _a.user, comment = _a.comment, admin = _a.admin;
        console.log(user, comment, admin);
    }
    함수11({ user: "kim", comment: [3, 5, 4], admin: false });
    function 함수12(_a) {
        var v = _a.slice(0);
        console.log.apply(console, v);
    }
    함수12([40, "wine", false]);
}
{
    //this에 대해서
    var obj = {
        value: 42,
        test: this.value,
        regularFunction: function () {
            console.log(this.value); // obj 객체의 value 속성
        },
        arrowFunction: function () {
            console.log(_this.value); // arrowFunction의 경우 오브젝트를 생성하고 있는 전역 스코프에서 값을 바인딩 하게됨
        },
    };
    console.log(obj.test);
    obj.regularFunction(); // 출력: 42 (obj 객체의 value 속성)
    obj.arrowFunction(); // 출력: undefined 또는 다른 값 (글로벌 스코프에서의 value 속성)
    //const obj = { } 는 객체 리터럴 문법으로 오브젝트를 생성하는 거기 때문에, arrowFunction의 경우 오브젝트를 생성하고 있는 전역 스코프에서 값을 바인딩 하게됨
    var Example = /** @class */ (function () {
        function Example(value) {
            var _this = this;
            this.arrowFunction = function () {
                //화살표 함수의 경우 함수 선언 시점에서의 스코프를 기억하기 때문에 프로토타입에 할당됨
                console.log(_this.value);
            };
            this.value = value;
        }
        Example.prototype.regularFunction = function () {
            //선언될 때마다 각각의 인스턴스마다 독립적인 함수가 생성되기 때문에 프로토타입에 할당되지 않음
            console.log(this.value);
        };
        return Example;
    }());
    var example = new Example(42);
    console.log(example);
    var arrowFunction = example.arrowFunction;
    arrowFunction(); // 출력: 42
    example.arrowFunction(); //42
    var regularFunction = example.regularFunction;
    regularFunction(); // TypeError: Cannot read property 'value' of undefined, 함수 자체만 꺼내온것
    example.regularFunction(); //42
    /*정리하자면, const obj = { }는 new Object()함수를 사용하는 것이기 때문에, 새로운 객체를 생성하는거며, 생성하는 위치의 스코프에서 this값을 바인딩
    new Example()은 class내부의 constructor()함수를 호출하기 때문에, class의 스코프에서 this값을 바인딩 */
}
{
    /* Narrowing 방법 추가
     &&연산자에 자료형을 넣으면, 처음 등장하는 falsy값을 남겨줌, 참고로 if(변수 != null)은 null과 undefined 두개를 동시에 걸러줌
     ('str' in v) v가 str타입을 갖고있다면 true
     오브젝트 instanceof 부모class 오브젝트가 해당 부모class로 생성되었다면 true
     비슷한 속성값을 갖고있는 타입을 구분하려면, Literal Types이 필요할 수 있음
     */
}
{
    //함수에 사용하는 never type, return값이 없어야하고, end point가 없어야함, 쓸일은 없고 필요시 :void를 사용하게되지만, 뭔지는 알고가자
    function 함수13() {
        throw new Error();
        while (true) { }
    }
}
{
    //객체지향 프로그래밍을 위한 public, private, protected, static 키워드
    var User = /** @class */ (function () {
        function User(a) {
            this.familyName = "kim"; //private 키워드가 있으면, class내부에서만 수정 가능
            this.name = a + this.familyName;
        }
        User.prototype.이름변경함수 = function (a) {
            this.familyName = a;
        };
        return User;
    }());
    var 유저1 = new User("민수");
    //   console.log(유저1); User { familyName: 'kim', name: '민수kim' }
    유저1.이름변경함수("park");
    //   console.log(유저1);User { familyName: 'park', name: '민수kim' }
}
{
    // protected 키워드
    var User = /** @class */ (function () {
        function User() {
            this.x = 10;
        }
        return User;
    }());
    var NewUser = /** @class */ (function (_super) {
        __extends(NewUser, _super);
        function NewUser() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return NewUser;
    }(User));
    //정리하자면, extends시, private속성은, 다른 class, 자식 모두 수정 불가능, protected는 다른 class는 사용, 수정 가능, 자식은 불가능
}
{
    // static 키워드
    var User_1 = /** @class */ (function () {
        function User() {
            this.y = 20;
            this.sum = User.x + this.y;
        }
        User.x = 10; //부모만 사용 가능,인스턴스(자식)에 물려주질않음 기본적으론 extends로 복사도 가능, ( private, protected, public )+ static이 가능
        return User;
    }());
    var 자식 = new User_1();
    console.log(자식); //User { y: 20, sum: 30 }
    console.log(User_1.x); //10 static속성으로 인해 부모의 값에 접근가능
    //   console.log(User.y) //에러출력
    User_1.x = 20;
    var 자식2 = new User_1();
    console.log(자식2); //User { y: 20, sum: 40 }
}
{
    //정리 & 복습
    var User = /** @class */ (function () {
        function User() {
            this.z = 30; //다른 class에 복사(extends)할 수 있고, class내부에서만 수정가능
        }
        User.x = 10; //다른 class에 복사(extends)할 수 없고, User.x로도 해당 class내부에서만 접근(수정,사용) 가능
        User.y = 20; //부모만 사용가능하며, User.y로 내 외부 모두 접근(수정,사용)가능
        return User;
    }());
}
{
    var User_2 = /** @class */ (function () {
        function User(num) {
            this.addOne = function (num) {
                console.log(User.x + num);
            };
            this.addOne(num);
        }
        User.printX = function () {
            console.log(User.x);
        };
        User.x = 10;
        User.y = 20;
        return User;
    }());
    new User_2(3);
    new User_2(4);
    User_2.printX();
}
{
    /*(index.html 내부)
  <body>
    <script src="index.js"></script>
  </body>*/
    var Square = /** @class */ (function () {
        function Square(width, height, color) {
            this.width = width;
            this.height = height;
            this.color = color;
        }
        Square.prototype.draw = function () {
            var a = Math.random();
            var square = "<div style=\"position:relative; \n            top:".concat(a * 400, "px; \n            left:").concat(a * 400, "px; \n            width:").concat(this.width, "px; \n            height : ").concat(this.height, "px; \n            background:").concat(this.color, "\"></div>");
            //   document.body.insertAdjacentHTML("beforeend", square);
        };
        return Square;
    }());
    var 네모 = new Square(30, 30, "red");
    네모.draw();
    네모.draw();
    네모.draw();
    네모.draw();
}
{
    /*type, interface, ... 등 import export가 가능
      export type Name = string;
      import {Name} from './index.ts'*/
}
{
    //타입을 파라미터로 입력하는 Generic함수
    function 함수14(x) {
        //<타입명> 하면 타입을 파라미터로 받음
        return x[0];
    }
    //<파라미터에 넣을 타입> 명시적으로 기재하나, 안써도 디폴트 값으로 맞춰주긴함
    var a = 함수14([4, 2]); //[4,2]
    var b = 함수14(["4", "2"]); //["4","2"]
    function 함수15(x) {
        // extends 오른쪽에 있는 타입으로 제한을 해둠
        return x - 1;
    }
    var c = 함수15(100);
    var data_1 = '{"name" : "dog", "age" : 1}';
    function animalData(data) {
        return JSON.parse(data);
    }
    console.log(animalData(data_1));
    var Person = /** @class */ (function () {
        function Person(d) {
            this.name = d;
        }
        return Person;
    }());
    var d = new Person("abc");
    d.name;
}
{
    var Car = /** @class */ (function () {
        function Car(a) {
            this.price = 1000;
            this.model = a;
        }
        return Car;
    }());
    var 붕붕이 = new Car("morning");
}
{
    var user = {
        name: "kim",
        age: 20,
        location: "seoul",
    };
    var css = {
        "font-size": {
            "font-size": {
                "font-size": 14,
            },
        },
    };
    var a = "name";
    var obj = {
        color: "red",
        model: "kia",
        price: "300",
    };
}
{
}
{
    var a = void 0;
}
{
    var age = //age는 string 타입
     void 0; //age는 string 타입
    var age2 = //age는 unknown 타입
     void 0; //age는 unknown 타입
}
{
    var age1 = //string
     void 0; //string
    var age2 = //any
     void 0; //any
}
{
}
{
}
{
    var age1 = //string타입
     void 0; //string타입
    var age2 = //unknown타입
     void 0; //unknown타입
}
