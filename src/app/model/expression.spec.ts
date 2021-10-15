import { Bracket } from "./bracket";
import { Expression } from "./expression";
import { ExprItemSubType as ExprItemSubType } from "./expression";
import { Operator } from "./operator";
import { Value } from "./value";

describe('Expression', () => {

    it('should create', () => {
        const expr = new Expression
        expect(expr.asString()).toEqual("")
        expect(expr.last()).toBeUndefined()
        const value = new Value(4)
        expect(value.asString()).toEqual("4")
        expr.add(value)
        expect(expr.asString()).toEqual("4")
        expect(expr.last()).toEqual(new Value(4))
    });

    it("ExprItemSubType", () => {
        expect(ExprItemSubType(new Operator("+"))).toEqual(Operator)
        expect(ExprItemSubType(new Bracket("("))).toEqual(Bracket)
        expect(ExprItemSubType(new Value(7))).toEqual(Value)
    })
    
})

