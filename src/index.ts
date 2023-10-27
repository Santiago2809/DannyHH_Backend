import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import customer_router from './routes/customer.routes';
import team_router from './routes/team.routes';
import { router as auth_router } from './routes/auth.routes';
import { calendar_router } from './routes/calendar.routes';
dotenv.config();

const app = express();
const cors_options: cors.CorsOptions = {
    origin: (origin: any, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:5173',
            'https://dannyhh.netlify.app'
        ]
        if( ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true);
        }
        if(!origin){
            return callback(null, true);
        }

        return callback(new Error('Not allowed by cors'));
    },
    optionsSuccessStatus: 200
}
app.disable('x-powered-by');

app.use(cors(cors_options));
app.use(express.json());

app.use('/auth', auth_router)
app.use('/calendar', calendar_router)
app.use('/customer', customer_router );
app.use('/team', team_router )

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});