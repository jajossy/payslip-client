import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { RepositoryService } from './../repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fullname: string;
  email: string;

  constructor(private repoService: RepositoryService,
              private router: Router,
              private authenticationService: AuthenticationService) { 
    
  }

  ngOnInit() {
    var decode = jwt_decode(localStorage.getItem('suitrohUser'));
    //console.log(decode.ippis);
    this.fullname = decode.fullname;
    this.email = decode.email;
  }

  public executeSelectedChange = (event) => {
    console.log(event);
  }

  gifmis(){ 
    //this.router.navigate(['/payslip/gifmis']);
  }

  ippis(){ 
    this.router.navigate(['/payslip/payslip/ippis']);
  }

  public onLogout = () => {
    this.authenticationService.logout();    
  }

}
