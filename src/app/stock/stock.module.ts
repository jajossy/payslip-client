import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SupplierComponent } from './supplier/supplier.component';
import { StockComponent } from './stock.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { StockTagComponent } from './stock-tag/stock-tag.component';
import { StockInComponent } from './stock-in/stock-in.component';
import { InsertStockComponent } from './insert-stock/insert-stock.component';
import { CurrentStockComponent } from './current-stock/current-stock.component';

@NgModule({
  declarations: [SupplierComponent,
                StockComponent,
                AddSupplierComponent,
                StockTagComponent,
                StockInComponent,
                InsertStockComponent,
                CurrentStockComponent],
  imports: [
    CommonModule,
    StockRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class StockModule { }
