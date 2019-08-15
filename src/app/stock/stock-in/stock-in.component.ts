import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyStockTag } from '../../interface/companystocktag';
import { Supplier } from '../../interface/supplier';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})
export class StockInComponent implements OnInit {
  // form varaibles
  public stockinForm: FormGroup; 
  companyStockTag: CompanyStockTag; 
  supplier: Supplier;
  CompanyProductNameId : string;
  SupplierId : string;

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
    this.initializeForm();
    this.getStockTag();
    this.getSupplier();
    this.getStockIn();
  }

  initializeForm(){
    this.stockinForm = new FormGroup({     
      CompanyProductNameId: new FormControl('', [Validators.required]),
      SupplierId: new FormControl('', [Validators.required]),
      SupplierProductName: new FormControl('', [Validators.required]),
      SuppliedPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      UnitPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      QuantitySupplied: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      DateSupplied: new FormControl('', [Validators.required]),
      PackUnit: new FormControl('', [Validators.required]),
      BatchNo: new FormControl('')      
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.stockinForm.controls[controlName].hasError(errorName);
  }

  getStockTag() : void {
    this.repoService.GetAll(`api/StockTag/Get`)
    .subscribe(stockTag => {
      this.companyStockTag = stockTag;            
      console.log(stockTag);
    });
  }

  getSupplier() : void {
    this.repoService.GetAll(`api/Supplier/Get`)
    .subscribe(supplier => {
      this.supplier = supplier;            
      console.log(supplier);
    });
  }  

  public newStockIn(stockinFormValue){
    console.log(stockinFormValue);
    if(this.stockinForm.valid){
      this.repoService.POST(stockinFormValue, `api/Stockin/Post`)
      .subscribe(res => {                 
        console.log(res)
      });
    }    
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
