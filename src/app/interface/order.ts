export interface Order {
    id : string;
    AgentId : string;
    CustomerId : string;
    Approved? : boolean;
    Pending? : boolean;
    Cancelled? : boolean;
    TotalOrderAmount : number;
    TotalSuppliedAmount? : number;
    DateCreated	: Date;
}