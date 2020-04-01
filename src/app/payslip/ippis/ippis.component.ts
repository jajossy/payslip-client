import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../interface/category';
import { SubCategory } from '../../interface/subcategory';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { AuthenticationService } from '../../authentication.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable} from '@angular/material';

import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-ippis',
  templateUrl: './ippis.component.html',
  styleUrls: ['./ippis.component.css']
})
export class IppisComponent implements OnInit {
 
  showProgress: boolean; 
  fileToUpload: File = null; 
  uploadSaveButton : boolean = true;

  CategoryData: Category;
  categoryId: number;

  SubCategoryData: SubCategory;
  subcategoryId: number;

  YearId: string;
  MonthId: string;

  Surname: string;
  Firstname: string;
  Fullname: string;
  staffEmail: string;
  IppisNo: string;

  userView : boolean = false;
  adminView : boolean = false;

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
   

  constructor(private repoService: RepositoryService,
    private dialog: MatDialog,               
    private progressService: ProgressService,
    private authenticationService: AuthenticationService ) { }

    ngOnInit() {
     var decode = jwt_decode(localStorage.getItem('suitrohUser'));
     this.Surname = decode.surname;
     this.Firstname = decode.firstname;
     this.Fullname = decode.fullname;
     this.staffEmail = decode.email;
     this.IppisNo = decode.ippis;
     //console.log(decode.ippis);
     if(decode.role == "admin"){
       this.adminView = true
     }
     else if(decode.role != "admin")
     {
      this.userView = true
     }
     this.initializeForm();
     this.getCategory();
   }
 
   public executeSelectedChange = (event) => {
     console.log(event);
   }

   initializeForm(){
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));
    if(decode.role == "admin"){
      this.uploadForm = new FormGroup({ 
        CategoryId: new FormControl('', [Validators.required]),
        SubCategoryId: new FormControl(''),                 
        payslipyear: new FormControl('', [Validators.required]),
        payslipmonth: new FormControl('', [Validators.required]),
        Ippis: new FormControl('', [Validators.required])                  
      });
    }
    else if(decode.role != "admin")
    {
      this.uploadForm = new FormGroup({ 
        CategoryId: new FormControl('', [Validators.required]),
        SubCategoryId: new FormControl(''),                 
        payslipyear: new FormControl('', [Validators.required]),
        payslipmonth: new FormControl('', [Validators.required]),
        Ippis: new FormControl(decode.ippis, [Validators.required])                  
      });
    }
    
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.uploadForm.controls[controlName].hasError(errorName);
  }

  addUpload(uploadFormValue){             
    /*this.repoService.postFile2(this.fileToUpload, this.categoryId, this.subcategoryId, this.YearId, this.MonthId, `api/Payslip/UploadPayslip`)
    .subscribe(data => {
      // do something, if upload success
      //this.getPayslip();
      }, error => {
        console.log(error);
      }); */

  
  this.uploadSaveButton = false;
      let id = uploadFormValue.CategoryId;
      let id2 = uploadFormValue.SubCategoryId;
      let id3 = uploadFormValue.payslipyear;
      let id4 = uploadFormValue.payslipmonth;
      let id5 = uploadFormValue.Ippis;
      
      this.repoService.GetAll(`api/SendPayslipToMail/SendPayslip/${id}/${id2}/${id3}/${id4}/${id5}`)
    .subscribe(res => {
      console.log(res); 
      let id = uploadFormValue.Ippis;
      let id2 = uploadFormValue.payslipmonth;
      let id3 = uploadFormValue.payslipyear;;
      //var apiPath = `http://localhost/PayslipWebApi/api/GetPdf/Get/${id}/${id2}`;
      //window.open(apiPath, "_blank"); 
            this.repoService.GetAll(`api/SendEmail/SendPayslip/${id}/${id2}/${id3}`)
            .subscribe(res => {
              console.log(res); 
              if(res == "Message Sent") {

               let dialogRef = this.dialog.open(SuccessDialogComponent, {
                 width: '250px',
                 disableClose: true,
                 data: {message: "Payslip Sent to your Email Successfully"}                                                
               });
               this.uploadSaveButton = true;
             }
             else{
               let dialogRef = this.dialog.open(ErrorDialogComponent, {
                 width: '250px',
                 disableClose: true,
                 data: {message: "Error in sending payslip"}
               });
               this.uploadSaveButton = true;
             }
                  
            },
            error => {
              this.uploadSaveButton = true;
              console.log(error);
            })  
      
    },
    error => {
      this.uploadSaveButton = true;
      console.log(error);
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

  

}

export interface Month {
  id: string;
  value: string;
}

export interface Year {
  id: string;
  value: string;
}
