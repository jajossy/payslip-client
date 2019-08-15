import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RepositoryService } from './../../repository.service';
import { Supplier } from '../../interface/supplier';
import { MatTableDataSource, MatPaginator} from '@angular/material';

@Component({
  selector: 'supplier-list',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {

  allCustomer: Supplier[];
  public array: any;
  public displayedColumns = ['CompanyName', 'ContactName', 'ContactTitle', 'Address', 'Country',
                              'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Supplier>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  //paginator: MatPaginator;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    //this.getCustomer();
  }
  
  /*public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getCustomer(): void {
    
    this.repoService.getAllCustomer()
      .subscribe(customer => {
        this.dataSource.data = customer
        this.dataSource = new MatTableDataSource<Supplier>(customer);
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
  }*/

  
}
