import {
    JsonProperty,
    Serializable,
    deserialize,
    serialize
  } from 'typescript-json-serializer';

  // this is an abstract class, but this is not supported by the serializable library
  
  @Serializable()
  export class ExpressionItem {
    asString(): string {
      return "error - abstract class"
    }
}
