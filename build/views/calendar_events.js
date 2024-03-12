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
exports.deleteEvent = exports.editEvent = exports.addNewEvent = exports.getEvents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//* Get all ocasional events from the db
const getEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const ocasionalEvents = yield prisma.ocasionalDates.findMany();
    return ocasionalEvents;
});
exports.getEvents = getEvents;
//* Add a new ocasional event to the database
const addNewEvent = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { customer, date, price, duration, comments, address, locality } = event;
    yield prisma.ocasionalDates.create({
        data: {
            customer,
            date,
            duration,
            price,
            comments,
            address,
            locality
        }
    });
});
exports.addNewEvent = addNewEvent;
//* Edit a ocasional event from the database
const editEvent = (id, editValues) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.ocasionalDates.update({
        where: { id: id },
        data: Object.assign({}, editValues)
    });
});
exports.editEvent = editEvent;
//* Delete an ocasional event from the database
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.ocasionalDates.delete({
        where: { id: id }
    });
});
exports.deleteEvent = deleteEvent;
