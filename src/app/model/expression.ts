import { ExpressionItem } from "./expression-item";
import {
  JsonProperty,
  Serializable,
  deserialize,
  serialize
} from 'typescript-json-serializer';
import { Value } from "./value";
import { Operator } from "./operator";
import { Bracket } from "./bracket";
import { ɵangular_packages_platform_browser_dynamic_testing_testing_b } from "@angular/platform-browser-dynamic/testing";

// the serializer libary needs a function to determine the subtype
// https://github.com/GillianPerard/typescript-json-serializer
export const ExprItemSubType = (exprItem: any) => {
    if (exprItem && exprItem['number'] !== undefined) {
      console.log("return Value: " + JSON.stringify(exprItem))
      return Value
    } else if (exprItem && exprItem['bracket'] !== undefined) {
      console.log("return Bracket: " + JSON.stringify(exprItem))
      return Bracket
    } else if (exprItem && exprItem['operator'] !== undefined) {
      console.log("return Operator: " + JSON.stringify(exprItem))
      return Operator
    } else {
      throw Error("unexpected expr item type: " + JSON.stringify(exprItem))
    }
}

@Serializable()
export class Expression {
  @JsonProperty({type: ExpressionItem, predicate: ExprItemSubType })
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

  last(): ExpressionItem | undefined {
    if (this.items.length>0) {
      return this.items[this.items.length-1];
    } else {
      return undefined
    }
  }

  // kept for learning purposes, Typescript is pretty bad when it comes to types, constructors and so on
  // isTypeLast<T extends typeof ExpressionItem>(baz: T): boolean {
  //   if (this.items.length>0) {
  //     return this.items[this.items.length-1] instanceof baz
  //   } else {
  //     return false
  //   }
  // }

  removeLast() {
    this.items.pop()
  }

  // for internal debug usage
  asString(): string {
    var result = ""
    this.items.forEach(item => {
      if (result != "") {
        if (result != "(" && item.asString()!=")") {
          result += " "
        }
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
      if (result != "") {
        if (result.slice(result.length - 1) != "(" ) {
          if (item.asString()!=")") {
            result += " "
          }
        }
      } 
      if (item.asString() == "*") {
        result = result + "x"
      } else {
        result = result + item.asString()
      }
    })
    return result
  }

}
