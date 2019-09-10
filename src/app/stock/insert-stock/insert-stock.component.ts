import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Supplier } from '../../interface/supplier';
import { CurrentStock } from '../../interface/currentstock';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { StockDialogComponent } from '../../shared/dialogs/stock-dialog/stock-dialog.component';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';


@Component({
  selector: 'app-insert-stock',
  templateUrl: './insert-stock.component.html',
  styleUrls: ['./insert-stock.component.css']
})
export class InsertStockComponent implements OnInit {
  showProgress: boolean;
  // form varaibles 
  public currentStockForm: FormGroup;
  stockInStatus: boolean = false;

  // table variables
  allSuppliers: Supplier[];
  currentStock : CurrentStock;
  
  incomingStockQuantity : number;
  existingStockQuantity : number;
  stockAddUp : number;

  public array: any;
  public displayedColumns = ['StockName', 'SupplierName', 'SupliedPrice', 'UnitPrice', 'QuantitySupplied',
                             'DateSupplied', 'PackUnit', 'BatchNo', 'addInventory'];
  public dataSource = new MatTableDataSource<Supplier>();

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
               private formBuilder: FormBuilder,
               public progressService: ProgressService ) { }

  ngOnInit() {   
    this.getStockIn();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getStockIn(): void {
    
    this.repoService.GetAll("api/Stockin/Get")
      .subscribe(supplier => {
        this.dataSource.data = supplier
        this.dataSource = new MatTableDataSource<Supplier>(supplier);
        this.dataSource.paginator = this.paginator;
        this.array = supplier;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(supplier)
      });
  }

  public prepToAddStock(stock): void {
    console.log(stock);
        let dialogRef = this.dialog.open(StockDialogComponent, {
          width: '500px',
          disableClose: true,
          data: {

            id : stock.id,
            CompanyProductNameId : stock.CompanyProductNameId,
            SupplierId : stock. SupplierId,
            SupplierProductName	: stock.SupplierProductName,
            SuppliedPrice : stock.SuppliedPrice,
            UnitPrice : stock.UnitPrice,
            QuantitySupplied : stock.QuantitySupplied,
            DateSupplied : stock.DateSupplied,
            PackUnit : stock.PackUnit,
            BatchNo : stock.BatchNo,  
            CreatedUser : stock.CreatedUser,
            CreatedDate : stock.CreatedDate,
            Status : stock.Status,
            CompanyStockTag: stock.CompanyStockTag,
            Supplier: stock.Supplier       
          }
        });
        
        dialogRef.afterClosed()
        .subscribe(result => {
          //this.AddFreshCurrentStock(result)          
          console.log(result);
          if(result == true){

          }
          else{
            this.AddFreshCurrentStock(result);
          }
        });      
  }

    AddFreshCurrentStock(stockInData){ 
        if(stockInData.stockExist == false)
        {
          //console.log(stockInData);
          this.currentStockForm = this.formBuilder.group({      
            StockNameId : stockInData.CompanyProductNameId,
            Quantity : stockInData.QuantitySupplied,
            ReorderLevel : stockInData.reorderLevel,
            PackUnit : stockInData.PackUnit,
            CompanyUnitPrice : stockInData.CompanyUnitPrice,
            SupplierUnitPrice : stockInData.UnitPrice,          
            Comment : stockInData.Comment          
          }); 
          
            this.repoService.POST(this.currentStockForm.value, `api/CurrentStock/Post`)
            .subscribe(res => {                 
              console.log(res)
              // mark incoming stock status
              stockInData.Status = false;
              this.repoService.UPDATE(stockInData, `api/StockIn/Put`)
              .subscribe(stockin => {
                console.log(stockin);
                let dialogRef = this.dialog.open(SuccessDialogComponent, {
                  width: '250px',
                  disableClose: true,
                  data: {message: "Stock Added to inventory Successfully"}
                });
                this.getStockIn();
              });
            });
        }
        else if(stockInData.stockExist == true)
        {
          alert('stock exist');
          this.checkCurrentStock(stockInData.CompanyProductNameId, stockInData);          
        }
           
    }

    checkCurrentStock(id: string, dataset: any){
      this.repoService.GetByUnique(id, `api/CurrentStock/GetById`)
      .subscribe(current => {
        this.currentStock = current;            
        console.log(this.currentStock);  
        this.incomingStockQuantity = dataset.QuantitySupplied;
          this.existingStockQuantity = this.currentStock.Quantity;
          this.stockAddUp = this.incomingStockQuantity + this.existingStockQuantity;
                
            // update old stock with new input
            this.currentStock.Quantity = this.stockAddUp;
            this.currentStock.CompanyUnitPrice = dataset.SetCompanyPrice;

            this.currentStock.ReorderLevel = dataset.ReorderLevel
            this.currentStock.PackUnit = dataset.PackUnit
            this.currentStock.SupplierUnitPrice = dataset.SupplierUnitPrice
            this.currentStock.Status = dataset.Status
            this.currentStock.Comment = dataset.Comment
          
            this.repoService.UPDATE(this.currentStock, `api/CurrentStock/Put`)
            .subscribe(res => {                 
              console.log(res)
              
                // mark incoming stock status
                dataset.Status = false;
                this.repoService.UPDATE(dataset, `api/StockIn/Put`)
                .subscribe(stockin => {
                  console.log(stockin);
                  let dialogRef = this.dialog.open(SuccessDialogComponent, {
                    width: '250px',
                    disableClose: true,
                    data: {message: "Stock Added to inventory Successfully"}
                  });
                  this.getStockIn();
                });

              
            });
      });
    }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
