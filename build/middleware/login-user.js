"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const isAuth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error("No Authorization header");
        res.status(401);
        next(error);
    }
    const token = authHeader.split(" ")[1];
    // console.log(token);
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, secretKey ? secretKey : "clave");
    }
    catch (err) {
        if (!(err instanceof Error))
            return;
        const error = new Error("The token is invalid");
        res.status(401);
        res.send(error.message);
        return;
        //* La manera de manejar errores con next() es una manera vieja, podemos enviar el error en la response y express lo maneja automaticamente.
        // next(error);
    }
    if (!decodedToken) {
        const error = new Error("Not authenticated");
        res.status(401);
        res.send(error.message);
        // next(error);
    }
    // req.userId = decodedToken.user;
    next();
};
exports.isAuth = isAuth;
