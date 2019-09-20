import { CompanyStockTag } from '../interface/companystocktag';
import { Supplier } from '../interface/supplier';

export interface StockIn {
    id : string;
    CompanyProductNameId : string;
    SupplierId : string;
    SupplierProductName? : string;
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
}