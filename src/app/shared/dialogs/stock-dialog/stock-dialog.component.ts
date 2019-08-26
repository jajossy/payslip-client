import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { CurrentStock } from '../../../interface/currentstock';
import { StockIn } from '../../../interface/stockin';
import { CompanyStockTag } from '../../../interface/companystocktag';
import { Supplier } from '../../../interface/supplier';
import { RepositoryService } from './../../../repository.service';

@Component({
  selector: 'app-stock-dialog',
  templateUrl: './stock-dialog.component.html',
  styleUrls: ['./stock-dialog.component.css']
})
export class StockDialogComponent implements OnInit {
  _data: any;
  currentStock : CurrentStock;
  checkStockExist: boolean = false;
  stockExist: boolean = false;
  stockExistState: boolean;

  reorderLevel: number;
  CompanyUnitPrice: number;
  Comment: string;
  alteredStock : AlteredStockIn;

  constructor(public dialogRef: MatDialogRef<StockDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: StockIn,
              private repoService: RepositoryService) 
              {
                  this._data = data;
                  this.checkCurrentStock(this._data.CompanyProductNameId);
              }

  ngOnInit() {    
    //this.checkCurrentStock(this._data.id);
  }


  checkCurrentStock(id: string){
    this.repoService.GetByUnique(id, `api/CurrentStock/GetById`)
    .subscribe(current => {
      this.currentStock = current;            
      console.log(current);
      if(this.currentStock == null)
      {
        this.checkStockExist = true;
        this.stockExistState = false;
      }
      else
      {
        this.stockExist = true;
        this.stockExistState = true;
      }
    });
  }

  public closeDialog = () => {
    this.alteredStock = { 
      id : this._data.id,    
      CompanyProductNameId : this._data.CompanyProductNameId,
      SupplierId : this._data.SupplierId,
      SupplierProductName : this._data.SupplierProductName,
      SuppliedPrice : this._data.SuppliedPrice,
      UnitPrice : this._data.UnitPrice,
      QuantitySupplied : this._data.QuantitySupplied,
      DateSupplied : this._data.DateSupplied,
      PackUnit : this._data.PackUnit,
      BatchNo : this._data.BatchNo,
      CreatedUser : this._data.CreatedUser,
      CreatedDate : this._data.CreatedDate,
      CompanyStockTag : this._data.CompanyStockTag,
      Supplier : this._data.Supplier,
      reorderLevel : this.reorderLevel,
      CompanyUnitPrice : this.CompanyUnitPrice,
      Comment : this.Comment,
      stockExist : this.stockExistState
    }
    this.dialogRef.close(this.alteredStock);
  }

}

interface AlteredStockIn {
  id : string;
  CompanyProductNameId : string;
  SupplierId : string;
  SupplierProductName	: string;
  SuppliedPrice? : number;
  UnitPrice : number;
  QuantitySupplied : number;
  DateSupplied : Date;
  PackUnit : string;
  BatchNo? : string;
  CreatedUser? : string;
  CreatedDate	: Date;
  CompanyStockTag: CompanyStockTag;
  Supplier: Supplier;
  reorderLevel: number;
  CompanyUnitPrice: number;
  Comment: string;
  stockExist : boolean;
}
