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

    it('should display', () => {
        const expr = new Expression
        expr.add(new Value(4))
        expr.add(new Operator("+"))
        expr.add(new Value(5))
        expect(expr.asDisplay()).toEqual("4 + 5")
    });

    it('should display with brackets', () => {
        const expr = new Expression
        expr.add(new Value(4))
        expr.add(new Operator("+"))
        expr.add(new Bracket("("))
        expr.add(new Value(5))
        expr.add(new Bracket(")"))
        expect(expr.asDisplay()).toEqual("4 + (5)")
    });

    it("ExprItemSubType", () => {
        expect(ExprItemSubType(new Operator("+"))).toEqual(Operator)
        expect(ExprItemSubType(new Bracket("("))).toEqual(Bracket)
        expect(ExprItemSubType(new Value(7))).toEqual(Value)
    })
    
})

