export interface Sale {
    id : string;
    OrderId : string;
    AmountCollected : number;
    CollectorId? : string;
    DateCreated : Date;
    }