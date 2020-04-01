import { Component, OnInit, ViewChild, Inject, ElementRef, Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Staff } from '../../interface/staff';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort, throwMatDialogContentAlreadyAttachedError} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';

import { Observable, from, Observer } from 'rxjs';
//import { StudentInfo } from 'src/app/interface/studentinfo';
import { User } from 'src/app/interface/user';



@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})

export class StaffComponent implements OnInit {
  showProgress: boolean;
  selected : number;
  staffSaveButton : boolean = true;
  staffUpdateButton : boolean = false;
  resetButton: boolean  = true;
  Active: boolean;

  staffObject: Staff[];
  ExamTag: string;
  CombinationId: string;

  fileToUpload: File = null;

  // form varaibles
  public regForm: FormGroup;
  staff: Staff[]; 

  staffUpdate : Staff;
  IppisNo: string;
  Name: string;
  // table variables
  allUser: User[];
   

  public dataSource: MatTableDataSource<Staff>;  
  public displayedColumns = ['Ippis', 
                            'Surname',
                            'Firstname',                                                       
                            'Email',                            
                            'update',
                            'delete'];
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('Sort', {static: true}) Sort: MatSort; 

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(private repoService: RepositoryService,
               private progressService: ProgressService,
               private dialog: MatDialog,
               private authenticationService: AuthenticationService, private formBuilder:FormBuilder)
                { 
                  
                }

               ngOnInit() {    
                this.initializeForm(); 
                this.getStaff();                   
              } 

              handleFileInput(files: FileList) {
                this.fileToUpload = files.item(0);
                console.log(this.fileToUpload);     
              }
            
                         
              initializeForm(){                
                this.regForm = new FormGroup({      
                  Ippis : new FormControl('', [Validators.required]),
                  Surname : new FormControl('', [Validators.required]),
                  Firstname : new FormControl('', [Validators.required]),
                  Othername : new FormControl(''),
                  Fullname : new FormControl(''),
                  Department : new FormControl(''),
                  Email : new FormControl('', [Validators.required]),
                  Active : new FormControl('')                  
                });
                
              }

              addUpload(){             
                this.repoService.postFile(this.fileToUpload, `api/Staff/UploadStaffExcel`)
                .subscribe(data => {
                  // do something, if upload success
                  this.getStaff();
                  }, error => {
                    console.log(error);
                  });               
              }
            
              public hasError = (controlName: string, errorName: string) => {
                return this.regForm.controls[controlName].hasError(errorName);
              }
            
              public addReg(regFormValue){
                
                if(this.regForm.valid){                  
                  console.log(regFormValue);
                  regFormValue.CombinationId = this.CombinationId;
                  this.staffSaveButton = false;
                  this.repoService.POST(regFormValue, `api/Staff/Post`)
                  .subscribe(res => {                 
                    console.log(res)
                    let dialogRef = this.dialog.open(SuccessDialogComponent, {
                      width: '250px',
                      disableClose: true,
                      data: {message: "Staff Successfully saved"}
                    });
                    dialogRef.afterClosed()
                    .subscribe(result => {
                      console.log("closed");
                      this.initializeForm();
                      this.staffSaveButton = true;
                    });
                    // reload Tag
                    this.getStaff();
                  });
                } 
               
              }
            
              public reset() : void{
                this.staffSaveButton = true;    
              }
            
                            
              public getStaff(): void {                
                this.showProgress = true;                
                this.repoService.GetAll("api/Staff/Get")
                  .subscribe(res => {
                    console.log(res)
                    this.staffObject = res;
                    //this.dataSource.data = res
                    this.dataSource = new MatTableDataSource<Staff>(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.Sort;

                    this.showProgress = false;
                  });                
              }

              public searchName(): void {
    
                this.showProgress = true;
                //this.repoService.GetAll("api/Result/GetResult")
                //this.repoService.GetByUnique(decode.token, "api/Result/GetResult")
                this.repoService.GetByUnique(this.Name, "api/Staff/GetByName")
                  .subscribe(res => {
                    console.log(res)
                    this.staffObject = res;        
                    this.dataSource = new MatTableDataSource<Staff>(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.Sort;

                    this.showProgress = false;                    
                  });
              }
            
              public searchIppis(): void {
                
                this.showProgress = true;
                //this.repoService.GetAll("api/Result/GetResult")
                //this.repoService.GetByUnique(decode.token, "api/Result/GetResult")
                console.log(this.IppisNo);
                this.repoService.GetByUnique(this.IppisNo, "api/Staff/GetByIppis")
                  .subscribe(res => {
                    console.log(res)
                    this.staffObject = res;        
                    this.dataSource = new MatTableDataSource<Staff>(res);
                    this.dataSource.paginator = this.paginator; 
                    this.dataSource.sort = this.Sort;

                    this.showProgress = false;                   
                  });
              }
            
                            
              public redirectToUpdate(tag){
                
                this.staffUpdateButton = true;
                this.staffSaveButton = false;
                this.resetButton = false;
                this.selected = 1;
                this.staffUpdate = tag;    
                this.regForm = new FormGroup({ 
                  Ippis : new FormControl(tag.Ippis, [Validators.required]),                
                  Surname : new FormControl(tag.Surname, [Validators.required]), 
                  Firstname : new FormControl(tag.Firstname, [Validators.required]),
                  Othername : new FormControl(tag.Othername),
                  Fullname : new FormControl(tag.Fullname),
                  Department : new FormControl(tag.Department, [Validators.required]),
                  Email : new FormControl(tag.Email, [Validators.required]),
                  Active : new FormControl(tag.Active)          
                });
                console.log(tag);                
              }
            
              public updateTag(){
                this.staffUpdate.Ippis = this.regForm.controls["Ippis"].value;
                this.staffUpdate.Surname = this.regForm.controls["Surname"].value;
                this.staffUpdate.Firstname = this.regForm.controls["Firstname"].value;
                this.staffUpdate.Othername = this.regForm.controls["Othername"].value;
                this.staffUpdate.Fullname = this.regForm.controls["Fullname"].value;
                this.staffUpdate.Department = this.regForm.controls["Department"].value;
                this.staffUpdate.Email = this.regForm.controls["Email"].value;
                this.staffUpdate.Active = this.regForm.controls["Active"].value;
            
                console.log(this.staffUpdate); 
                this.staffUpdateButton = false // disable update button  
                
                this.repoService.UPDATE(this.staffUpdate, `api/Staff/Put`)
                  .subscribe(res => {                 
                    console.log(res)
                      let dialogRef = this.dialog.open(SuccessDialogComponent, {
                        width: '250px',
                        disableClose: true,
                        data: {message: "Staff Successfully Updated"}
                      });
                      dialogRef.afterClosed()
                      .subscribe(result => {
                        console.log("closed"); 
                        this.initializeForm();           
                        //this.supplierSaveButton = true;
                        this.selected = 0;
                      });
                      this.getStaff();
                      this.resetButton = true;
                  });
              }

              delete(tag){
                //alert(tag.CandidateId);
                this.repoService.DELETE(tag.CandidateId, `api/Staff/Delete`)
                  .subscribe(res => {                 
                    console.log(res)
                      let dialogRef = this.dialog.open(SuccessDialogComponent, {
                        width: '250px',
                        disableClose: true,
                        data: {message: "Staff Successfully Deleted"}
                      });
                      dialogRef.afterClosed()
                      .subscribe(result => {
                        console.log("closed"); 
                        //this.initializeForm();           
                        //this.supplierSaveButton = true;
                        //this.selected = 1;
                      });
                      this.getStaff();
                      //this.resetButton = true;
                  });
              }            
   

}
