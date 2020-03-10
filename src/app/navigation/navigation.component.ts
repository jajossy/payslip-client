import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from './../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
  }

  public onSidenavClose = () => { 
    if(this.authenticationService.currentUser == null )
    {
      
    }
    else{
      this.sidenavClose.emit();
    } 
    //this.sidenavClose.emit();
  }

  logout(){
    this.sidenavClose.emit();
    this.authenticationService.logout();
  }

}
