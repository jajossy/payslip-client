import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../../../interface/dialogdata';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  public closeDialog = () => {
    this.dialogRef.close();
  }

}
