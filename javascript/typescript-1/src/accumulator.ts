import { Addable } from "./fraction";
import * as _ from "lodash";

export interface Accumulator<T> {
  sum(addables: T[]):T;
}

export class AddableAccumulator implements Accumulator<Addable> {

  sum(addables: Addable[]): Addable {

    // 提示：
    // _.tail ： 获取一个数组除第一个元素以外的全部元素
    // _.head ： 获取一个数组的第一个元素
    // _.reduce ：

    // 删除下方代码并完成你的代码

    throw new Error("Not implemented");
  }
}