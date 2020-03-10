import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PayslipRoutingModule } from './payslip-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin/admin.component';
import { GifmisComponent } from './gifmis/gifmis.component';
import { IppisComponent } from './ippis/ippis.component';
import { OthersComponent } from './others/others.component';
import { PayslipComponent } from './payslip.component';



@NgModule({
  declarations: [
                  AdminComponent,
                  GifmisComponent,
                  IppisComponent,
                  OthersComponent,
                  PayslipComponent                 
                ],
  imports: [
    CommonModule,
    PayslipRoutingModule, 
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PayslipModule { }
