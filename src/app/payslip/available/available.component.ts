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
  selector: 'app-available',
  templateUrl: './available.component.html',
  styleUrls: ['./available.component.css']
})
export class AvailableComponent implements OnInit {
  
  

  public dataSource: MatTableDataSource<Payslip>;
  //displayedColumnsOne: string[] = ['position', 'name', 'weight', 'symbol'];
  public displayedColumns: string[] = ['Category', 'SubCategory', 'PayslipYear',
                            'PayslipMonth'                            
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
                this.getPayslip();                
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

              
}




