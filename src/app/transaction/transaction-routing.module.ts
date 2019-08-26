import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { ApproveComponent } from './approve/approve.component';
import { TransactionComponent } from './transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'transaction', component: TransactionComponent, children: [    
    { path: 'order', component: OrderComponent },
    { path: 'approve', component: ApproveComponent },    
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
export class TransactionRoutingModule { }
