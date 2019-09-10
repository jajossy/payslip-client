import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { OrderComponent } from './order/order.component';
import { RealStockComponent } from './realstock/realstock.component';
import { ApproveComponent } from './approve/approve.component';
import { TransactionComponent } from './transaction.component';

import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'transaction', component: TransactionComponent, canActivate: [AuthGuard], children: [    
    { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
    { path: 'approve', component: ApproveComponent, canActivate: [AuthGuard] },
    { path: 'realstock', component: RealStockComponent, canActivate: [AuthGuard] },   
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
