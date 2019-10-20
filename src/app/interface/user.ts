export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    token?: string;
    DateCreated: Date;
    UserId: string;
    EmployeeId: string;
    /*access_token: string;
    expires_in: number;
    token_type: string*/
}