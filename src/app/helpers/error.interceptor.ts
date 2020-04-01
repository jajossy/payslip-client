import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthenticationService } from '../authentication.service'
import { MatDialog } from '@angular/material';
import { ErrorDialogComponent } from '../shared/dialogs/error-dialog/error-dialog.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, private dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(err.status === 401){
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            }
            else if(err.statusText === 'Conflict'){
                let dialogRef = this.dialog.open(ErrorDialogComponent, {
                    width: '250px',
                    disableClose: true,
                    data: {message: "This month payslip already exist for this Category!"}                                                
                  });
                  dialogRef.afterClosed()
                  .subscribe(result => {
                    console.log("closed");
                  });
                  const error = err.error || err.statusText;
                    return throwError(error);
            }
            else{
                let dialogRef = this.dialog.open(ErrorDialogComponent, {
                    width: '250px',
                    disableClose: true,
                    data: {message: "Error in completing request..."}                                                
                  });
                  dialogRef.afterClosed()
                  .subscribe(result => {
                    console.log("closed");
                  });
                  //const error = err.error.message || err.statusText;
                    const error = err.error || err.statusText;
                    return throwError(error);
            }
            
        }))
    }
}