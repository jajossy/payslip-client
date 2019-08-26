import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrentStock } from '../../interface/currentstock';
import { RepositoryService } from './../../repository.service';
import { ProgressService } from './../../progress.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog} from '@angular/material';


@Component({
  selector: 'app-current-stock',
  templateUrl: './current-stock.component.html',
  styleUrls: ['./current-stock.component.css']
})
export class CurrentStockComponent implements OnInit {
  showProgress: boolean;
  
  // table variables
  currentStock: CurrentStock[];
  public array: any;
  public displayedColumns = ['StockName',
                            'Quantity',
                            'ReorderLevel',
                            'PackUnit',
                            'CompanyUnitPrice',
                            'SupplierUnitPrice',
                            'Status',
                            'view'
                              ]
                            
  public dataSource = new MatTableDataSource<CurrentStock>();

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 

  constructor(private repoService: RepositoryService,
               private dialog: MatDialog,               
               private progressService: ProgressService ) { }

  ngOnInit() {   
    this.getStockIn();
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  
  public getStockIn(): void {
    
    this.repoService.GetAll("api/CurrentStock/Get")
      .subscribe(current => {
        this.dataSource.data = current
        this.dataSource = new MatTableDataSource<CurrentStock>(current);
        this.dataSource.paginator = this.paginator;
        this.array = current;
        this.totalSize = this.array.length;
        this.iterator();
        console.log(current)
      });
  }    

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }  

}
