import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../interface/order';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { SuccessDialogComponent } from '../../shared/dialogs/success-dialog/success-dialog.component';
import { AuthenticationService } from '../../authentication.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable} from '@angular/material';

import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute } from '@angular/router';

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
 
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];


@Component({
  selector: 'app-gifmis',
  templateUrl: './gifmis.component.html',
  styleUrls: ['./gifmis.component.css']
})

export class GifmisComponent implements OnInit {
  showProgress: boolean;  

  dataSourceOne: MatTableDataSource<PeriodicElement>;
  displayedColumnsOne: string[] = ['position', 'name', 'weight', 'symbol'];
  @ViewChild('TableOnePaginator', {static: true}) tableOnePaginator: MatPaginator;
  @ViewChild('TableOneSort', {static: true}) tableOneSort: MatSort;
   

  constructor(private repoService: RepositoryService,
               private dialog: MatDialog,               
               private progressService: ProgressService,
               private authenticationService: AuthenticationService ) 
               { 
                this.dataSourceOne = new MatTableDataSource;
               }

               ngOnInit() {
                //var decode = jwt_decode(localStorage.getItem('suitrohUser'));
                //console.log(decode.ippis);
                this.dataSourceOne.data = ELEMENT_DATA;
                this.dataSourceOne.paginator = this.tableOnePaginator;
                this.dataSourceOne.sort = this.tableOneSort;                
              }

              applyFilterOne(filterValue: string) {
                this.dataSourceOne.filter = filterValue.trim().toLowerCase();
              }
            
              /*public executeSelectedChange = (event) => {
                console.log(event);
              }
            
              july(){
                                
                var decode = jwt_decode(localStorage.getItem('suitrohUser'));
            
                let id2 = "july";
                let id = decode.ippis;
                console.log(decode.ippis);
            
                this.repoService.GetAll(`api/SendPayslipToMail/SendPayslip/${id}/${id2}`)
                .subscribe(res => {
                  console.log(res); 
                  //var apiPath = `http://localhost/PayslipWebApi/api/GetPdf/Get/${id}/${id2}`;
                  //window.open(apiPath, "_blank"); 
                        this.repoService.GetAll(`api/SendEmail/SendPayslip/${id}`)
                        .subscribe(res => {
                          console.log(res); 
                              
                        },
                        error => {
                          console.log(error);
                        })  
                  
                },
                error => {
                  console.log(error);
                })
            
            
            
                //var apiPath = `http://localhost/PayslipWebApi/api/GetPdf/Get/${id}/${id2}`;
                  //window.open(apiPath, "_blank");
                
                this.repoService.GetLogin(id, id2, `api/GetPdf/Get`)
                .subscribe(res => {
                  //this.router.navigate(['/home']);      
                  
                  console.log(res);
                  var apiPath = `http://localhost/PayslipWebApi/api/GetPdf/Get/${id}/${id2}`;
                  window.open(apiPath, "_blank");
                },
                error => {
                  console.log(error);
                })
                
                
              }*/

}


