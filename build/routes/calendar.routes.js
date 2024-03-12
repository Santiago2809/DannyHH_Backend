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
exports.calendar_router = void 0;
const express_1 = require("express");
// import { getCustomers } from '../views/customer';
const calendar_events_1 = require("../views/calendar_events");
const client_1 = require("@prisma/client");
exports.calendar_router = (0, express_1.Router)();
//Get events
exports.calendar_router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield (0, calendar_events_1.getEvents)();
        res.send(events);
    }
    catch (err) {
        console.log(err);
    }
}));
//Add new event
exports.calendar_router.post('/addEvent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const event = req.body;
    try {
        yield (0, calendar_events_1.addNewEvent)(event);
        res.status(200).send(event);
    }
    catch (err) {
        if (err instanceof Error) {
            if (err instanceof client_1.Prisma.PrismaClientValidationError) {
                console.log(err);
                res.status(500).send("Asegurese de llenar los campos obligatorios");
            }
        }
    }
}));
//Update an event
exports.calendar_router.put('/editEvent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, editValues } = req.body;
    try {
        yield (0, calendar_events_1.editEvent)(id, editValues);
        res.status(200).send("Event updated successfully");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
//Delete event
exports.calendar_router.delete('/delEvent', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield (0, calendar_events_1.deleteEvent)(id);
        res.status(200).send("Event deleted succesfully");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
// Confirm finished event
exports.calendar_router.post('/confirmEvent', (_req, _res) => __awaiter(void 0, void 0, void 0, function* () {
    //todo: hacer la ruta de confirmar el evento para despues hacer la funcion que maneje la conexion con la db
}));
