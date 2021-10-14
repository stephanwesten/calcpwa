import { Expression } from "./expression";
import {
  JsonProperty,
  Serializable,
  deserialize,
  serialize
} from 'typescript-json-serializer';

@Serializable()
export class Sheet {

  @JsonProperty({ type: Expression })
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
