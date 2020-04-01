import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Payslip } from '../../interface/Payslip';
import { Category } from '../../interface/category';
import { SubCategory } from '../../interface/subcategory';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable} from '@angular/material';

import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  showProgress: boolean; 
  fileToUpload: File = null; 
  uploadSaveButton : boolean = true;
  CategoryData: Category;
  categoryId: number;

  SubCategoryData: SubCategory;
  subcategoryId: number;

  YearId: string;
  MonthId: string;
  PayslipArray: Payslip;
  FrequencyId: number;
  // form varaibles
  public uploadForm: FormGroup;

  month : Month[] = [
    { 'id' : 'JANUARY', 'value': 'JANUARY'},
    { 'id' : 'FEBUARY', 'value': 'FEBUARY'} ,
    { 'id' : 'MARCH', 'value': 'MARCH'},
    { 'id' : 'APRIL', 'value': 'APRIL'},
    { 'id' : 'MAY', 'value': 'MAY'},
    { 'id' : 'JUNE', 'value': 'JUNE'},
    { 'id' : 'JULY', 'value': 'JULY'},
    { 'id' : 'AUGUST', 'value': 'AUGUST'},
    { 'id' : 'SEPTEMBER', 'value': 'SEPTEMBER'},
    { 'id' : 'OCTOBER', 'value': 'OCTOBER'},
    { 'id' : 'NOVEMBER', 'value': 'NOVEMBER'},
    { 'id' : 'DECEMBER', 'value': 'DECEMBER'}   
  ]

  year: Year[] = [
    { 'id' : '2018', 'value': '2018'},
    { 'id' : '2019', 'value': '2019'},
    { 'id' : '2020', 'value': '2020'},
    { 'id' : '2021', 'value': '2021'},
    { 'id' : '2022', 'value': '2022'},
    { 'id' : '2023', 'value': '2023'},
    { 'id' : '2024', 'value': '2024'},
    { 'id' : '2025', 'value': '2025'},
    { 'id' : '2026', 'value': '2026'},
  ]

  Frequency: Frequency[] = [
    { 'id' : 1, 'value': '1'},
    { 'id' : 2, 'value': '2'},
    
  ]

  public dataSource: MatTableDataSource<Payslip>;
  //displayedColumnsOne: string[] = ['position', 'name', 'weight', 'symbol'];
  public displayedColumns: string[] = ['Category', 'SubCategory', 'PayslipYear',
                            'PayslipMonth',
                            'delete'                            
                              ]
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('Sort', {static: true}) Sort: MatSort; 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
   

  constructor(private repoService: RepositoryService,
               private dialog: MatDialog,               
               private progressService: ProgressService,
               private authenticationService: AuthenticationService ) { }

               ngOnInit() {
                //var decode = jwt_decode(localStorage.getItem('suitrohUser'));
                //console.log(decode.ippis);
                this.initializeForm();
                this.getPayslip();
                this.getCategory();
              }

              public hasError = (controlName: string, errorName: string) => {
                return this.uploadForm.controls[controlName].hasError(errorName);
              }
            
              public executeSelectedChange = (event) => {
                console.log(event);
              }
            
              handleFileInput(files: FileList) {
                this.fileToUpload = files.item(0);
                console.log(this.fileToUpload);     
              }
            
              initializeForm(){
                this.uploadForm = new FormGroup({ 
                  CategoryId: new FormControl('', [Validators.required]),
                  SubCategoryId: new FormControl(''),                 
                  payslipyear: new FormControl('', [Validators.required]),
                  payslipmonth: new FormControl('', [Validators.required]),
                  payslipfile: new FormControl('', [Validators.required]),
                  Frequency: new FormControl('', [Validators.required])
                });
              }

              addUpload(){ 
                this.uploadSaveButton = false;            
                this.repoService.postFile2(this.fileToUpload, this.categoryId, this.subcategoryId, this.YearId, this.MonthId, this.FrequencyId, `api/Payslip/UploadPayslip`)
                .subscribe(data => {
                  // do something, if upload success
                  this.getPayslip();
                  this.uploadSaveButton = true;
                  }, error => {
                    this.uploadSaveButton = true;
                    console.log(error);
                  });               
              }

              public getPayslip(): void {    
                this.repoService.GetAll("api/Payslip/Get")
                  .subscribe(payslip => {
                    //this.dataSource.data = payslip
                    console.log(payslip)
                    this.dataSource = new MatTableDataSource<Payslip>(payslip);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.Sort;

                    //this.dataSourceOne.data = ELEMENT_DATA;
                    //this.dataSourceOne.paginator = this.tableOnePaginator;
                    //this.dataSourceOne.sort = this.tableOneSort; 
                    //this.array = payslip;
                    //this.totalSize = this.array.length;
                    //this.iterator();
                    
                  });
              }  

              public getCategory(): void {    
                this.repoService.GetAll("api/Category/Get")
                  .subscribe(category => {
                    this.CategoryData = category
                    console.log(category)                    
                    
                  });
              }

              loadSubCategory(id: string){
                if(id != null || id != undefined)
                {
                  this.repoService.GetByUnique(id,`api/SubCategory/GetCatById`)
                  .subscribe(subcategory => { 
                    this.SubCategoryData = subcategory
                      console.log(subcategory)                      
                  });
                }                
              }
              
              delete(id)
              {
                console.log(id);
                this.repoService.DELETEInt(id,  `api/Payslip/Delete`)
                .subscribe(data => {
                  // do something, if upload success
                  this.getPayslip();
                  }, error => {
                    console.log(error);
                  });
              }

}

export interface Month {
  id: string;
  value: string;
}

export interface Year {
  id: string;
  value: string;
}

export interface Frequency {
  id: number;
  value: string;
}


