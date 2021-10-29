import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SheetComponent } from './sheet/sheet.component';
import { CalculatorComponent } from './calculator/calculator.component';

const routes: Routes = [
  { path: '', redirectTo: '/calc', pathMatch: 'full' },
  { path: 'calc', component:  CalculatorComponent},
  { path: 'sheets', component:  SheetComponent, pathMatch: 'full' },
  { path: 'share', component:  SheetComponent, pathMatch: 'full' },         // user clicked share in toolbar
  { path: 'sheets/:sheetId', component:  SheetComponent},                   // TODO: share/:sheetId
];

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
