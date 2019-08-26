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

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  showProgress: boolean;
  // form varaibles
  public agentForm: FormGroup;
  gender: Gender;
  countries: Country[];
  states: State[];
  CountryId : number;
  StateId : number;
  GenderId: string;

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
      CountryId: new FormControl('', [Validators.required]),
      StateId: new FormControl('', [Validators.required])
      
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

}
