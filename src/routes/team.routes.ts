import { Router } from 'express';
import { getTeam } from '../views/team';

const team_router = Router();

//Get team members
team_router.get('/', async (_req, res) => {
    const team = await getTeam();
    res.send(team);
})


export default team_router;