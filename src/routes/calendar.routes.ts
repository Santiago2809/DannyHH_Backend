import { Router } from 'express';
import { getCustomers } from '../views/customer';
import { getEvents } from '../views/calendar_events';

export const calendar_router = Router();

//Get customers
calendar_router.get('/', async (_req, res)=> {
    const customers = await getCustomers();
    const events = getEvents(customers);
    res.status(200).send(events);
})