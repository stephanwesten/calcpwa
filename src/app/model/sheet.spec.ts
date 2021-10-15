import { Expression } from './expression';
import { deserialize, serialize } from 'typescript-json-serializer';
import { Sheet } from './sheet';
import { Value } from './value';
import { Operator } from './operator';
import { Bracket } from './bracket';


describe('sheet', () => {

    it('serialize', () => {        
        var expr = new Expression()
        expr.add(new Bracket("("))
        expr.add(new Value(4))
        expr.add(new Operator("+"))
        expr.add(new Value(5))
        expr.add(new Bracket(")"))
        var sheet = new Sheet
        sheet.add(expr)
        var json: string
        json = serialize(sheet);
        const jsonString = JSON.stringify(json, null, 2);
        console.log(jsonString.toString())
        expect(jsonString).toContain('4')

        var newSheet = deserialize<Sheet>(jsonString, Sheet)
        expect(newSheet.size()).toEqual(1)
        expr = newSheet.get(0)
        expect(expr.size()).toEqual(5)
        expect(expr.get(0)).toEqual(new Bracket("("))
        expect(expr.get(1)).toEqual(new Value(4))
        expect(expr.get(2)).toEqual(new Operator('+'))
        expect(expr.get(4)).toEqual(new Bracket(")"))
    });
    
})


