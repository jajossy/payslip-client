import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator,
         MatSort, MatDialog } from '@angular/material';

import { FormGroup } from '@angular/forms';
//import { CurrentStock } from '../../../interface/currentstock';
import { Order } from '../../../interface/order';
import { OrderItem } from '../../../interface/orderitem';
import { Sale } from '../../../interface/sale';
import { RepositoryService } from './../../../repository.service';
import { ProgressService } from './../../../progress.service';

@Component({
  selector: 'app-approve-dialog',
  templateUrl: './approve-dialog.component.html',
  styleUrls: ['./approve-dialog.component.css']
})
export class ApproveDialogComponent implements OnInit {
  _data: any;
  order : Order;
  
  // table variables
  orderITem: OrderItem;
  public array: any;
  public displayedColumns = [ 
                              'ProductId',
                              'Quantity',
                              'SalesUnitPrice',
                              'SalesTotalAmount',
                              'OrderId',
                              'BatchNo'                              
                              ]
                            
  public dataSource = new MatTableDataSource<OrderItem>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  

  
  constructor(public dialogRef: MatDialogRef<ApproveDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Order,
              private repoService: RepositoryService,
              private progressService: ProgressService) 
              {
                  this._data = data;
                  //alert(this._data.id);
                  //this.checkCurrentStock(this._data.CompanyProductNameId);
                  this.getOrderItems(this._data.id);
              }

  ngOnInit() {    
    //this.checkCurrentStock(this._data.id);    
  }
  

  public getOrderItems(id: string): void {
    
    this.repoService.GetAll(`api/Order/GetSpecificItem/${id}`)
      .subscribe(orderItem => {
        this.dataSource.data = orderItem
        this.dataSource = new MatTableDataSource<OrderItem>(orderItem);
        this.dataSource.paginator = this.paginator;
        this.array = orderItem;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(orderItem)
      });
  }    

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  closeDialog(){
    //alert('close');
    this.dialogRef.close(this._data.id);
  }
  /*doAction(){
    this.dialogRef.close({event:this.action, data:this.local_data});
  }
 
  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }*/

  
}

  




