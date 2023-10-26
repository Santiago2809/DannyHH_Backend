import { Router } from 'express';
// import { getCustomers } from '../views/customer';
import { addNewEvent } from '../views/calendar_events';
import { Prisma } from '@prisma/client';

export const calendar_router = Router();

//Get customers
// calendar_router.get('/', async (_req, res) => {
//     const customers = await getCustomers();
//     const events = getEvents(customers);
//     res.status(200).send(events);
// })

//Add new event
calendar_router.post('/addEvent', async (req, res) => {
    const event = req.body;
    try {
        await addNewEvent(event);
        res.status(200).send(event);
    } catch (err: unknown) {
        if (err instanceof Error) {
            if (err instanceof Prisma.PrismaClientValidationError) {
                console.log(err);
                res.status(500).send("Asegurese de llenar los campos obligatorios");
            }
        }
    }
})