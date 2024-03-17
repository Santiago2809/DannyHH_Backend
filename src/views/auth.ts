import dotenv from 'dotenv';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

dotenv.config();
const secretKey: string | undefined = process.env.SECRET_KEY;
const prisma = new PrismaClient();


export const loginUser = async (user: string, password: string): Promise<any> => {

    try {
        
        const dbUser = await prisma.users.findUniqueOrThrow({
            where: {
                username: user
            }
        })
        const userPswd = dbUser.pswd;
        const result = await bcrypt.compare(password, userPswd);

        //* If the passwords match, then we create a jwt token to authenticate the user
        if (!result) return false;
        
        const token = jwt.sign({ user, name: "dannysHH" }, secretKey ? secretKey : "clave", { expiresIn: '2h' });
        const tokenCreatedAt = new Date();
        tokenCreatedAt.toString().replace('Z','-0700');
        console.log("Token created at: " + tokenCreatedAt);
        // console.log(token);
        return token;

    } catch (e: unknown) {
        if (e instanceof PrismaClientKnownRequestError) {
            return false
            // return Promise.reject("User not found!")
        }
        return false
    }
};