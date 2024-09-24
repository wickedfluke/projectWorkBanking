import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRouter from './api/routes';
import bodyParser from 'body-parser';
import { errorHandlers } from './errors';
import "./utils/auth/auth-handlers";

const app = express();
const path = require('path');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api', apiRouter);

app.use(errorHandlers);

export default app;