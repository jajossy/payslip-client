import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Staff } from '../../../interface/staff';
import { RepositoryService } from './../../../repository.service';

@Component({
  selector: 'app-edit-staff-dialog',
  templateUrl: './edit-staff-dialog.component.html',
  styleUrls: ['./edit-staff-dialog.component.css']
})
export class EditStaffDialogComponent implements OnInit {

  staff: Staff[] = [];
  /*{
    QuestionId: '',
    id: 0,
    name: '',
    questionTypeId: 0,
    answered: false,
    QuizId: '',
    Options: []
  }  */
  staffForm: FormGroup;
  //options: FormArray;

  _data: any;
  

  constructor(public dialogRef: MatDialogRef<EditStaffDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private repoService: RepositoryService,
              private formBuilder: FormBuilder) 
              {
                  this._data = data;
                  //alert(this._data.data.id);
                  this.repoService.GetByid(this.data.data.id, `api/Staff/GetById`)
                  .subscribe(res => {                 
                    console.log(res);                    
                    this.staff = res[0];
                  });
                  //alert(this._data.data);
                  //this.checkCurrentStock(this._data.CompanyProductNameId);
              }

  ngOnInit() {
    //this.question = this.questionHold;    
    /*this.repoService.GetByid(this.data.data, `api/Question/GetEdit`)
    .subscribe(res => {                 
      console.log(res);
      //this.dialogRef.close(this.alteredStock);
      this.question = res;
    }); */
  } 
  
 
  

  //public closeDialog = (question) => { 
  public closeDialog(staff) {  
        console.log(staff); 
           
        /*this.questionForm = this.formBuilder.group({
          QuestionId: '',
          id: 0,
          name: this.Question,
          questionTypeId: 0,
          answered: false,
          QuizId: '',
          options: this.formBuilder.array([ this.createOptionsA(),  this.createOptionsB(), this.createOptionsC(),
            this.createOptionsD()])      
        }); */        

        

        this.staffForm = this.formBuilder.group({          

          id: staff.id,
          Fullname: staff.Fullname,
          Department: staff.Department,
          Email: staff.Email,
          Ippis: staff.Ippis,
          DateEntered: staff.DateEntered,
          Comment: staff.Comment,
          role : staff.role,            
        });
       
        
        console.log(this.staffForm.value);

        this.repoService.UPDATE(this.staffForm.value, `api/Staff/Put`)
          .subscribe(res => {                 
            console.log(staff.id);
            
            this.dialogRef.close(staff.id);
          });
          //this.dialogRef.close();  
          
        
  }

  
  


}

