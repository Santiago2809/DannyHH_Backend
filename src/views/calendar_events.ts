import { PrismaClient } from '@prisma/client'
import { OcasionalDate } from '../types';

const prisma = new PrismaClient()


//* Get all ocasional events from the db
export const getEvents = async (): Promise<any> => {
    const ocasionalEvents: OcasionalDate[] = await prisma.ocasionalDates.findMany();
    return ocasionalEvents;
}

//* Add a new ocasional event to the database
export const addNewEvent = async( event: OcasionalDate ) => {
    const { customer, date, price, duration, comments, address, locality } = event;
    await prisma.ocasionalDates.create({
        data: {
            customer,
            date,
            duration,
            price,
            comments,
            address,
            locality
        }
    })
}

//* Edit a ocasional event from the database
export const editEvent = async (id: number, editValues: Partial<OcasionalDate>): Promise<any> => {
    await prisma.ocasionalDates.update({
        where: { id: id},
        data: {
            ...editValues
        }
    })
}

//* Delete an ocasional event from the database
export const deleteEvent = async (id: number): Promise<any> => {
    await prisma.ocasionalDates.delete({
        where: { id: id }
    })
}