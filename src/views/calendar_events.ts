import { addHours, addMonths } from "date-fns";
import { PrismaClient } from '@prisma/client'
import { Customer } from '../types';

const prisma = new PrismaClient()


export const getEvents = (customers: Customer[]) => {
    let events: any[] = [];
    const days_of_week: string[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    customers?.forEach(customer => {
        if (customer.frequency === null || customer.frequency === 'ocasional') return;
        let customer_events = [];

        const { id, name, phone, address, locality, frequency, hour, dweek, price, created, } = customer;
        
        const formated_date = (new Date(created));
        console.log(formated_date + " " + formated_date.getDate());
        
        const dweek_created: number = formated_date.getDay();
        if (frequency !== null && dweek != null) {
            if (dweek_created === days_of_week.indexOf(dweek)) {
                const dayDate = new Date();
                const event_hour = +hour.slice(0, hour.indexOf(':'))
                const event_minute = +hour.slice(hour.indexOf(':')+1) 

                const first_event = new Date(formated_date.getFullYear(), formated_date.getMonth(), dayDate.getDate(), event_hour, event_minute);

                customer_events.push({
                    id,
                    title: name,
                    start: first_event,
                    end: addHours(first_event, 2),
                    phone,
                    address,
                    locality,
                    price
                });
                for (let i = 0; i <= 50; i++) {
                    const start_date = customer_events.at(-1)?.start;
                    if (start_date instanceof Date) {
                        const last_event_date = addMonths(start_date, 1)
                        customer_events.push({
                            id,
                            title: name,
                            start: last_event_date,
                            end: addHours(last_event_date, 2),
                            phone,
                            address,
                            locality,
                            price
                        })
                    }
                }
                events.push(customer_events);
            }
        } else {

        }
    })
    return events;
}

export const addNewEvent = async( event: any ) => {
    const { customer, date, price, duration, comments } = event;
    await prisma.ocasionalDates.create({
        data: {
            customer,
            date,
            duration,
            price,
            comments
        }
    })
}