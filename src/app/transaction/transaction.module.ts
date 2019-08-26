import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderComponent } from './order/order.component';
import { ApproveComponent } from './approve/approve.component';
import { TransactionComponent } from './transaction.component';


@NgModule({
  declarations: [
                  OrderComponent,
                  ApproveComponent,
                  TransactionComponent
                ],
  imports: [
    CommonModule,
    TransactionRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TransactionModule { }
