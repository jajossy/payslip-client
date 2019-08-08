import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SupplierComponent } from './supplier/supplier.component';
import { StockComponent } from './stock.component';

@NgModule({
  declarations: [SupplierComponent,
                StockComponent],
  imports: [
    CommonModule,
    StockRoutingModule, 
    MaterialModule,
    FlexLayoutModule
  ]
})
export class StockModule { }
