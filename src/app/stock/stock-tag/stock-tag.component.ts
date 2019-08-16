import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CompanyStockTag } from '../../interface/companystocktag';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';


@Component({
  selector: 'app-stock-tag',
  templateUrl: './stock-tag.component.html',
  styleUrls: ['./stock-tag.component.css']
})
export class StockTagComponent implements OnInit {
  
  showProgress: boolean;


  // form varaibles
  public tagForm: FormGroup;
  stacktag: CompanyStockTag[];  
  CountryId : number;
  StateId : number;

  // table variables
  allStockTag: CompanyStockTag[];
  public array: any;  
  public displayedColumns = ['Stockname', 'CompanyPrice', 'Comment','details', 'update', 'delete'];
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
               private dialog: MatDialog) { }

  ngOnInit() {    
    this.initializeForm(); 
    this.getCompanyTag();
    //this.showProgress = false;   
  } 
 

  initializeForm(){
    this.tagForm = new FormGroup({      
      Stockname: new FormControl('', [Validators.required]),
      CompanyPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),      
      Comment: new FormControl('', [Validators.required, Validators.maxLength(100)])     
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.tagForm.controls[controlName].hasError(errorName);
  }

  public addTag(tagFormValue){
    console.log(tagFormValue);
    if(this.tagForm.valid){
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
        });
      });
    }    
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

}
