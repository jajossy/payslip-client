import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Order } from '../../../interface/order';

@Component({
  selector: 'app-inputapprove-dialog',
  templateUrl: './inputapprove-dialog.component.html',
  styleUrls: ['./inputapprove-dialog.component.css']
})
export class InputApproveDialogComponent implements OnInit {

  action:string;
  local_data:any;

  paymentType : payment[] = [
    { 'id' : 1, 'Description': 'Cash'},
    { 'id' : 2, 'Description': 'Cheque'},
    { 'id' : 3, 'Description': 'Barter'}
  ]
     

  constructor(public dialogRef: MatDialogRef<InputApproveDialogComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: Order) 
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

export interface payment {
  id: number;
  Description: string;
}
