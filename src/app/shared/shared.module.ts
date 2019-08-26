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
  declarations: [SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent, InputDialogComponent],
  entryComponents:[
    SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent, InputDialogComponent
  ]
})
export class SharedModule { }