import { Router } from 'express';
import { addCustomer, delCustomer, editCustomer, getCustomers } from '../views/customer';
import { Prisma } from '@prisma/client';
import { Customer } from '../types';

const customer_router = Router();

//Get all customers
customer_router.get('/', async (_req, res) => {
    const customers = await getCustomers();
    res.send(customers)
})

//Add new Customer
customer_router.post('/addClient', async (req, res) => {
    const customer: Customer = req.body;
    try {
        await addCustomer({...customer});
        res.status(200).send(customer);
    } catch(err: unknown) {
        if(err instanceof Error){
            if(err instanceof Prisma.PrismaClientValidationError){
                console.log(err);
                res.status(500).send("Asegurese de llenar los campos obligatorios");
            }
        }
    }
})

//Delete a customer
customer_router.delete('/delCustomer', async (req, res) => {
    const customer_id: number = req.body.id;
    try {
        const deleted_Customer = await delCustomer(customer_id);
        res.status(200).send(deleted_Customer)
    } catch(e){
        if(e instanceof Error){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                e.code === "P2025" && res.status(400).send({
                    error: "Not id found"
                });
            } else {
                res.status(400).send(e);
            }
        }
    }
});

//Edit a customer
customer_router.put('/editCustomer', async (req, res) => {
    const {id, edit_Values } = req.body;
    try {
        await editCustomer( id, edit_Values);
        res.status(200).send("Customer updated successfully!")
    } catch(e){
        if(e instanceof Error || e instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send(e)
        }
    }
})

export default customer_router;