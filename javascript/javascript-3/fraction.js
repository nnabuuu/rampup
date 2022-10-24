module.exports = class Fraction {
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

  add(target_fraction) {
    // 类型判断
    if(! target_fraction instanceof Fraction) {
      throw new Error("can only add another Fraction")
    }

    // 计算
    let new_den = this.denominator * target_fraction.denominator;
    let new_num = this.numerator * target_fraction.denominator + target_fraction.numerator * this.denominator;
    let new_gcd = Fraction.gcd(new_num, new_den);
    return new Fraction(new_num / new_gcd, new_den / new_gcd);
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