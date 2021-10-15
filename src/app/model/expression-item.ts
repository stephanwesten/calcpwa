import {
    Serializable,
  } from 'typescript-json-serializer';

  // this is an abstract class, but this is not supported by the serializable library
  // perhaps an interface is a better choice
  
  @Serializable()
  export class ExpressionItem {
    asString(): string {
      return "error - abstract class"
    }

}
