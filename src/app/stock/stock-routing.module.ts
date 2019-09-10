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

import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/stock/', pathMatch: 'full'},
  { path: 'stock', component: StockComponent, canActivate: [AuthGuard], children: [    
    { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard] },
    { path: 'addsupplier', component: AddSupplierComponent, canActivate: [AuthGuard] },
    { path: 'stocktag', component: StockTagComponent, canActivate: [AuthGuard] },
    { path: 'stockin', component: StockInComponent, canActivate: [AuthGuard] },
    { path: 'insertstock', component: InsertStockComponent, canActivate: [AuthGuard] },
    { path: 'currentstock', component: CurrentStockComponent, canActivate: [AuthGuard] }
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
