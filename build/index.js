"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const customer_routes_1 = __importDefault(require("./routes/customer.routes"));
const team_routes_1 = __importDefault(require("./routes/team.routes"));
const auth_routes_1 = require("./routes/auth.routes");
const calendar_routes_1 = require("./routes/calendar.routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors_options = {
    origin: '*',
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(cors_options));
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.router);
app.use('/', calendar_routes_1.calendar_router);
app.use('/customer', customer_routes_1.default);
app.use('/team', team_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
