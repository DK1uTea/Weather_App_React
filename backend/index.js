import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import weather from './routers/weather.js';

dotenv.config();
const app= express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true, limit: '30mb'}));
app.use(cors());

app.use('/api/weather', weather);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});