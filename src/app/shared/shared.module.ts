import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { StockDialogComponent } from './dialogs/stock-dialog/stock-dialog.component';
import { InputDialogComponent } from './dialogs/input-dialog/input-dialog.component';
import { InputApproveDialogComponent } from './dialogs/inputApprove-dialog/inputApprove-dialog.component';
import { ApproveDialogComponent } from './dialogs/approve-dialog/approve-dialog.component';
import { CheckoutDialogComponent } from './dialogs/checkout-dialog/checkout-dialog.component';
 
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule  
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent, InputDialogComponent,
                ApproveDialogComponent, CheckoutDialogComponent, InputApproveDialogComponent],
  entryComponents:[
    SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent, InputDialogComponent,
     ApproveDialogComponent, CheckoutDialogComponent, InputApproveDialogComponent
  ]
})
export class SharedModule { }