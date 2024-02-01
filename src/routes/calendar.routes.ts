import { Router } from 'express';
// import { getCustomers } from '../views/customer';
import { addNewEvent, deleteEvent, editEvent, getEvents } from '../views/calendar_events';
import { Prisma } from '@prisma/client';
import { OcasionalDate } from '../types';

export const calendar_router = Router();

//Get events
calendar_router.get('/', async (_req,res) => {
    try {
        const events = await getEvents();
        res.send(events);
    } catch (err: unknown) {
        console.log(err);
    }
})

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

//Update an event
calendar_router.put('/editEvent', async (req, res) => {
    const { id, editValues }: {id: number, editValues: Partial<OcasionalDate> } = req.body;
    try {
        await editEvent(id, editValues);
        res.status(200).send("Event updated successfully");
    } catch(e){
        if(e instanceof Error || e instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send(e)
        }
    }
})

//Delete event
calendar_router.delete('/delEvent', async (req, res) => {
    const { id } = req.body;
    try {
        await deleteEvent(id);
        res.status(200).send("Event deleted succesfully")
    } catch(e){
        if(e instanceof Error || e instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send(e)
        }
    }
});

// Confirm finished event
calendar_router.post('/confirmEvent', async (_req, _res) => {
    //todo: hacer la ruta de confirmar el evento para despues hacer la funcion que maneje la conexion con la db
})