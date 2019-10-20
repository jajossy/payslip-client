import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../interface/order';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { CheckoutDialogComponent } from '../../shared/dialogs/checkout-dialog/checkout-dialog.component';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
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
    this.getStockIn();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getStockIn(): void {
    
    this.repoService.GetAll("api/Order/GetApproved")
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
    
        let dialogRef = this.dialog.open(CheckoutDialogComponent, {
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
            this.repoService.GetAll(`api/Order/GetOrderCheckout/${id}/${id2}`)
            .subscribe(current => {
              
              console.log(current)
              this.getStockIn();
            });
            
          }
        });
  }

  public viewReport(id){
    //goToLink(url: string);
    //var apiPath = `http://localhost:50029/api/GeneratePdf/GetReport/${id}`;
    var apiPath = `http://service.suitroh.com/api/GeneratePdf/GetReport/${id}`
    window.open(apiPath, "_blank");
    }

  

}
