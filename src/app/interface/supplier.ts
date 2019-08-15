export interface Supplier {
    id: string;
    CompanyName?: string;
    ContactName?: string;
    ContactTitle?: string;
    Address?: string;
    CountryId?: string;
    StateId?: string;
    Region?: string;
    Phone?: string;
    DateCreated: Date;
    CreatedUser: string;
    Status?: boolean
}
