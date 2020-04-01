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
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  showProgress: boolean; 
  fileToUpload: File = null; 
  categorySaveButton : boolean = true;
  categoryUpdateButton : boolean = false;
  subcategorySaveButton : boolean = true;
  subcategoryUpdateButton : boolean = false;

  CategoryData : Category;
  CategoryData2 : SubCategory;
  categoryId: string;
  
  // form varaibles
  public subcategoryForm: FormGroup;
  public categoryForm: FormGroup;

  public displayedColumns = ['Description', 'update']
  public displayedColumns2 = ['Description', 'update']
                            
  public dataSource = new MatTableDataSource<Category>();
  public dataSource2 = new MatTableDataSource<SubCategory>();

  
  
  @ViewChild('paginator', {static: false}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: false}) paginator2: MatPaginator;
  @ViewChild('sort', {static: false}) sort: MatSort;
  @ViewChild('sort2', {static: false}) sort2: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilter2(filterValue: string) {
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
   

  constructor(private repoService: RepositoryService,
               private dialog: MatDialog,               
               private progressService: ProgressService,
               private authenticationService: AuthenticationService ) { }

               ngOnInit() {
                //var decode = jwt_decode(localStorage.getItem('suitrohUser'));
                //console.log(decode.ippis);
                this.initializeForm();
                this.initializeForm2();
                this.getCategory();
              }

              loadSubCategory(id: string){
                if(id != null || id != undefined)
                {
                  this.repoService.GetByUnique(id,`api/SubCategory/GetCatById`)
                  .subscribe(category2 => { 
                    this.CategoryData2 = category2
                      console.log(category2)
                      //this.dataSource2.data = category2;
                      this.dataSource2 = new MatTableDataSource<SubCategory>(category2);
                      this.dataSource2.paginator = this.paginator2;
                      this.dataSource.sort = this.sort2;
                  });
                }                
              }

              public hasError2 = (controlName: string, errorName: string) => {
                return this.subcategoryForm.controls[controlName].hasError(errorName);
              }

              public hasError = (controlName: string, errorName: string) => {
                return this.categoryForm.controls[controlName].hasError(errorName);
              }
            
              public executeSelectedChange = (event) => {
                console.log(event);
              }
            
              handleFileInput(files: FileList) {
                this.fileToUpload = files.item(0);
                console.log(this.fileToUpload);     
              }
            
              initializeForm(){
                this.subcategoryForm = new FormGroup({      
                  CategoryId: new FormControl('', [Validators.required]),
                  Description: new FormControl('', [Validators.required]), 
                  SubCategoryId: new FormControl('')                 
                });
              }

              initializeForm2(){
                this.categoryForm = new FormGroup({ 
                  CategoryId: new FormControl(''),     
                  Description: new FormControl('', [Validators.required])                                 
                });
              }

              public addCategory(categoryFormValue){
                
                if(this.categoryForm.valid){                  
                  console.log(categoryFormValue);
                  
                  this.categorySaveButton = false;
                  this.repoService.POST(categoryFormValue, `api/Category/Post`)
                  .subscribe(res => {                 
                    console.log(res)
                    let dialogRef = this.dialog.open(SuccessDialogComponent, {
                      width: '250px',
                      disableClose: true,
                      data: {message: "Category Successfully saved"}
                    });
                    dialogRef.afterClosed()
                    .subscribe(result => {
                      console.log("closed");
                      this.initializeForm2();
                      this.categorySaveButton = true;
                    });
                    // reload Tag
                    this.getCategory();
                  });
                } 
               
              }

              public addSubCategory(subcategoryFormValue){
                
                if(this.subcategoryForm.valid){                  
                  console.log(subcategoryFormValue);
                  
                  this.categorySaveButton = false;
                  this.repoService.POST(subcategoryFormValue, `api/SubCategory/Post`)
                  .subscribe(res => {                 
                    console.log(res)
                    let dialogRef = this.dialog.open(SuccessDialogComponent, {
                      width: '250px',
                      disableClose: true,
                      data: {message: "Sub Category Successfully saved"}
                    });
                    dialogRef.afterClosed()
                    .subscribe(result => {
                      console.log("closed");
                      this.initializeForm();
                      this.categorySaveButton = true;
                    });
                    // reload Tag
                    this.loadSubCategory(this.categoryId);
                  });
                } 
               
              }

              public getCategory(): void {    
                this.repoService.GetAll("api/Category/Get")
                  .subscribe(category => {
                    this.CategoryData = category
                    console.log(category)
                    this.dataSource = new MatTableDataSource<Category>(category);
                    this.dataSource.paginator = this.paginator;                   
                    this.dataSource.sort = this.sort;
                    
                  });
              }               
              
              delete(id)
              {
                console.log(id);
                this.repoService.DELETEInt(id,  `api/Category/Delete`)
                .subscribe(data => {
                  // do something, if upload success
                  this.getCategory();
                  }, error => {
                    console.log(error);
                  });
              }

              public UpdateCategoryForm(tag){
                
                this.categoryUpdateButton = true;   // show update button             
                this.categorySaveButton = false;  // show save button   
                this.categoryForm = new FormGroup({ 
                  CategoryId : new FormControl(tag.CategoryId),
                  Description : new FormControl(tag.Description, [Validators.required])                      
                });
                console.log(tag);                
              }
            
              public updateCategory(CategoryFormValue){              
            
                console.log(CategoryFormValue); 
                this.categoryUpdateButton = false; // hide update button 
                this.categorySaveButton = true; // show save button
                
                this.repoService.UPDATE(CategoryFormValue, `api/Category/Put`)
                  .subscribe(res => {                 
                    console.log(res)
                      let dialogRef = this.dialog.open(SuccessDialogComponent, {
                        width: '250px',
                        disableClose: true,
                        data: {message: "Category Successfully Updated"}
                      });
                      dialogRef.afterClosed()
                      .subscribe(result => {
                        console.log("closed"); 
                        this.initializeForm2();                        
                      });
                      this.getCategory();                      
                  }
                  , error => {
                    console.log(error);
                    this.initializeForm2();
                  });
              }


              public UpdateSubCategoryForm(tag){
                
                this.subcategoryUpdateButton = true;   // show update button             
                this.subcategorySaveButton = false;  // show save button   
                this.subcategoryForm = new FormGroup({ 
                  CategoryId : new FormControl(tag.CategoryId),
                  Description : new FormControl(tag.Description, [Validators.required]),
                  SubCategoryId	: new FormControl(tag.SubCategoryId)                                      
                });
                console.log(tag);                
              }
            
              public updateSubCategory(SubCategoryFormValue){              
            
                console.log(SubCategoryFormValue); 
                this.subcategoryUpdateButton = false; // hide update button 
                this.subcategorySaveButton = true; // show save button
                //this.initializeForm();

                this.repoService.UPDATE(SubCategoryFormValue, `api/SubCategory/Put`)
                  .subscribe(res => {                 
                    console.log(res)
                      let dialogRef = this.dialog.open(SuccessDialogComponent, {
                        width: '250px',
                        disableClose: true,
                        data: {message: "SubCategory Successfully Updated"}
                      });
                      dialogRef.afterClosed()
                      .subscribe(result => {
                        console.log("closed"); 
                        this.initializeForm();                        
                      });
                      this.loadSubCategory(this.categoryId);                      
                  }
                  , error => {
                    console.log(error);
                    this.initializeForm();
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


