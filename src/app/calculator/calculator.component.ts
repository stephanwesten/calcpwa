import { Component, OnInit } from '@angular/core';
import * as expreval from 'expr-eval';
import { Expression } from '../model/expression';
import { Operator } from '../model/operator';
import { Value } from '../model/value';
import { CalcService } from '../calc.service';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  host: {
    '(document:keydown)': 'handleKeyboardEvents($event)'
  }
})

// 35.77 + 45 gaf zo'n uitkomst met heel veel nullen en een 1
export class CalculatorComponent implements OnInit {

  terminal = "";
  expression = new Expression
  expressionComplete = false; // replace this with this.sheet.getLastOutcome()
  parser = new expreval.Parser();

  constructor(private calcService: CalcService) { }

  ngOnInit(): void {
  }

  displayTerminal() {
    if (this.terminal == "") {
      return "0"
    } 
    return this.terminal
  }

  displayExpression() {
    if (this.expression.size() == 0) {
      return ' '
    } 
    return this.expression.asDisplay()
  }

  // rename: this is not a check, but some kind of reset
  checkStateDigit() {
    if (this.expressionComplete) {
      this.expressionComplete = false
      this.terminal = "";
      this.expression = new Expression
    }
  }

  clickDigit(digit: number) {
    this.checkStateDigit()
    this.terminal = this.terminal + digit;
  }

  clickOperator(operator: string) {
    // determine whether the user wants to use the outcome of the previous calculation
    // to start a new calculation
    //TODO: use expression  outcome property to check whether it is complete or not
    if (this.expressionComplete) {
      this.expressionComplete = false
      this.expression = new Expression
      this.expression.add(new Value(Number(this.terminal)))
      this.expression.add(new Operator(operator))
      this.terminal = ""
    } else {
      // check if we should override the previous operator
      if (this.terminal == "") {
        if (this.expression.size() > 1) {
          this.expression.removeLast()
          this.expression.add(new Operator(operator))    
        }
      } else {  
        // most common case: add the value with the operator 
        this.expression.add(new Value(Number(this.terminal)))
        this.expression.add(new Operator(operator))
        this.terminal = ""  
      }
    }
  }

  clickDecSep() {
    if (this.terminal == "") {
      this.terminal = "0."
    } if (this.terminal.indexOf(".") < 0) {
      this.terminal = this.terminal + "."
    } else {
      console.log("ignore decimal separator")
    }
  }

  handleKeyboardEvents(event: KeyboardEvent) {
    console.log(event)
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const operators =  ["+", "-", "/", "*"]
    if (digits.indexOf(event.key) >= 0) {
      this.terminal += event.key
    } else if (operators.indexOf(event.key) >= 0) {
      this.clickOperator(event.key)
    } else if (event.key == "x") {
      this.clickOperator("*")
    } else if (event.key == ".") {
      this.clickDecSep()
    } else if (event.key == "=" || event.key == "Enter") {
      this.clickEqual()
    } else if (event.key == "c" || event.key == "Escape") {
      this.clickClear()
    } else if (event.key == "P") {
      this.populateSheet()
    } 
  }

  clickEqual() {
    if (!this.expressionComplete) {
      this.expression.add(new Value(Number(this.terminal)))
      console.log("expression=", this.expression.asString())
      // this is tricky; the debug representation asString() is not necessarily something that can be parsed and evaluated
      var expr = this.parser.parse(this.expression.asString())
      var result = expr.evaluate()
      this.terminal = result.toString()
      this.expressionComplete = true
      this.expression.outcome = result
      this.calcService.currentSheet.add(this.expression)
    } else {
      console.log("click equal ignored")
    }
  }

  clickDelete() {
    // to support a delete that includes operators we need to keep a log of events
    // with each event we store the current state so we can easily restore
    if (this.terminal == "") {
        console.log("ignore delete")
    } else if (this.terminal == "0.") {
      this.terminal = ""
    } else {
      this.terminal = this.terminal.substr(0, this.terminal.length-1)
    }
  }


  clickClear() {
    this.expression = new Expression
    this.terminal = ""
  }  

  populateSheet() {
    this.clickDigit(5)
    this.clickOperator("*")
    this.clickDigit(2)
    this.clickEqual()
    this.clickOperator("+")
    this.clickDigit(3.5)
    this.clickEqual()
  }

}
