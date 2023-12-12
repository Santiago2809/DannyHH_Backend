export type Customer = {
    id: number;
    name: string;
    phone: string;
    address: string;
    locality: string;
    frequency: string | null;
    hour: string;
    dweek: string | null;
    no_week: number | null;
    category: string;
    price: number;
    created: string;
    duration: number;
    team: string
}
export type Teammember = {
    id: number;
    name: String
}
export type OcasionalDate = {
    id: number;
    customer: string;
    date: string;
    price: number;
    duration: number;
    comments: string | null;
    address: string | null;
    locality: string | null;
}
export type ConfirmedDate = {
    id: number;
    customerId: number;
    price: number;
    date: string
}
export enum Days_of_Week {
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
    SUNDAY = 'sunday'
}