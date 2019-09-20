import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrentStock } from '../../interface/currentstock';
import { Order } from '../../interface/order';
import { OrderItem } from '../../interface/orderitem';
import { Customer } from '../../interface/customer';

import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { InputDialogComponent } from '../../shared/dialogs/input-dialog/input-dialog.component';
import { ProgressService } from './../../progress.service';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  showProgress: boolean;

  // form varaibles
  public salesForm: FormGroup;

  order: Order[];
  orderItem: OrderItem[] = [];
  allCustomer: Customer[];
  orderItem2 : OrderItem2[] = [];
  //orderItem: Observable<OrderItem[]>;
  
  currentStock: CurrentStock[];
  dynamicCurrentStock: CurrentStock;
  CustomerId : string;
  TotalOrderAmount : number = 0;
  GenderId: string;  

  public array: any;
  public displayedColumns = ['Product',
                            'Quantity',
                            'SalesUnitPrice',
                            'SalesTotalAmount',
                            'action'                            
                              ]
  public dataSource =  this.orderItem;
  paymentType : payment[] = [
    { 'id' : 1, 'Description': 'Cash'},
    { 'id' : 2, 'Description': 'Cheque'},
  ]
  @ViewChild(MatTable, {static: false}) table: MatTable<any>;

  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              public progressService: ProgressService) { }

  ngOnInit() {  
    this.initializeForm();  
    this.getCurrent();
    this.getCustomer();  
  } 
  
  initializeForm(){
    this.salesForm = new FormGroup({      
      CustomerId: new FormControl('', [Validators.required]),
      TotalOrderAmount: new FormControl('', [Validators.required]),
      PaymentType: new FormControl('', [Validators.required]),
      /*Surname: new FormControl(''),
      Firstname: new FormControl(''),
      Othernames: new FormControl(''),
      GenderId: new FormControl(''),
      PhoneNo: new FormControl(''),
      CustomerEmail: new FormControl(''),
      Remark: new FormControl(''),    
      CountryId: new FormControl(''),
      StateId: new FormControl('')*/
    });   
        
  }

  
  getCurrent(){
    this.repoService.GetAll("api/Order_CurrentStock/Get")
    .subscribe(current => {
      this.currentStock = current;            
      console.log(current)
    });
  } 

  
  
  addToCart(stock){
    //this.dataSource = this.orderItem;
    //console.log(stock); 
    console.log(this.dataSource);
    var check = this.dataSource.filter(x => x.ProductId === stock.CompanyStockTag.id)
    console.log(check);
    if(check.length == 0)  
    {      
      this.dataSource.push({      
        id : 	'',
        ProductId : stock.CompanyStockTag.id,
        Quantity : 0,
        SalesUnitPrice : stock.CompanyUnitPrice,
        SalesTotalAmount : 0,
        OrderId : '',
        BatchNo : '',
        SuppliedUnitPrice: stock.SupplierUnitPrice,
        SuppliedTotalPrice : 0,
        CompanyStockTag : stock.CompanyStockTag
      });
      console.log(this.dataSource);
      this.table.renderRows();
      //this.getOrderItem();
    }
    else if(check.length > 0)
    {
      let dialogRef = this.dialog.open(ErrorDialogComponent, {
        width: '250px',
        disableClose: true,
        data: {message: "Product exist already in cart"}
      });
      dialogRef.afterClosed()
      .subscribe(result => {
        console.log("closed");
      });
    }
    
  }

  /*public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }*/

  openDialog(action, obj) {
    console.log(obj);
    obj.action = action;
    const dialogRef = this.dialog.open(InputDialogComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.ProductId == row_obj.ProductId){
        value.Quantity = row_obj.Quantity;
        var total : number = value.Quantity * value.SalesUnitPrice;
        var totalSuppliedCost : number = value.Quantity * value.SuppliedUnitPrice;
        value.SalesTotalAmount = total;
        value.SuppliedTotalPrice = totalSuppliedCost;
      }
      // add up all total prices together 
      console.log(this.dataSource);  
      var total = 0;
      var totalSuppliedCost = 0; 
      this.dataSource.forEach(y => {
        console.log(y.SalesTotalAmount);
        total += y.SalesTotalAmount;
        totalSuppliedCost += y.SuppliedTotalPrice;        
      })
      this.TotalOrderAmount = total;

      return true;
    });
  }


  deleteRowData(row_obj){
    var total : number = this.TotalOrderAmount;
    var orderTotal: number = row_obj.SalesTotalAmount;
    this.dataSource = this.dataSource.filter((value,key)=>{  
      //this.dataSource.splice(row_obj.ProductId);  
      this.TotalOrderAmount = total - orderTotal;
      return value.ProductId != row_obj.ProductId;
            
    });
    console.log(this.dataSource);
  }

  /*deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{ 
      // remove deleted from total 
       var totalAmount = this.TotalOrderAmount
       if(value.ProductId == row_obj.ProductId){
        totalAmount -=  value.SalesTotalAmount;
        this.TotalOrderAmount = totalAmount;        
      }      
      return value.ProductId != row_obj.ProductId;      
    });
    
  }*/

  public getCustomer(): void {    
    this.repoService.GetAll("api/Customer/Get")
      .subscribe(customer => {
        this.allCustomer = customer;
        console.log(customer)
      });
  }



  public addSalesOrder(saleFormValue){
    console.log(this.dataSource);
    this.dataSource.forEach((x, index )=> {
      this.orderItem2[index] = {
        id : saleFormValue.CustomerId, // i placed the customerId in client order id to seperate in api       
        ProductId : x.ProductId,
        Quantity : x.Quantity,
        SalesUnitPrice : x.SalesUnitPrice,
        SalesTotalAmount : x.SalesTotalAmount,
        OrderId	: x.OrderId, // i will store login id in this place as OrderId will change in api
        BatchNo : saleFormValue.PaymentType, // i hold payment type here temporary to change to batch or null at sales
        SuppliedUnitPrice : x.SuppliedUnitPrice,
        SuppliedTotalPrice : x.SuppliedTotalPrice
      }
    });
    
    console.log(this.orderItem2);
    
    this.repoService.POST(this.orderItem2, `api/Order/Post`)
    .subscribe(x => {
      console.log(x);
      /*if(this.salesForm.valid){
        this.repoService.POST(saleFormValue, `api/sale/Post`)
        .subscribe(res => {                 
          console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Order Successfully Completely"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed");*/
  
            // update stock accordingly
            /*this.dataSource.forEach(y => {
              console.log(y.SalesTotalAmount);
              this.repoService.GetByUnique(y.ProductId, `api/Order_CurrentStock/GetById`)
                  .subscribe(current => {
                    this.dynamicCurrentStock = current;            
                    var soldStock : number = y.Quantity;
                    var quantityInStock : number = this.dynamicCurrentStock.Quantity;
                    var balance : number = quantityInStock - soldStock;
                    // update current stock
                    this.dynamicCurrentStock.Quantity = balance;
                    
                    this.repoService.UPDATE(this.dynamicCurrentStock, `api/Order_CurrentStock/Put`)
                      .subscribe(update => {
                        console.log();
                        

                      })
                  });                    
            })*/
  
            let dialogRef = this.dialog.open(SuccessDialogComponent, {
              width: '250px',
              disableClose: true,
              data: {message: "Stock successfully ordered"}                                                
            });
            dialogRef.afterClosed()
            .subscribe(result => {
              console.log("closed");
              this.getCurrent();
              this.dataSource = [];
              this.CustomerId = "";
              this.TotalOrderAmount = 0;
              this.paymentType = [];
          });
  
          //});          
        //});
      //}   

    })
    
  }

  

}

export interface payment {
  id: number;
  Description: string;
}

// i will use the interface id below to get agent and customer id
export interface OrderItem2 {
    id : string;
    ProductId : string;
    Quantity : number;
    SalesUnitPrice : number;
    SalesTotalAmount : number;
    OrderId	: string;
    BatchNo? : string;
    SuppliedUnitPrice : number;
    SuppliedTotalPrice : number;    
}


