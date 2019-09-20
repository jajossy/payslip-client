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
    { path: 'supplier', component: SupplierComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} },
    { path: 'addsupplier', component: AddSupplierComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} },
    { path: 'stocktag', component: StockTagComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} },
    { path: 'stockin', component: StockInComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} },
    { path: 'insertstock', component: InsertStockComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} },
    { path: 'currentstock', component: CurrentStockComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'admin']} }
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
