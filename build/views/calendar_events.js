"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEvents = void 0;
const date_fns_1 = require("date-fns");
const getEvents = (customers) => {
    let events = [];
    const days_of_week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    customers === null || customers === void 0 ? void 0 : customers.forEach(customer => {
        var _a;
        if (customer.frequency === null || customer.frequency === 'ocasional')
            return;
        let customer_events = [];
        const { id, name, phone, address, locality, frequency, hour, dweek, price, created, } = customer;
        const formated_date = (new Date(created));
        console.log(formated_date + " " + formated_date.getDate());
        const dweek_created = formated_date.getDay();
        if (frequency !== null && dweek != null) {
            if (dweek_created === days_of_week.indexOf(dweek)) {
                const dayDate = new Date();
                const event_hour = +hour.slice(0, hour.indexOf(':'));
                const event_minute = +hour.slice(hour.indexOf(':') + 1);
                const first_event = new Date(formated_date.getFullYear(), formated_date.getMonth(), dayDate.getDate(), event_hour, event_minute);
                customer_events.push({
                    id,
                    title: name,
                    start: first_event,
                    end: (0, date_fns_1.addHours)(first_event, 2),
                    phone,
                    address,
                    locality,
                    price
                });
                for (let i = 0; i <= 50; i++) {
                    const start_date = (_a = customer_events.at(-1)) === null || _a === void 0 ? void 0 : _a.start;
                    if (start_date instanceof Date) {
                        const last_event_date = (0, date_fns_1.addMonths)(start_date, 1);
                        customer_events.push({
                            id,
                            title: name,
                            start: last_event_date,
                            end: (0, date_fns_1.addHours)(last_event_date, 2),
                            phone,
                            address,
                            locality,
                            price
                        });
                    }
                }
                events.push(customer_events);
            }
        }
        else {
        }
    });
    return events;
};
exports.getEvents = getEvents;
