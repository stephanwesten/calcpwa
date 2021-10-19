import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SheetComponent } from './sheet/sheet.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/calc', pathMatch: 'full' },
  { path: 'calc', component:  CalculatorComponent},
  { path: 'sheets/:sheetIdsecond', component:  SheetComponent},
];

// { path: 'calculator', component:  CalculatorComponent},
// { path: 'sheets/:sheetId', component:  SheetComponent},


export const appRouting = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ],
  declarations: [],
})
export class AppRoutingModule { }
