"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
dotenv_1.default.config();
const secretKey = process.env.SECRET_KEY;
const prisma = new client_1.PrismaClient();
const loginUser = (user, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dbUser = yield prisma.users.findUniqueOrThrow({
            where: {
                username: user
            }
        });
        const userPswd = dbUser.pswd;
        const result = yield bcrypt_1.default.compare(password, userPswd);
        //* If the passwords match, then we create a jwt token to authenticate the user
        if (!result)
            return false;
        const token = jsonwebtoken_1.default.sign({ user, name: "dannysHH" }, secretKey ? secretKey : "clave", { expiresIn: '2h' });
        // console.log(token);
        return token;
    }
    catch (e) {
        if (e instanceof library_1.PrismaClientKnownRequestError) {
            return false;
            // return Promise.reject("User not found!")
        }
    }
});
exports.loginUser = loginUser;
