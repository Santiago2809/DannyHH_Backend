import { PrismaClient } from '@prisma/client'
import { Customer } from '../types';

const prisma = new PrismaClient()

export const getCustomers = async (): Promise<Customer[]> => {
    const allCustomers = await prisma.customer.findMany();
    return allCustomers;
    
}

export const addCustomer = async (customer: Customer ) => {
    const { name, phone, address, locality, frequency, hour, dweek, no_week, category, price, created } = customer; 
    await prisma.customer.create({
        data: {
            name: name,
            phone: phone,
            address: address,
            locality: locality,
            frequency: frequency,
            hour: hour,
            dweek: dweek,
            no_week: no_week,
            category: category,
            price: price,
            created: created
        }
    })   

}

export const delCustomer = async (id: number): Promise<Customer>  => {
    const delCustomer = await prisma.customer.delete({
        where: {
            id: id
        }
    })
    return delCustomer;
}

export const editCustomer = async (id: number, editingValues: Partial<Customer>) => {
    await prisma.customer.update({
        where: { id: id },
        data: {
            ...editingValues
        }
    })
};