import { Expression } from "./expression";
import { Value } from "./value";

describe('Expression', () => {

    it('should create', () => {
        var expr = new Expression
        expect(expr.asString()).toEqual("")
        var value = new Value(4)
        expect(value.asString()).toEqual("4")
        expr.add(value)
        expect(expr.asString()).toEqual("4")
    });
    
})
