import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { RealStockComponent } from './realstock/realstock.component';
import { ApproveComponent } from './approve/approve.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { TransactionComponent } from './transaction.component';


import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard], children: [    
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'agent']}  },
    { path: 'approve', component: ApproveComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'account']} },
    { path: 'realstock', component: RealStockComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'manager', 'account', 'operation','admin']} },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], data: { role : ['superadmin', 'operation']} },   
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
