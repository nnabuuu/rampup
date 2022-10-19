// 1. 变量

let a = 1;
const b = 2;
console.log("a:", a);
console.log("b:", b);

const boolean = true;
console.log("boolean", boolean);
console.log("AND / OR / NOT", boolean && true, boolean || true, !boolean);

const str = "this is a string";
console.log("str:", str);

const list = [1, 2, 3];
console.log("list:", list);

const object = {val1: 1, val2: 2, val3: "val3"};
console.log("object", object);


// 2. 函数

//// 普通函数
function foo(a, b) {
  return a + b;
}
console.log("foo(1, 2): ", foo(1, 2));

//// Lambdas（箭头函数，基本上一样，除了需要使用this的场景）
const bar = (a, b) => {
  return a + b;
}
console.log("bar(1, 2): ", bar(1, 2));

const baz = (a, b) => (a + b)
console.log("baz(1, 2): ", baz(1, 2));

// 3. 条件判断

let value = 3;
if(value < 3) {
  console.log("value < 3");
} else if(value === 3) {
  console.log("value is 3");
} else {
  console.log("value > 3");
}

// 4. 循环与迭代

//// 循环
for(let i = 0; i < 5; i++) {
  console.log("loop with i =", i);
}

//// 迭代
let arr = [1, 3, 5, 7, 9, "foo"];

for(let index in arr) {
  console.log("iterate arr with index:", index, "value", arr[index]);
}

arr.forEach((value, index) => {
  console.log("iterate arr with index", index, "value", value);
})

// 5. 类

//// 类
class Fraction {
  constructor(num, den) {
    this._numerator = num;
    this._denominator = den;
  }

  toString() {
    return `${this.numerator} / ${this.denominator}`;
  }

  get numerator() {
    return this._numerator;
  }

  get denominator() {
    return this._denominator;
  }

  set numerator(v) {
    console.log("error cannot set the numerator");
  }
}

let x = new Fraction(2,3);
let y = new Fraction(1,6);
console.log("x is", x.toString());
console.log("y is", y.toString());

//// 继承

class MyFraction extends Fraction {
  constructor(num, den) {
    super(num, den);
  }

  add(target_fraction) {
    // 类型判断
    if(! target_fraction instanceof Fraction) {
      throw new Error("can only add another Fraction")
    }

    // 计算
    let new_den = this.denominator * target_fraction.denominator;
    let new_num = this.numerator * target_fraction.denominator + target_fraction.numerator * this.denominator;
    let new_gcd = MyFraction.gcd(new_num, new_den);
    return new MyFraction(new_num / new_gcd, new_den / new_gcd);
  }

  // 静态方法
  //// 辗转相除法，求公约数
  static gcd(m, n) {
    while(m % n !== 0) {
      let old_m = m;
      let old_n = n;
      m = old_n;
      n = old_m % old_n;
    }
    return n;
  }
}

console.log("4 和 6 的最大公约数是:", MyFraction.gcd(4, 6));
let fraction1 = new MyFraction(1, 2);
let fraction2 = new MyFraction(1, 6);
console.log("1 / 2 + 1 / 6 = ", fraction1.add(fraction2).toString());

// 6. 练习

// 6.1 练习1
// 1. 实现 FractionPro类，继承Fraction，实现:
//  * 函数equal(target_fraction)：比较两个FractionPro类对象代表的值是否相同
//  * 函数sub(target_fraction)：减法
//  * 函数mul(target_fraction)：乘法
//  * 函数div(target_fraction)：除法

// 2. 测试FractionPro类的功能的正确性
//  * 使用console.log()进行输出即可

class FractionPro extends Fraction {
  constructor(num, den) {
    super(num, den);
  }

  equal(target_fraction) {
    throw new Error("Not implemented");
  }

  sub(target_fraction) {
    throw new Error("Not implemented");
  }

  mul(target_fraction) {
    throw new Error("Not implemented");
  }

  div(target_fraction) {
    throw new Error("Not implemented");
  }
}