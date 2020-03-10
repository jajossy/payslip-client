import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Staff } from '../../interface/staff';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
//import { QuestionDialogComponent } from '../../shared/dialogs/question-dialog/question-dialog.component';
import { EditStaffDialogComponent } from '../../shared/dialogs/edit-staff-dialog/edit-staff-dialog.component';
import { AuthenticationService } from '../../authentication.service';

import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit {

  showProgress: boolean;
  staff: Staff;
  IppisNo: string;
  Name: string;
  
  public array: any;  
  public displayedColumns = [    
    'Fullname',
    'Department',
    'Email',
    'Ippis',
    'update'    
  ];
    


  public dataSource = new MatTableDataSource<Staff>();
 
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild('TABLE', {static: false}) table: ElementRef;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
              public progressService: ProgressService,
              private dialog: MatDialog,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {    
    //this.getStaff();
  } 

  

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  //public getResult(CombinationId): void {
  public searchName(): void {
    
    this.showProgress = true;
    //this.repoService.GetAll("api/Result/GetResult")
    //this.repoService.GetByUnique(decode.token, "api/Result/GetResult")
    this.repoService.GetByUnique(this.Name, "api/Staff/GetByName")
      .subscribe(res => {
        console.log(res)
        this.staff = res;        
        this.dataSource = new MatTableDataSource<Staff>(res);
        this.dataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.iterator();        
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
        this.staff = res;        
        this.dataSource = new MatTableDataSource<Staff>(res);
        this.dataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.iterator();        
        this.showProgress = false;
      });
  }

  public getId(id): void {
    
    this.showProgress = true;
    
    this.repoService.GetByUnique(id, "api/Staff/GetById")
      .subscribe(res => {
        console.log(res)
        this.staff = res;        
        this.dataSource = new MatTableDataSource<Staff>(res);
        this.dataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
        this.iterator();        
        this.showProgress = false;
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  } 


  public redirectToUpdate(questionId){
      let dialogRef = this.dialog.open(EditStaffDialogComponent, {
        width: '700px',
        disableClose: true,
        data: {data: questionId}         
      });
      
      dialogRef.afterClosed()
      .subscribe(result => {                  
        console.log(result);
        this.getId(result);
        if(result == true){

        }
        else{
          //this.AddFreshCurrentStock(result);
        }
    });

  }

  

}


  
