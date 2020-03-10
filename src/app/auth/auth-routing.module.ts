import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';

const routes: Routes = [  
  { path: 'login', component: LoginComponent },
  { path: 'confirm', component: ConfirmComponent }
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
export class AuthRoutingModule { }
