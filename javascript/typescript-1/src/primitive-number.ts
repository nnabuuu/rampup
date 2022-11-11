import { Addable } from "./fraction";

export class PrimitiveNumber implements Addable {

  constructor(private readonly _number: number){};

  add(target: PrimitiveNumber): PrimitiveNumber {
    return new PrimitiveNumber(this._number + target._number);
  }

}