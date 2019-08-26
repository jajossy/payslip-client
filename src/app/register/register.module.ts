import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AgentComponent } from './agent/agent.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './register.component';


@NgModule({
  declarations: [AgentComponent,
                  RegisterComponent,
                  CustomerComponent
                ],
  imports: [
    CommonModule,
    RegisterRoutingModule, 
    SharedModule,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }
