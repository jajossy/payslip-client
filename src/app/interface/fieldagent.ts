export interface FieldAgent {
    id : string;
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