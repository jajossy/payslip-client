import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SupplierComponent } from './supplier/supplier.component';
import { StockComponent } from './stock.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { StockTagComponent } from './stock-tag/stock-tag.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { InsertStockComponent } from './insert-stock/insert-stock.component';
import { CurrentStockComponent } from './current-stock/current-stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'stock', component: StockComponent, children: [    
    { path: 'supplier', component: SupplierComponent },
    { path: 'addsupplier', component: AddSupplierComponent },
    { path: 'stocktag', component: StockTagComponent },
    { path: 'stockin', component: StockInComponent },
    { path: 'insertstock', component: InsertStockComponent },
    { path: 'currentstock', component: CurrentStockComponent }
  ] }
];

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ],
  declarations: []
})
export class StockRoutingModule { }
