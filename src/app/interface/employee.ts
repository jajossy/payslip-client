export interface Employee {
    EmployeeID: number;
    LastName: string;
    FirstName: string;
    Title?: string;
    TitleOfCourtesy?: string;
    BirthDate?: Date;
    HireDate?: Date;
    Address?: string;
    City?: string;
    Region?: string;
    PostalCode?: string;
    Country?: string;
    HomePhone?: string;
    Extension?: string;
    Photo?: string; //	image	Checked
    Notes?: string;
    ReportsTo?: number;
    PhotoPath?: string;
}
