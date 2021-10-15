import { ExpressionItem } from "./expression-item";
import {
  JsonProperty,
  Serializable,
} from 'typescript-json-serializer';

@Serializable()
export class Operator extends ExpressionItem {
  @JsonProperty()
  private operator: string

  constructor(operator: string) {
    super();
    this.operator = operator
  }

  get(): string {
    return this.operator
  }

  asString(): string {
    return this.operator
  }
}

// export class PlusOperator extends Operator {}
//
// export class MinOperator extends Operator {}
//
// export class MultiplyOperator extends Operator {}
//
// export class DivideOperator extends Operator {}
//
// export class UnaryMinOperator extends Operator {}
