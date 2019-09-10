import { Component, OnInit, Output, EventEmitter } from '@angular/core'; 
import { AuthenticationService } from '../authentication.service';
import { User } from '../interface/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  username: string;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    if(localStorage.getItem('suitrohUser') != null)
    {
      this.authenticationService.currentUser.subscribe(x => {
        this.currentUser = x;
        this.username = this.currentUser.username
      });
      console.log(this.currentUser);
    }
    
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  public onLogout = () => {
    this.authenticationService.logout();
  }

}
