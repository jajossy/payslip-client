import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../interface/order';
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
  Nov2019Disabled : boolean = false;
  Jan2020Disabled: boolean = false;
  Dec2019Disabled: boolean = false;
  Feb2020Disabled: boolean = false;
   

  constructor(private repoService: RepositoryService,
    private dialog: MatDialog,               
    private progressService: ProgressService,
    private authenticationService: AuthenticationService ) { }

    ngOnInit() {
     //var decode = jwt_decode(localStorage.getItem('suitrohUser'));
     //console.log(decode.ippis);
   }
 
   public executeSelectedChange = (event) => {
     console.log(event);
   }

   feb2020(){
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));

    let id5 = "MAIN";
    let id4 = "IPPIS";
    let id3 = "2020";
    let id2 = "FEBUARY";
    let id = decode.ippis;
    this.Feb2020Disabled = true;
    this.engine(id, id2, id3, id4, id5)
     
   }
 
   jan2020(){
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));

    let id5 = "MAIN";
    let id4 = "IPPIS";
    let id3 = "2020";
    let id2 = "JANUARY";
    let id = decode.ippis;
    this.Jan2020Disabled = true;
    this.engine(id, id2, id3, id4, id5)
     
   }

   nov2019(){
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));

    let id5 = "MAIN";
    let id4 = "IPPIS";
    let id3 = "2019";
    let id2 = "NOVEMBER";
    let id = decode.ippis;
    this.Nov2019Disabled = true;
    this.engine(id, id2, id3, id4, id5) 
  }

  dec2019(){
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));

    let id5 = "MAIN";
    let id4 = "IPPIS";
    let id3 = "2019";
    let id2 = "DECEMBER";
    let id = decode.ippis;
    this.Dec2019Disabled = true;
    this.engine(id, id2, id3, id4, id5) 
  }




  engine(id: string, id2: string, id3: string, id4: string, id5: string,){    
 
    this.repoService.GetAll(`api/SendPayslipToMail/SendPayslip/${id}/${id2}/${id3}/${id4}/${id5}`)
    .subscribe(res => {
      console.log(res); 
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
               this.Nov2019Disabled = false;
               this.Jan2020Disabled = false;
               this.Dec2019Disabled = false;
               this.Feb2020Disabled = false;
             }
             else{
               let dialogRef = this.dialog.open(ErrorDialogComponent, {
                 width: '250px',
                 disableClose: true,
                 data: {message: "Error in sending payslip"}
               });
               this.Nov2019Disabled = false;
               this.Jan2020Disabled = false;
               this.Dec2019Disabled = false;
               this.Feb2020Disabled = false;
             }
                  
            },
            error => {
              console.log(error);
            })  
      
    },
    error => {
      console.log(error);
    });
  }

  

}
