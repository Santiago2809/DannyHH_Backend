interface JwtPayload {
    user: string;
}
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey: string | undefined = process.env.SECRET_KEY;

export const isAuth = ( req: any, res: any, next: any ) => {
    const authHeader = req.get('Authorization');
    if (!authHeader){
        const error = new Error("No Authorization header");
        res.status(401);
        next(error);
    }

    const token = authHeader.split(" ")[1];
    // console.log(token);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, secretKey ? secretKey : "clave") as JwtPayload;

    } catch (err: unknown) {
        if (!(err instanceof Error)) return;
        const error = new Error("Something went wrong")
        res.status(500);
        next(error);
    }
    if(!decodedToken) {
        const error = new Error("Not authenticated");
        res.status(401);
        next(error);
    }
    // req.userId = decodedToken.user;
    next();
}