import { CompanyStockTag } from '../interface/companystocktag';
export interface CurrentStock{
    id : string;
    StockNameId : string;
    Quantity : number;
    ReorderLevel : number;
    PackUnit : string;
    CompanyUnitPrice : number;
    SupplierUnitPrice? : number;
    Status : boolean;
    Comment? : string;
    CreatedUser? : string;
    CompanyStockTag: CompanyStockTag;
}