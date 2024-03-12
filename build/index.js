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
const login_user_1 = require("./middleware/login-user");
dotenv_1.default.config();
const app = (0, express_1.default)();
const cors_options = {
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'https://dannyhh.netlify.app'
        ];
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }
        if (!origin) {
            return callback(null, true);
        }
        return callback(new Error('Not allowed by cors'));
    },
    optionsSuccessStatus: 200
};
app.disable('x-powered-by');
app.use((0, cors_1.default)(cors_options));
app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Headers', 'Content type, Authorization');
    next();
});
app.use(express_1.default.json());
app.use('/auth', auth_routes_1.router);
app.use('/calendar', login_user_1.isAuth, calendar_routes_1.calendar_router);
app.use('/customer', login_user_1.isAuth, customer_routes_1.default);
app.use('/team', login_user_1.isAuth, team_routes_1.default);
app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
