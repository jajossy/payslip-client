import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [LoginComponent, ConfirmComponent],
  imports: [
    CommonModule,
    AuthRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
