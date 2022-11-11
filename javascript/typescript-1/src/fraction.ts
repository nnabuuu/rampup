export interface Addable {
  add(target: Addable): Addable
}

export interface FractionInterface {
  readonly numerator: number;
  readonly denominator: number;
  toString(): string
}

export class Fraction implements FractionInterface, Addable {
  readonly _numerator: number;
  readonly _denominator: number;

  constructor(private readonly num: number, private readonly den: number) {
    this._numerator = num;
    this._denominator = den;
  }

  toString(): string {
    return `${this.numerator} / ${this.denominator}`;
  }

  get numerator(): number {
    return this._numerator;
  }

  get denominator(): number {
    return this._denominator;
  }

  add(target_fraction: Fraction): Fraction {
    // 类型判断
    // 我们不再需要这个逻辑了，Typescript帮我们进行了校验
    // if(! target_fraction instanceof Fraction) {
    //   throw new Error("can only add another Fraction")
    // }

    // 计算
    let new_den: number = this.denominator * target_fraction.denominator;
    let new_num: number = this.numerator * target_fraction.denominator + target_fraction.numerator * this.denominator;
    let new_gcd: number = Fraction.gcd(new_num, new_den);
    return new Fraction(new_num / new_gcd, new_den / new_gcd);
  }

  // 静态方法
  //// 辗转相除法，求公约数
  static gcd(m: number, n: number): number {
    while(m % n !== 0) {
      let old_m: number = m;
      let old_n: number = n;
      m = old_n;
      n = old_m % old_n;
    }
    return n;
  }
}