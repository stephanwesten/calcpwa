import { Component } from '@angular/core';
import * as expreval from 'expr-eval';
import { Expression } from './model/expression';
import { Operator } from './model/operator';
import { Value } from './model/value';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'calc-pwa';
  terminal = "";
  expression = new Expression
  expressionComplete = false; // replace this with this.sheet.getLastOutcome()
  parser = new expreval.Parser();

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
    //TODO: if expression would have an outcome property, we could use that to check
    // whether it is complete or not
    if (this.expressionComplete) {
      this.expressionComplete = false
      this.expression = new Expression
      // TODO: instead of storing the value of terminal, we need to store the last calc value
      // perhaps we can ask the previous expression for its outcome
      this.expression.add(new Value(Number(this.terminal)))
      this.expression.add(new Operator(operator))
      this.terminal = ""
    } else {
      this.expression.add(new Value(Number(this.terminal)))
      this.expression.add(new Operator(operator))
      this.terminal = ""  
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

  clickEqual() {
    this.expression.add(new Value(Number(this.terminal)))
    console.log("expression=", this.expression.asString())
    var expr = this.parser.parse(this.expression.asString())
    this.terminal = expr.evaluate().toString()
    this.expressionComplete = true
  }

  clickClear() {
    this.expression = new Expression
    this.terminal = ""
  }

}

