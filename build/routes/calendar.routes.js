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
const customer_1 = require("../views/customer");
const calendar_events_1 = require("../views/calendar_events");
exports.calendar_router = (0, express_1.Router)();
//Get customers
exports.calendar_router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield (0, customer_1.getCustomers)();
    const events = (0, calendar_events_1.getEvents)(customers);
    res.status(200).send(events);
}));
