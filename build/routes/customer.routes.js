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
const customer_1 = require("../views/customer");
const client_1 = require("@prisma/client");
const customer_router = (0, express_1.Router)();
//Get all customers
customer_router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customers = yield (0, customer_1.getCustomers)();
    res.send(customers);
}));
//Add new Customer
customer_router.post('/addClient', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = req.body;
    try {
        yield (0, customer_1.addCustomer)(Object.assign({}, customer));
        res.status(200).send(customer);
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
//Delete a customer
customer_router.delete('/delCustomer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer_id = req.body.id;
    try {
        const deleted_Customer = yield (0, customer_1.delCustomer)(customer_id);
        res.status(200).send(deleted_Customer);
    }
    catch (e) {
        if (e instanceof Error) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                e.code === "P2025" && res.status(400).send({
                    error: "Not id found"
                });
            }
            else {
                res.status(400).send(e);
            }
        }
    }
}));
//Edit a customer
customer_router.put('/editCustomer', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, edit_Values } = req.body;
    try {
        yield (0, customer_1.editCustomer)(id, edit_Values);
        res.status(200).send("Customer updated successfully!");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
//Edit customer's team
customer_router.put('/editTeam', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, selectedTeam } = req.body;
    try {
        yield (0, customer_1.editCustomerTeam)(id, selectedTeam);
        res.status(200).send("Customer team updated successfully!");
    }
    catch (e) {
        if (e instanceof Error || e instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            res.status(400).send(e);
        }
    }
}));
exports.default = customer_router;
