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
const express_1 = require("express");
const team_1 = require("../views/team");
const client_1 = require("@prisma/client");
const team_router = (0, express_1.Router)();
//* Get team members
team_router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield (0, team_1.getTeam)();
    res.send(team);
}));
//* Add team member
team_router.post('/addTeam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name: teamMember } = req.body;
    try {
        yield (0, team_1.addTeam)(teamMember);
        res.status(200).send({
            message: "Team member added successfully",
            name: teamMember
        });
    }
    catch (err) {
        if (err instanceof Error) {
            if (err instanceof client_1.Prisma.PrismaClientValidationError) {
                console.log(err);
                res.status(500).send("Asegurese de llenar los campos obligatorios o la informacion correcta");
            }
        }
    }
}));
//* Edit team member
team_router.put('/editTeam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.body;
    try {
        yield (0, team_1.editTeammate)(id, name);
        res.status(200).send("Customer updated successfully!");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
//* Delete team member
team_router.delete('/delTeam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield (0, team_1.delTeammate)(id);
        res.status(200).send("Team member deleted successfully!");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
exports.default = team_router;
