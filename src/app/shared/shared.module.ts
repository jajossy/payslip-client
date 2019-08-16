import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { StockDialogComponent } from './dialogs/stock-dialog/stock-dialog.component';
 
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent],
  entryComponents:[
    SuccessDialogComponent, ErrorDialogComponent, StockDialogComponent
  ]
})
export class SharedModule { }