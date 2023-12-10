import { PrismaClient } from '@prisma/client'
import { Customer } from '../types';

const prisma = new PrismaClient()

export const getCustomers = async (): Promise<any[]> => {
    const allCustomers = await prisma.customer.findMany();
    return allCustomers;
}

export const addCustomer = async (customer: Customer) => {
    const { name, phone, address, locality, frequency, hour, dweek, no_week, category, price, created, duration, team } = customer;
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
            created: created,
            duration: duration,
            team: team
        }
    })
}

export const delCustomer = async (id: number): Promise<any> => {
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

export const editCustomerTeam = async(id: number, selectedTeam: string | null) => {
    await prisma.customer.update({
        where: { id: id },
        data: {
            team: selectedTeam
        }
    })
}