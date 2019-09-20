import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Country } from '../../interface/country';
import { State } from '../../interface/state';
import { Gender } from '../../interface/gender';
import { FieldAgent } from '../../interface/fieldagent';
import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from '../../shared/dialogs/error-dialog/error-dialog.component';
import { ProgressService } from './../../progress.service';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  showProgress: boolean;
  selected : number;
  agentSaveButton : boolean = true;
  agentUpdateButton : boolean = false;
  resetButton: boolean  = true;

  // form varaibles
  public agentForm: FormGroup;
  gender: Gender;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;
  GenderId: string;

  fieldAgentUpdate : FieldAgent;

  // table variables
  allagents: FieldAgent[];
  public array: any;
  public displayedColumns = ['Surname', 'Firstname', 'Othernames', 'AllocatedZone', 'Country',
                             'update'];

  public dataSource = new MatTableDataSource<FieldAgent>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              private progressService: ProgressService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.initializeForm();
    this.getCountry();
    this.getGender();
    this.getAgent();
  }

  initializeForm(){
    this.agentForm = new FormGroup({      
      Surname: new FormControl('', [Validators.required]),
      Firstname: new FormControl('', [Validators.required]),
      Othernames: new FormControl(''),
      GenderId: new FormControl('', [Validators.required]),
      AllocatedZone: new FormControl(''),
      Remark: new FormControl(''),      
      CountryId: new FormControl(''),
      StateId: new FormControl(''),
      CreatedUser: new FormControl('')
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.agentForm.controls[controlName].hasError(errorName);
  }

  getGender(){
    this.repoService.GetAll("api/Gender/Get")
    .subscribe(gender => {
      this.gender = gender;            
      console.log(gender)
    });
  }

  getCountry(){
    this.repoService.GetAll("api/country/Get")
    .subscribe(country => {
      this.countries = country;            
      console.log(country)
    });
  }

  getState(id: number){
    this.repoService.GetAll(`api/State/Get/${id}`)
    .subscribe(state => {
      this.states = state;            
      console.log(state)
    });
  }

  fillState(CountryId){
    alert(CountryId);
    this.getState(CountryId);
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

  public reset() : void{
    this.agentSaveButton = true;    
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getAgent(): void {
    
    this.repoService.GetAll("api/Agent/Get")
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

  public redirectToUpdate(agent){
    this.getState(agent.CountryId);
    this.agentUpdateButton = true;
    this.agentSaveButton = false;
    this.resetButton = false;
    this.selected = 0;
    this.fieldAgentUpdate = agent;    
    this.agentForm = new FormGroup({      
      Surname : new FormControl(agent.Surname, [Validators.required]),
      Firstname : new FormControl(agent.Firstname, [Validators.required]),
      Othernames : new FormControl(agent.Othernames),
      GenderId : new FormControl(agent.GenderId, [Validators.required]),
      AllocatedZone : new FormControl(agent.AllocatedZone),
      Remark : new FormControl(agent.Remark),
      //Status : new FormControl(agent.Status),
      CountryId : new FormControl(agent.CountryId),
      StateId : new FormControl(agent.StateId)            
    });
    console.log(agent);    
  }

  public updateAgent(){
    this.fieldAgentUpdate.Surname = this.agentForm.controls["Surname"].value;    
    this.fieldAgentUpdate.Firstname = this.agentForm.controls["Firstname"].value;
    this.fieldAgentUpdate.Othernames = this.agentForm.controls["Othernames"].value;
    this.fieldAgentUpdate.GenderId = this.agentForm.controls["GenderId"].value;    
    this.fieldAgentUpdate.AllocatedZone = this.agentForm.controls["AllocatedZone"].value;
    this.fieldAgentUpdate.Remark = this.agentForm.controls["Remark"].value;
    this.fieldAgentUpdate.CountryId = this.agentForm.controls["CountryId"].value;
    this.fieldAgentUpdate.StateId = this.agentForm.controls["StateId"].value;
    this.fieldAgentUpdate.CreatedUser =  this.authenticationService.currentUserValue.UserId;
    console.log(this.fieldAgentUpdate); 
    this.agentUpdateButton = false // disable update button  
    
    this.repoService.UPDATE(this.fieldAgentUpdate, `api/Agent/Put`)
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
            this.initializeForm();           
            //this.supplierSaveButton = true;
            this.selected = 1;
          });
          this.getAgent();
          this.resetButton = true;
      });
  }

}
