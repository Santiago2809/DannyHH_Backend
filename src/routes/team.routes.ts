import { Router } from 'express';
import { addTeam, delTeammate, editTeammate, getTeam } from '../views/team';
import { Teammember } from '../types';
import { Prisma } from '@prisma/client';

const team_router = Router();

//* Get team members
team_router.get('/', async (_req, res) => {
    const team: Teammember[] = await getTeam();
    res.send(team);
})

//* Add team member
team_router.post('/addTeam', async (req, res) => {
    const { name, phone }: {name: string, phone: string} = req.body; 
    try {
        await addTeam(name,phone);
        res.status(200).send({
            message: "Team member added successfully",
            name,
            phone
        });
    } catch(err: unknown) {
        if(err instanceof Error){
            if(err instanceof Prisma.PrismaClientValidationError){
                console.log(err);
                res.status(500).send("Asegurese de llenar los campos obligatorios o la informacion correcta");
            }
        }
    }
})

//* Edit team member
team_router.put('/editTeam', async(req, res) => {
    const {id, editValues }: {id: number, editValues: Partial<Teammember> } = req.body;
    try {
        await editTeammate( id, editValues);
        res.status(200).send("Customer updated successfully!")
    } catch(e){
        if(e instanceof Error || e instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send(e)
        }
    }
});

//* Delete team member
team_router.delete('/delTeam', async(req, res) => {
    const {id}: {id: number} = req.body;
    try {
        await delTeammate(id);
        res.status(200).send("Team member deleted successfully!")
    } catch(e){
        if(e instanceof Error || e instanceof Prisma.PrismaClientKnownRequestError){
            res.status(400).send(e)
        }
    }
})
export default team_router;