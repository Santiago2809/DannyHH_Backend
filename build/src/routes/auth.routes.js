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
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_1 = require("../views/auth");
const verify_token_1 = require("../../middleware/verify-token");
exports.router = (0, express_1.Router)();
exports.router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, password } = req.body;
    try {
        const token = yield (0, auth_1.loginUser)(user, password);
        if (token) {
            res.send({
                user,
                autorized: true,
                token: token
            });
        }
        else {
            res.status(401);
            res.send({ autorized: false, token: "No Token" });
        }
    }
    catch (e) {
        console.log(e);
    }
}));
exports.router.get('/verify', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).send("No hay headers");
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = (0, verify_token_1.verifyToken)(token);
        if (decodedToken instanceof Error) {
            throw decodedToken;
        }
        ;
        res.send(decodedToken);
    }
    catch (e) {
        if (!(e instanceof Error))
            return;
        res.send({});
    }
}));
