import { ExpressionItem } from "./expression-item";

// naming this class Number is not possible
export class Value extends ExpressionItem {
  private value: number
  
  // bit worried that the type should allow for string - as this is what the user enters
  constructor(readonly number: number) {
    super();
    this.value = number
  }

  get(): number {
    return this.value
  }

  asString(): string {
    return this.value.toString()
  }

}
