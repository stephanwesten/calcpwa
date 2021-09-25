import { Expression } from "./expression";

export class Sheet {
  readonly items: Array<Expression>;

  constructor() {
    this.items = [];
  }

  size(): number {
    return this.items.length;
  }

  add(value: Expression): void {
    this.items.push(value);
  }

  get(index: number): Expression {
    return this.items[index];
  }

}
