import { Router } from 'express';
import { loginUser } from '../views/auth';
import { verifyToken } from '../../middleware/verify-token';

export const router = Router();

router.post('/', async (req, res) => {

    const { user, password } = req.body;
    try {
        const token = await loginUser(user, password);

        if (token) {
            res.send({
                user,
                autorized: true,
                token: token
            })
        } else {
            res.status(401);
            res.send({ autorized: false, token: "No Token"})
        }
    } catch (e: unknown) {
        console.log(e);
    }
})

router.get('/verify', async (req, res) => {

    const authHeader = req.get('Authorization');
    if (!authHeader){
        res.status(401).send("No hay headers")
        return;
    }
    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = verifyToken(token);
        if(decodedToken instanceof Error){ throw decodedToken};
        res.send(decodedToken);
    } catch (e: unknown | Error) {
        if(!(e instanceof Error)) return;
        res.send({})
    }
})