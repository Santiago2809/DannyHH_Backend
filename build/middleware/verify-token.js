"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
// interface JwtPayload {
//     user: string;
// }
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secretKey ? secretKey : "clave");
    }
    catch (e) {
        // console.log("error");
        return new Error("Token invalido");
    }
};
exports.verifyToken = verifyToken;
