// interface JwtPayload {
//     user: string;
// }
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
const secretKey: string | undefined = process.env.SECRET_KEY;

export const verifyToken = (token: string ): any => {
    try {
        return jwt.verify(token, secretKey ? secretKey : "clave" );
    } catch (e: unknown) {
        // console.log("error");
        return new Error("Token invalido");
    }
}