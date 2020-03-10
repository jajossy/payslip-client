import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { OrderItem } from '../../../interface/orderitem';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {

  action:string;
  local_data:any;

  constructor(public dialogRef: MatDialogRef<InputDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: OrderItem) 
              {
                console.log(data);
                this.local_data = {...data};
                this.action = this.local_data.action;
               }

  ngOnInit() {
  }

  doAction(){
    this.dialogRef.close({event:this.action, data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  } 

}
