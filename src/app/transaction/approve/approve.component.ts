import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../interface/order';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { ApproveDialogComponent } from '../../shared/dialogs/approve-dialog/approve-dialog.component';
import { InputApproveDialogComponent } from '../../shared/dialogs/inputApprove-dialog/inputApprove-dialog.component';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.css']
})
export class ApproveComponent implements OnInit {
  showProgress: boolean;
  order: Order;
  
  // table variables
  orderITem: Order[];
  public array: any;
  public displayedColumns = [ 'OrderTag',
                              'CustomerId',
                              'TotalOrderAmount',
                              'DateCreated',
                              'PaymentType',                              
                              'AgentId',
                              'view',
                              'action',
                              'print'
                              ]

                         
  public dataSource = new MatTableDataSource<Order>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
               private dialog: MatDialog,               
               private progressService: ProgressService,
               private authenticationService: AuthenticationService ) { }

  ngOnInit() {   
    this.getOrder();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getOrder(): void {
    
    this.repoService.GetAll("api/Order/Get")
      .subscribe(current => {
        this.dataSource.data = current
        this.dataSource = new MatTableDataSource<Order>(current);
        this.dataSource.paginator = this.paginator;
        this.array = current;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(current)
      });
  }    

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

  public viewItems(orderElements){
    console.log(orderElements);
    
        let dialogRef = this.dialog.open(ApproveDialogComponent, {
          width: '900px',
          disableClose: true,
          data: {id: orderElements.id}
        });
        
        dialogRef.afterClosed().subscribe(result => {
          if(result == true){
            console.log('cancelled');
          }else{
            console.log(result);
            var id = result;
            var id2 = this.authenticationService.currentUserValue.UserId;
            this.repoService.GetAll(`api/Order/GetOrderApproval/${id}/${id2}`)
            .subscribe(current => {
              
              console.log(current)
              this.getOrder();
            });
            
          }
        });
  }

  openDialog(action, obj) {
    console.log(obj);
    obj.action = action;
    const dialogRef = this.dialog.open(InputApproveDialogComponent, {
      width: '300px',
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
    console.log(row_obj.id);
    console.log(row_obj.PaymentType);
    /*this.dataSource = this.dataSource.filter((value, key)=>{
      if(value.id == row_obj.id){
        value.PaymentType = row_obj.PaymentType;        
      }      
    });*/
    this.repoService.UPDATE(row_obj, `api/Order/Put`)
    .subscribe(x => {
      console.log(x);     
  
            let dialogRef = this.dialog.open(SuccessDialogComponent, {
              width: '250px',
              disableClose: true,
              data: {message: "Payment Type successfully Updated"}                                                
            });
            dialogRef.afterClosed()
            .subscribe(result => {
              console.log("closed");
              this.getOrder();              
          });
  
    });
  }


  deleteRowData(row_obj){
    /*var total : number = this.TotalOrderAmount;
    var orderTotal: number = row_obj.SalesTotalAmount;
    this.dataSource = this.dataSource.filter((value,key)=>{  
      //this.dataSource.splice(row_obj.ProductId);  
      this.TotalOrderAmount = total - orderTotal;
      return value.ProductId != row_obj.ProductId;
            
    });*/
    console.log(row_obj.id);
    var id = row_obj.id;
    this.repoService.DELETE(`api/Order/Delete/${id}`)
    .subscribe(x => {
      console.log(x);     
  
            let dialogRef = this.dialog.open(SuccessDialogComponent, {
              width: '250px',
              disableClose: true,
              data: {message: "Order Cancelled and Deleted Completely"}                                                
            });
            dialogRef.afterClosed()
            .subscribe(result => {
              console.log("closed");
              this.getOrder();              
          });  
    });
  } 

  public viewReport(id){
    //goToLink(url: string);
    //var apiPath = `http://localhost:50029/api/GeneratePdf/GetReport/${id}`;
    var apiPath = `http://service.suitroh.com/api/GeneratePdf/GetReport/${id}`
    window.open(apiPath, "_blank");
    }  

}


