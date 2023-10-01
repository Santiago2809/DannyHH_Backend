import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export const getTeam = async (): Promise<any> => {
    const allTeam = await prisma.team.findMany();
    return allTeam;
}

export const addTeam = async (teammate: string) => {
    await prisma.team.create({
        data: {
            name: teammate
        }
    })
}

export const delTeammate = async (id: number): Promise<any> => {
    const delTeam = await prisma.team.delete({
        where: {
            id: id
        }
    })
    return delTeam;
}

export const editTeammate = async (id: number, editingValue: string) => {
    await prisma.team.update({
        where: { id: id },
        data: {
            name: editingValue
        }
    })
};