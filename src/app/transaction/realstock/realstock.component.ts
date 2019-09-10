import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CurrentStock } from '../../interface/currentstock';
import { Order } from '../../interface/order';
import { OrderItem } from '../../interface/orderitem';
import { Customer } from '../../interface/customer';

import { RepositoryService } from './../../repository.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatTable} from '@angular/material';

import { ProgressService } from './../../progress.service';


@Component({
  selector: 'app-realstock',
  templateUrl: './realstock.component.html',
  styleUrls: ['./realstock.component.css']
})
export class RealStockComponent implements OnInit {
  showProgress: boolean;

  // form varaibles
  public salesForm: FormGroup;

  order: Order[];  
  allCustomer: Customer[];
  
  //orderItem: Observable<OrderItem[]>;
  
  currentStock: CurrentStock[];
  dynamicCurrentStock: CurrentStock;  
  GenderId: string;  

  public array: any;
  
  
  constructor(private repoService: RepositoryService, private dialog: MatDialog,
              public progressService: ProgressService) { }

  ngOnInit() { 
      
    this.getCurrent();      
  }  

  
  getCurrent(){
    this.repoService.GetAll("api/CurrentStock/Get")
    .subscribe(current => {
      this.currentStock = current;            
      console.log(current)
    });
  }  

  
}

export interface payment {
  id: number;
  Description: string;
}


