import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule,
  MatButtonModule, MatListModule, MatMenuModule, MatTableModule,
  MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatDatepickerModule, MatNativeDateModule, MatCardModule, MatChipsModule
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatChipsModule
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
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatChipsModule
  ],
  declarations: []   
})
export class MaterialModule { }
