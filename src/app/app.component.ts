import { Component } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router, Event, NavigationCancel,
        NavigationEnd, NavigationError, NavigationStart } from '@angular/router';
import { User } from './interface/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-material';
  loading = false;
  
  constructor(private authenticationService: AuthenticationService,
     private router: Router){
    this.authenticationService.currentUser.subscribe(x => {
      console.log(x);
      });

      this.router.events.subscribe((event: Event) =>{
        switch(true){
          case event instanceof NavigationStart:{
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError:{
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      })
    }
}
