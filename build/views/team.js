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
exports.editTeammate = exports.delTeammate = exports.addTeam = exports.getTeam = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTeam = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTeam = yield prisma.team.findMany();
    return allTeam;
});
exports.getTeam = getTeam;
const addTeam = (name, phone) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.team.create({
        data: {
            name: name,
            phone: phone
        }
    });
});
exports.addTeam = addTeam;
const delTeammate = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const idToDelete = +id;
    const delTeam = yield prisma.team.delete({
        where: {
            id: idToDelete
        }
    });
    return delTeam;
});
exports.delTeammate = delTeammate;
const editTeammate = (id, editingValues) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.team.update({
        where: { id: id },
        data: Object.assign({}, editingValues)
    });
});
exports.editTeammate = editTeammate;
