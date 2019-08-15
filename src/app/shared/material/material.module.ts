import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { 
  MatTabsModule, MatSidenavModule, MatToolbarModule, MatIconModule,
  MatButtonModule, MatListModule, MatMenuModule, MatTableModule,
  MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatDatepickerModule, MatNativeDateModule, MatCardModule, MatChipsModule,
  MatOptionModule, MatSelectModule, MatDialogModule
 } from '@angular/material';
 import {MatProgressBarModule} from '@angular/material/progress-bar';

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
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule
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
    MatChipsModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  declarations: []   
})
export class MaterialModule { }
