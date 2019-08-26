export interface Customer {
    id : string;
    Storename : string;
    Zone? : string;
    MarketPlace? : string;
    Surname? : string;
    Firstname? : string;
    Othernames? : string;
    GenderId? : string;
    PhoneNo? : string;
    CustomerEmail? : string;
    Remark ? : string;
    Status : boolean;
    CountryId? : number;
    StateId? : number;
    CreatedUser? : string;
    DateCreated : Date;
}