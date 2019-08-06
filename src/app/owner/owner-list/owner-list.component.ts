import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RepositoryService } from './../../repository.service';
import { Customer } from '../../interface/customer';
import { MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit {

  allCustomer: Customer[];

  /*public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address',
                              'City', 'Region', 'PostalCode', 'Country', 'Phone', 'Fax']*/

  public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address', 'Country',
                              'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Customer>();
  
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  paginator: MatPaginator;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.getCustomer();
  }  

  /*public getAllCustomers = () => {
    this.repoService.getData('api/customer')
    .subscribe(res => {
      this.dataSource.data = res as Customer[];
      console.log(res);
    })
  }*/

  public getCustomer(): void {
    //this.heroes = this.heroService.getHeroes();
    this.repoService.getAllCustomer()
      .subscribe(customer => {
        this.dataSource.data = customer
        console.log(customer)
      });
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
  }

}
