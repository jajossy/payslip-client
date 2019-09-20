import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyStockTag } from '../../interface/companystocktag';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-stock-tag',
  templateUrl: './stock-tag.component.html',
  styleUrls: ['./stock-tag.component.css']
})
export class StockTagComponent implements OnInit {
  
  showProgress: boolean;
  selected : number;
  tagSaveButton : boolean = true;
  tagUpdateButton : boolean = false;
  resetButton: boolean  = true;

  // form varaibles
  public tagForm: FormGroup;
  stacktag: CompanyStockTag[];  
  CountryId : number;
  StateId : number;

  companyStockTagUpdate : CompanyStockTag;

  // table variables
  allStockTag: CompanyStockTag[];
  public array: any;  
  public displayedColumns = ['Stockname', 'CompanyPrice', 'Comment','update'];
  public dataSource = new MatTableDataSource<CompanyStockTag>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
               private progressService: ProgressService,
               private dialog: MatDialog,
               private authenticationService: AuthenticationService) { }

  ngOnInit() {    
    this.initializeForm(); 
    this.getCompanyTag();
    //this.showProgress = false;   
  } 
 

  initializeForm(){
    this.tagForm = new FormGroup({      
      Stockname: new FormControl('', [Validators.required]),
      CompanyPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),      
      Comment: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      CreatedUser: new FormControl('')   
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.tagForm.controls[controlName].hasError(errorName);
  }

  public addTag(tagFormValue){
    console.log(tagFormValue);
    if(this.tagForm.valid){
      this.tagSaveButton = false;
      this.repoService.POST(tagFormValue, `api/StockTag/Post`)
      .subscribe(res => {                 
        console.log(res)
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "Store Tag Successfully saved"}
        });
        dialogRef.afterClosed()
        .subscribe(result => {
          console.log("closed");
          this.initializeForm();
          this.tagSaveButton = true;
        });
        // reload Tag
        this.getCompanyTag();
      });
    }    
  }

  public reset() : void{
    this.tagSaveButton = true;    
  }

  

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getCompanyTag(): void {
    this.showProgress = true;
    this.repoService.GetAll("api/StockTag/Get")
      .subscribe(stocktag => {
        this.dataSource.data = stocktag
        this.dataSource = new MatTableDataSource<CompanyStockTag>(stocktag);
        this.dataSource.paginator = this.paginator;
        this.array = stocktag;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(stocktag)
        this.showProgress = false;
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  } 
  
  public redirectToUpdate(tag){
    
    this.tagUpdateButton = true;
    this.tagSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.companyStockTagUpdate = tag;    
    this.tagForm = new FormGroup({      
      Stockname: new FormControl(tag.Stockname, [Validators.required]),
      CompanyPrice: new FormControl(tag.CompanyPrice, [Validators.required, Validators.pattern("^[0-9]*$")]),      
      Comment: new FormControl(tag.Comment, [Validators.required, Validators.maxLength(100)])        
    });
    console.log(tag);
    console.log();
  }

  public updateTag(){
    this.companyStockTagUpdate.Stockname = this.tagForm.controls["Stockname"].value;    
    this.companyStockTagUpdate.CompanyPrice = this.tagForm.controls["CompanyPrice"].value;
    this.companyStockTagUpdate.Comment = this.tagForm.controls["Comment"].value;
    this.companyStockTagUpdate.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.companyStockTagUpdate); 
    this.tagUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.companyStockTagUpdate, `api/StockTag/Put`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "Tag Successfully Updated"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getCompanyTag();
          this.resetButton = true;
      });
  }

}
