import { ExpressionItem } from "./expression-item";
import {
  JsonProperty,
  Serializable,
  deserialize,
  serialize
} from 'typescript-json-serializer';

// naming this class Number is not possible
@Serializable()
export class Value extends ExpressionItem {
  
  // bit worried that the type should allow for string - as this is what the user enters
  constructor(
    @JsonProperty()
    readonly number: number
  ) {
    super();
    this.number = number
  }

  get(): number {
    return this.number
  }

  asString(): string {
    return this.number.toString()
  }

}
