import { CompanyStockTag } from '../interface/companystocktag';
export interface OrderItem {
    id : string;
    ProductId : string;
    Quantity : number;
    SalesUnitPrice : number;
    SalesTotalAmount : number;
    OrderId	: string;
    BatchNo? : string;
    SuppliedUnitPrice : number;
    SuppliedTotalPrice : number;
    CompanyStockTag: CompanyStockTag;
    AgentId?: string;
}