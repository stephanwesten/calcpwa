import { Component } from '@angular/core';
import * as expreval from 'expr-eval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'calc-pwa';
  terminal = "";
  expression = "";
  expressionComplete = false;
  parser = new expreval.Parser();

  displayTerminal() {
    if (this.terminal == "") {
      return "0"
    } 
    return this.terminal
  }

  displayExpression() {
    if (this.expression == '') {
      return ' '
    } 
    return this.expression.replace('*', 'x')
  }

  checkStateDigit() {
    if (this.expressionComplete) {
      this.expressionComplete = false
      this.terminal = "";
      this.expression = "";
    }
  }

  clickDigit(digit: number) {
    this.checkStateDigit()
    this.terminal = this.terminal + digit;
  }

  clickOperator(operator: string) {
    if (this.expressionComplete) {
      this.expressionComplete = false
      this.expression = this.terminal + " " + operator
      this.terminal = ""
    } else {
      this.expression = this.expression + " " + this.terminal + " " + operator
      this.terminal = ""  
    }
  }

  clickEqual() {
    this.expression = this.expression + " " + this.terminal 
    console.log("expression=", this.expression)
    var expr = this.parser.parse(this.expression)
    this.terminal = expr.evaluate().toString()
    this.expressionComplete = true
  }

  clickClear() {
    this.expression = ""
    this.terminal = ""
  }

}

