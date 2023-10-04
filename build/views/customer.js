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
exports.editCustomer = exports.delCustomer = exports.addCustomer = exports.getCustomers = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCustomers = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCustomers = yield prisma.customer.findMany();
    return allCustomers;
});
exports.getCustomers = getCustomers;
const addCustomer = (customer) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address, locality, frequency, hour, dweek, no_week, category, price, created } = customer;
    yield prisma.customer.create({
        data: {
            name: name,
            phone: phone,
            address: address,
            locality: locality,
            frequency: frequency,
            hour: hour,
            dweek: dweek,
            no_week: no_week,
            category: category,
            price: price,
            created: created
        }
    });
});
exports.addCustomer = addCustomer;
const delCustomer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const delCustomer = yield prisma.customer.delete({
        where: {
            id: id
        }
    });
    return delCustomer;
});
exports.delCustomer = delCustomer;
const editCustomer = (id, editingValues) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.customer.update({
        where: { id: id },
        data: Object.assign({}, editingValues)
    });
});
exports.editCustomer = editCustomer;
