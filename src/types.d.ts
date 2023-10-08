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
    created: string
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