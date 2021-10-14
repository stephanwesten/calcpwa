import { ExpressionItem } from "./expression-item";
import {
  JsonProperty,
  Serializable,
  deserialize,
  serialize
} from 'typescript-json-serializer';
import { Value } from "./value";
import { Operator } from "./operator";

// this function determines the subtype
const ValueOrOperand = (exprItem: any) => {
  return exprItem && exprItem['number'] !== undefined
      ? Value
      : Operator;
};

@Serializable()
export class Expression {
  @JsonProperty({type: ExpressionItem, predicate: ValueOrOperand })
  private items: Array<ExpressionItem>;
  @JsonProperty()
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

  removeLast() {
    this.items.pop()
  }

  // for internal debug usage
  asString(): string {
    var result = ""
    this.items.forEach(item => {
      if (result != "") {
        result += " "
      } 
      result = result + item.asString()
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
