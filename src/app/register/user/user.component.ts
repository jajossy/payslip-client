import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interface/user';
import { FieldAgent } from '../../interface/fieldagent';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { ProgressService } from './../../progress.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  showProgress: boolean;
  selected : number;
  userSaveButton : boolean = true;
  userUpdateButton : boolean = false;
  resetButton: boolean  = true;

  // form varaibles
  public agentForm: FormGroup;
  public userForm: FormGroup;

  RoleId: string
  //UserId : string;
  User: FieldAgent;

  role : Role[] = [ 
    {id : "admin", Description : 'Admin' },
    {id : "account", Description : 'Account' },
    {id : "operation", Description : 'Operation' },
    {id : "agent", Description : 'Agent' },
    {id : "manager", Description : 'Manager' }
   ]

   userUpdate : User; 
   Agent: FieldAgent;
  // table variables
  allagents: FieldAgent[];
  public array: any;
  /*public displayedColumns = ['Surname', 'Firstname', 'Othernames', 'AllocatedZone', 'Country',
                              'details', 'update', 'delete'];*/

  public displayedColumns = [
                            'username',                            
                            'firstName',
                            'lastName',
                            'role', 'update'];

  public dataSource = new MatTableDataSource<User>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService) { 
                const currentUser = this.authenticationService.currentUserValue;
                if(currentUser.role != "superadmin"){
                  this.userSaveButton = false;
                  this.resetButton = false;
                }
              }

  ngOnInit() {    
    this.initializeUserForm();   
    this.getAgent();
    this.getUser();
  }


  initializeUserForm(){
    this.userForm = new FormGroup({ 
      UserId : new FormControl('', [Validators.required]),    
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

  public reset() : void{
    this.userSaveButton = true;    
  }

  public getUser(): void {
    const currentUser = this.authenticationService.currentUserValue;
    var id = currentUser.UserId
      if(currentUser.role != "superadmin"){
        this.repoService.GetByUnique(id, `api/User/GetById`)
        .subscribe(user => {
          this.dataSource.data = user
          this.dataSource = new MatTableDataSource<User>(user);          
          this.dataSource.paginator = this.paginator;
          this.array = user;
          this.totalSize = this.array.length;
          this.iterator();
          console.log(user)
        });
      }
      else
      {
        this.repoService.GetAll(`api/User/Get`)
        .subscribe(user => {
          this.dataSource.data = user
          this.dataSource = new MatTableDataSource<User>(user);
          this.dataSource.paginator = this.paginator;
          this.array = user;
          this.totalSize = this.array.length;
          this.iterator();
          console.log(user)
        });
      }
    
  }

  public getAgent(): void {
    const currentUser = this.authenticationService.currentUserValue;
    var id = currentUser.UserId
      if(currentUser.role != "superadmin"){    
        this.repoService.GetByUnique(id, `api/Agent/GetById`)
          .subscribe(agent => {
                this.Agent = agent;  
            console.log(agent)
          });
        }
        else{
          this.repoService.GetAll("api/Agent/Get")
          .subscribe(agent => {
                this.Agent = agent;  
            console.log(agent)
          });
        }
  }

  public fillEmployee(agent){
    
    console.log(agent.id);
    this.userForm = new FormGroup({   
      UserId: new FormControl('', [Validators.required]),         
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      firstName: new FormControl(agent.Firstname, [Validators.required]),
      lastName: new FormControl(agent.Surname, [Validators.required]),
      RoleId: new FormControl('')
    });
  }
  
  /*public addAgent(agentFormValue){
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
  }*/

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  /*public getAgent(): void {
    
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
  }*/

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  } 

  
  public redirectToUpdate(user){
    
    this.userUpdateButton = true;
    this.userSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.userUpdate = user;    
    this.userForm = new FormGroup({   
      UserId: new FormControl(user.UserId, [Validators.required]),         
      username: new FormControl(user.username, [Validators.required]),
      password: new FormControl(user.password, [Validators.required]),
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      RoleId: new FormControl(user.RoleId)      
    });

    console.log(user); 
  }

  public updateAgent(){
    this.userUpdate.username = this.agentForm.controls["username"].value;    
    this.userUpdate.password = this.agentForm.controls["password"].value;
    this.userUpdate.firstName = this.agentForm.controls["firstName"].value;
    this.userUpdate.lastName = this.agentForm.controls["lastName"].value;
    this.userUpdate.role = this.agentForm.controls["RoleId"].value;
    this.userUpdate.UserId =  this.User.id
    console.log(this.userUpdate); 
    this.userUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.userUpdate, `api/User/Put`)
      .subscribe(res => {                 
        console.log(res)
          let dialogRef = this.dialog.open(SuccessDialogComponent, {
            width: '250px',
            disableClose: true,
            data: {message: "User Successfully Updated"}
          });
          dialogRef.afterClosed()
          .subscribe(result => {
            console.log("closed"); 
            this.initializeUserForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getUser();
          this.resetButton = true;
      });
  }

}

export interface Role {
  id : string;
  Description : string;
}
