import { ExpressionItem } from "./expression-item";

export class Expression {
  private items: Array<ExpressionItem>;
  outcome?: number;

  constructor() {
    this.items = []
    this.outcome = undefined
  }

  size(): number {
    return this.items.length;
  }

  add(value: ExpressionItem): void {
    this.items.push(value);
  }

  get(index: number): ExpressionItem {
    return this.items[index];
  }

  // for internal usage
  asString(): string {
    var result = ""
    this.items.forEach(item => {
      result = result + " " + item.asString()
    })
    if (this.outcome) {
      result += " = " + this.outcome
    }
    return result
  }

  // for display usage
  asDisplay(): string {
    var result = ""
    this.items.forEach(item => {
      if (item.asString() == "*") {
        result = result + " " + "x"
      } else {
        result = result + " " + item.asString()
      }
    })
    return result
  }

}
