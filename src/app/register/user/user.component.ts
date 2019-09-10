import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { FieldAgent } from '../../interface/fieldagent';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { ProgressService } from './../../progress.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showProgress: boolean;
  // form varaibles
  public agentForm: FormGroup;
  public userForm: FormGroup;

  RoleId: string

  role : Role[] = [ 
    {id : 1, Description : 'admin' },
    {id : 2, Description : 'user' }
   ]
    

  // table variables
  allagents: FieldAgent[];
  public array: any;
  public displayedColumns = ['Surname', 'Firstname', 'Othernames', 'AllocatedZone', 'Country',
                              'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<FieldAgent>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              private progressService: ProgressService) { }

  ngOnInit() {    
    this.initializeUserForm();   
    //this.getAgent();
  }


  initializeUserForm(){
    this.userForm = new FormGroup({      
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      RoleId: new FormControl('')            
    });
  }  

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  public addUser(agentFormValue){    
    if(this.userForm.valid){
      this.repoService.POST(agentFormValue, `api/User/Post`)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "User Added Successfully"}
        });                 
        console.log(res)
        //this.getAgent();
      }, 
      (error) =>{
        console.log(error);
        let dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "Error in Saving User"}
        });
      });
    }    
  }
  
  public addAgent(agentFormValue){
    console.log(agentFormValue);
    if(this.agentForm.valid){
      this.repoService.POST(agentFormValue, `api/Agent/Post`)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "Agent Added Successfully"}
        });                 
        console.log(res)
        this.getAgent();
      }, 
      (error) =>{
        console.log(error);
        let dialogRef = this.dialog.open(ErrorDialogComponent, {
          width: '250px',
          disableClose: true,
          data: {message: "Error in Saving Agent"}
        });
      });
    }    
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getAgent(): void {
    
    this.repoService.GetAll(`api/Agent/Get`)
      .subscribe(supplier => {
        this.dataSource.data = supplier
        this.dataSource = new MatTableDataSource<FieldAgent>(supplier);
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

export interface Role {
  id : number;
  Description : string;
}
