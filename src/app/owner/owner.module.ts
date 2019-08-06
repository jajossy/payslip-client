import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { MaterialModule } from './../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { OwnerListComponent } from './owner-list/owner-list.component';

@NgModule({
  declarations: [OwnerListComponent],
  imports: [
    CommonModule,
    OwnerRoutingModule, 
    MaterialModule,
    FlexLayoutModule
  ]
})
export class OwnerModule { }
