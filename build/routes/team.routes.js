"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_router = (0, express_1.Router)();
team_router.get('/', (_req, res) => {
    res.send("Getting team");
});
exports.default = team_router;
