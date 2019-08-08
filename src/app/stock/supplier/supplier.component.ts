import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RepositoryService } from './../../repository.service';
import { Customer } from '../../interface/customer';
import { MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  allCustomer: Customer[];
  public array: any;
  public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address', 'Country',
                              'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Customer>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //paginator: MatPaginator;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.getCustomer();
  }
  
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
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
        this.dataSource = new MatTableDataSource<Customer>(customer);
        this.dataSource.paginator = this.paginator;
        this.array = customer;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(customer)
      });
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }

  /*public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
  }*/

}
