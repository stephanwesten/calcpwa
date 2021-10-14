import { Expression } from './expression';
import { deserialize, serialize } from 'typescript-json-serializer';
import { Sheet } from './sheet';
import { Value } from './value';
import { Operator } from './operator';


describe('sheet', () => {

    it('serialize', () => {        
        var expr = new Expression()
        expr.add(new Value(4))
        expr.add(new Operator("+"))
        expr.add(new Value(5))
        var sheet = new Sheet
        sheet.add(expr)
        var json: string
        json = serialize(sheet);
        const jsonString = JSON.stringify(json, null, 4);
        console.log(jsonString.toString())
        expect(jsonString).toContain('4')

        var newSheet = deserialize<Sheet>(jsonString, Sheet)
        expect(newSheet.size()).toEqual(1)
        expr = newSheet.get(0)
        expect(expr.size()).toEqual(3)
        expect(expr.get(0)).toEqual(new Value(4))
        expect(expr.get(1)).toEqual(new Operator('+'))
    });
    
})


