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
import { UploadComponent } from './upload/upload.component';
import { AvailableComponent } from './available/available.component';
import { CategoryComponent } from './category/category.component';
import { StaffComponent } from './staff/staff.component';
import { PayslipComponent } from './payslip.component';



@NgModule({
  declarations: [
                  AdminComponent,
                  GifmisComponent,
                  IppisComponent,
                  OthersComponent,
                  CategoryComponent,
                  UploadComponent,
                  AvailableComponent,
                  StaffComponent,
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
