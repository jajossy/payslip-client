import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { GifmisComponent } from './gifmis/gifmis.component';
import { IppisComponent } from './ippis/ippis.component';
import { OthersComponent } from './others/others.component';
import { UploadComponent } from './upload/upload.component';
import { AvailableComponent } from './available/available.component';
import { CategoryComponent } from './category/category.component';
import { StaffComponent } from './staff/staff.component';
import { PayslipComponent } from './payslip.component';


import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full'},
  { path: 'payslip', component: PayslipComponent, canActivate: [AuthGuard], children: [    
    { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { role : ['admin']}  },
    { path: 'gifmis', component: GifmisComponent, canActivate: [AuthGuard], data: { role : ['admin']} },
    { path: 'upload', component: UploadComponent, canActivate: [AuthGuard], data: { role : ['admin']} },
    { path: 'available', component: AvailableComponent, canActivate: [AuthGuard] },
    { path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: { role : ['admin']} },
    { path: 'staff', component: StaffComponent, canActivate: [AuthGuard], data: { role : ['admin']} },
    { path: 'ippis', component: IppisComponent, canActivate: [AuthGuard] },
    { path: 'others', component: OthersComponent, canActivate: [AuthGuard], data: { role : ['admin']} },   
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
export class PayslipRoutingModule { }
