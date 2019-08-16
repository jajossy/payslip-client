import { Component, OnInit, ViewChild } from '@angular/core';
import { Supplier } from '../../interface/supplier';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { StockDialogComponent } from '../../shared/dialogs/stock-dialog/stock-dialog.component';

@Component({
  selector: 'app-insert-stock',
  templateUrl: './insert-stock.component.html',
  styleUrls: ['./insert-stock.component.css']
})
export class InsertStockComponent implements OnInit {
  // form varaibles 
  
  // table variables
  allSuppliers: Supplier[];
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
 

  constructor(private repoService: RepositoryService, private dialog: MatDialog) { }

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
    console.log(stock)
        let dialogRef = this.dialog.open(StockDialogComponent, {
          width: '400px',
          disableClose: true,
          data: {
            id : stock.id,
            Stockname : stock.CompanyStockTag.Stockname,
            CompanyName : stock.Supplier.CompanyName,
            SupplierProductName	: stock.SupplierProductName,
            SuppliedPrice : stock.SuppliedPrice,
            UnitPrice : stock.UnitPrice,
            QuantitySupplied : stock.QuantitySupplied,
            DateSupplied : stock.DateSupplied,
            PackUnit : stock.PackUnit,
            BatchNo : stock.BatchNo            
          }
        });
        dialogRef.afterClosed()
        .subscribe(result => {
          console.log("closed");
        });      
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
