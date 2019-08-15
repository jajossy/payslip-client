import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyStockTag } from '../../interface/companystocktag';
import { Supplier } from '../../interface/supplier';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator} from '@angular/material';

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
                             'DateSupplied', 'PackUnit', 'BatchNo', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Supplier>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService) { }

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

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
