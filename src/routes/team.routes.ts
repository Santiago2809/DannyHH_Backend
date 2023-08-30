import { Router } from 'express';

const team_router = Router();

team_router.get('/', (_req, res) => {
    res.send("Getting team")
})

export default team_router;