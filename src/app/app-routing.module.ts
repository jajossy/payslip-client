import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full'},
  { path: 'auth', loadChildren: "./auth/auth.module#AuthModule"}, 
  { path: 'payslip', loadChildren: "./payslip/payslip.module#PayslipModule"},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }  
  //{ path: 'dashboard', component: DashboardComponent },
  //{ path: 'detail/:id', component: HeroDetailsComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
