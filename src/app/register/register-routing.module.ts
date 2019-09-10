import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { AgentComponent } from './agent/agent.component';
import { CustomerComponent } from './customer/customer.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], children: [    
    { path: 'agent', component: AgentComponent, canActivate: [AuthGuard] },
    { path: 'customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'user', component: UserComponent, canActivate: [AuthGuard] }    
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
export class RegisterRoutingModule { }
