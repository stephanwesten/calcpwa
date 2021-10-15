import { ExpressionItem } from "./expression-item";
import {
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';

// bracket can be an open or close bracket

//TODO: replace bracket string with enum

@Serializable()
export class Bracket extends ExpressionItem {
  
  constructor(
    @JsonProperty()
    readonly bracket: string
  ) {
    super();
    // validation does not work with the serializer library
    // the deserialized calls the contructor with argument undefined
    // if (!(bracket==")" || bracket=="(")) {
    //     throw Error("invalid bracket: " + bracket)
    // }
    this.bracket = bracket
  }

  get(): string {
    return this.bracket
  }

  asString(): string {
    return this.bracket
  }
}
