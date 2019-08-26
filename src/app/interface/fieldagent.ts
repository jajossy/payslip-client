export interface FieldAgent {
    id : number;
    Surname : string;
    Firstname : string;
    Othernames? : string;
    GenderId : string;
    AllocatedZone? : string;
    Remark? : string;
    Status : boolean;
    CountryId : number;
    StateId : number;
    CreatedUser? : string;
    DateCreated : Date;
}