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
 import {MatDividerModule} from '@angular/material/divider';
 import {MatGridListModule} from '@angular/material/grid-list';

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
    MatDialogModule,
    MatDividerModule    
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
    MatDialogModule,
    MatDividerModule    
  ],
  declarations: []   
})
export class MaterialModule { }
