import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyStockTag } from '../../interface/companystocktag';
import { Supplier } from '../../interface/supplier';
import { StockIn } from '../../interface/stockin';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-stock-in',
  templateUrl: './stock-in.component.html',
  styleUrls: ['./stock-in.component.css']
})
export class StockInComponent implements OnInit {
  showProgress: boolean;
  selected : number;
  stockSaveButton : boolean = true;
  stockUpdateButton : boolean = false;
  resetButton: boolean  = true;

  // form varaibles
  public stockinForm: FormGroup; 
  companyStockTag: CompanyStockTag; 
  supplier: Supplier;
  stockIn: StockIn;
  stockUpdate: StockIn;
  CompanyProductNameId : string;
  SupplierId : string;

  // table variables
  allSuppliers: Supplier[];
  public array: any;
  public displayedColumns = ['StockName', 'SupplierName', 'SupliedPrice', 'UnitPrice', 'QuantitySupplied',
                             'DateSupplied', 'PackUnit', 'BatchNo', 'update'];
  public dataSource = new MatTableDataSource<StockIn>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
              public progressService: ProgressService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService) { }

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
      SupplierProductName: new FormControl(''),
      SuppliedPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      UnitPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      QuantitySupplied: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      DateSupplied: new FormControl('', [Validators.required]),
      PackUnit: new FormControl('', [Validators.required]),
      BatchNo: new FormControl(''),
      CreatedUser: new FormControl('')     
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
      this.stockSaveButton = false;
      stockinFormValue.CreatedUser = this.authenticationService.currentUserValue.UserId;
      this.repoService.POST(stockinFormValue, `api/Stockin/Post`)
      .subscribe(res => {                 
        console.log(res)
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "New Stock Added Successfully"}
        });
        dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            this.stockSaveButton = true;
          });          
        this.getStockIn();
      });
    }    
  }

  public reset() : void{
    this.stockSaveButton = true;    
  }

  public redirectToUpdate(stock){
    this.getSupplier();
    this.getStockTag();
    this.stockUpdateButton = true;
    this.stockSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.stockUpdate = stock;
    this.stockinForm = new FormGroup({ 
      CompanyProductNameId: new FormControl(stock.CompanyProductNameId, [Validators.required]),           
      SupplierId: new FormControl(stock.SupplierId, [Validators.required]),
      SupplierProductName: new FormControl(stock.SupplierProductName),
      SuppliedPrice: new FormControl(stock.SuppliedPrice, [Validators.required, Validators.pattern("^[0-9]*$")]),
      UnitPrice: new FormControl(stock.UnitPrice, [Validators.required, Validators.pattern("^[0-9]*$")]),     
      QuantitySupplied: new FormControl(stock.QuantitySupplied, [Validators.required, Validators.pattern("^[0-9]*$")]),
      DateSupplied: new FormControl(stock.DateSupplied, [Validators.required]),
      PackUnit: new FormControl(stock.PackUnit, [Validators.required]),
      BatchNo: new FormControl(stock.BatchNo)
    });
    console.log(stock);
    
  }

  public updateStock(){
    this.stockUpdate.CompanyProductNameId = this.stockinForm.controls["CompanyProductNameId"].value;
    this.stockUpdate.SupplierId = this.stockinForm.controls["SupplierId"].value;    
    this.stockUpdate.SupplierProductName = this.stockinForm.controls["SupplierProductName"].value;
    this.stockUpdate.SuppliedPrice = this.stockinForm.controls["SuppliedPrice"].value;
    this.stockUpdate.UnitPrice = this.stockinForm.controls["UnitPrice"].value;
    this.stockUpdate.QuantitySupplied = this.stockinForm.controls["QuantitySupplied"].value;
    this.stockUpdate.DateSupplied = this.stockinForm.controls["DateSupplied"].value;
    this.stockUpdate.PackUnit = this.stockinForm.controls["PackUnit"].value;
    this.stockUpdate.BatchNo = this.stockinForm.controls["BatchNo"].value; 
    this.stockUpdate.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.stockUpdate); 
    this.stockUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.stockUpdate, `api/Stockin/Put`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Stock Successfully Updated"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getStockIn();
          this.resetButton = true;
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getStockIn(): void {
    
    this.repoService.GetAll("api/Stockin/Get")
      .subscribe(stock => {
        this.dataSource.data = stock
        this.dataSource = new MatTableDataSource<StockIn>(stock);
        this.dataSource.paginator = this.paginator;
        this.array = stock;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(stock)
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
