import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentStock } from '../../interface/currentstock';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-current-stock',
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.css']
})
export class CurrentStockComponent implements OnInit {
  showProgress: boolean;
  // form varaibles
  public currentForm: FormGroup;
  currentUpdateButton : boolean = false;
  resetButton: boolean  = true;
  selected : number;
  StockName: string = "";

  currentInventory: CurrentStock;
  
  // table variables
  currentStock: CurrentStock[];
  public array: any;
  public displayedColumns = ['StockName',
                            'Quantity',
                            'ReorderLevel',
                            'PackUnit',
                            'CompanyUnitPrice',
                            'SupplierUnitPrice',
                            'Status',
                            'view'
                              ]
                            
  public dataSource = new MatTableDataSource<CurrentStock>();

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
    this.initializeForm();
  }

  initializeForm(){
    this.currentForm = new FormGroup({            
      ReorderLevel: new FormControl('', [Validators.required]),
      PackUnit: new FormControl('', [Validators.required]),
      CompanyUnitPrice: new FormControl('', [Validators.required]),    
      CreatedUser: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.currentForm.controls[controlName].hasError(errorName);
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getStockIn(): void {
    
    this.repoService.GetAll("api/CurrentStock/Get")
      .subscribe(current => {
        this.dataSource.data = current
        this.dataSource = new MatTableDataSource<CurrentStock>(current);
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

  public updateStock(stock){
    this.selected = 1;    
    this.currentUpdateButton = true;
    this.currentInventory = stock;
    this.StockName = this.currentInventory.CompanyStockTag.Stockname; // set ti identify stock at update

    this.currentForm = new FormGroup({            
      ReorderLevel: new FormControl(stock.ReorderLevel, [Validators.required]),
      PackUnit: new FormControl(stock.PackUnit, [Validators.required]),
      CompanyUnitPrice: new FormControl(stock.CompanyUnitPrice, [Validators.required])  
    });
    console.log(stock);    
  }

  public updateCurrent(){    
    this.currentInventory.ReorderLevel = this.currentForm.controls["ReorderLevel"].value;    
    this.currentInventory.PackUnit = this.currentForm.controls["PackUnit"].value;
    this.currentInventory.CompanyUnitPrice = this.currentForm.controls["CompanyUnitPrice"].value;     
    this.currentInventory.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.currentInventory); 
    this.currentUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.currentInventory, `api/CurrentStock/Put`)
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
            this.currentUpdateButton = true;
            this.selected = 0;
          });
          this.getStockIn();
          //this.resetButton = true;
      });
  }

}
