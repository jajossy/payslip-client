import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule,
  MatButtonModule, MatListModule, MatMenuModule, MatTableModule,
  MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule
 } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule, 
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  declarations: []   
})
export class MaterialModule { }
