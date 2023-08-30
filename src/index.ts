import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customer_router from './routes/customer.routes';
import team_router from './routes/team.routes';
import { router as auth_router } from './routes/auth.routes';
dotenv.config();

const app = express();
const cors_options: cors.CorsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(cors_options));
app.use(express.json());


app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
app.use('/', auth_router)
app.use('/customer', customer_router );
app.use('/team', team_router )