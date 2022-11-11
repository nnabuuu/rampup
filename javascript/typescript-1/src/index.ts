import "reflect-metadata";
import { Addable, Fraction } from "./fraction";
import { Accumulator, AddableAccumulator } from "./accumulator";
import * as _ from "lodash";
import { PrimitiveNumber } from "./primitive-number";

async function main(){

  // Typescript概念1： 类型约束
  const a: number = 1;
  console.log("a:", a);

  function addOne(input: number): number {
    return input + 1;
  }
  const aPlus = addOne(a);
  console.log("aPlus:", aPlus);

  // typescript会对类型进行检查，因此下面的调用会在**编译期**报错
  // 取消下面的注释再次执行tsc 或 ts-node ./src/index.ts
  // addOne("1");

  // 但可以使用下面这行注释令typescript跳过检查：

  // @ts-ignore
  const aPlus2 = addOne("1");
  console.log("aPlus2 should be 11", aPlus2); // 此时会直接以javascript的 "1" + 1方法进行

  // Typescript语法2：接口 Interface
  // Typescript语法3：泛型 Generics

  // 参考accumulator.ts / fraction.ts中的语法

  // 练习：
  // 到accumulator.ts，完成AddableAccumulator的sum(addables: Addable[]): Addable 方法
  // 并执行查看结果

  const fractions: Fraction[] = _.map(_.range(2, 51), (number) => (new Fraction(1, number)))
  const accumulator: Accumulator<Addable> = new AddableAccumulator();
  const sum_of_primitive_fractions: Addable = accumulator.sum(fractions);
  console.log(sum_of_primitive_fractions.toString());

  const primitive_numbers: PrimitiveNumber[] = _.map(_.range(2, 51), (number) => (new PrimitiveNumber(number)))
  const sum_of_primitive_numbers = accumulator.sum(primitive_numbers);
  console.log(sum_of_primitive_numbers);

}


main();
