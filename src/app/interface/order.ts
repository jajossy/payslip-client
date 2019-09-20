import { FieldAgent } from '../interface/fieldagent';
import { Customer } from '../interface/customer';

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
    FieldAgent : FieldAgent;
    Customer : Customer;
}