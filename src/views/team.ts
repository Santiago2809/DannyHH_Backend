import { PrismaClient } from '@prisma/client'
import { Teammember } from '../types';

const prisma = new PrismaClient();

export const getTeam = async (): Promise<Teammember[]> => {
    const allTeam: Teammember[] = await prisma.team.findMany();
    return allTeam;
}

export const addTeam = async (name: string, phone: string) => {
    await prisma.team.create({
        data: {
            name: name,
            phone: phone
        }
    })
}

export const delTeammate = async (id: number): Promise<any> => {
    const idToDelete = +id;
    const delTeam = await prisma.team.delete({
        where: {
            id: idToDelete
        }
    })
    return delTeam;
}

export const editTeammate = async (id: number, editingValues: Partial<Teammember>) => {
    await prisma.team.update({
        where: { id: id },
        data: {
            ...editingValues
        }
    })
};