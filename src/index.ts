import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import route_regtr from './router/regtr.router';
import route_auth from './router/auth.router';

import Conexiondb from "./utils/mongodb.connection";

dotenv.config({ path: path.resolve(__dirname, '../.env') });
Conexiondb()

const app = express();
const port = process.env.GATEWAY_PORT;

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);
app.use(
  express.json({
    limit: "35mb"
  })
);

app.use('/api/sessions', route_regtr);
app.use('/api/sessions', route_auth);

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing gracefully');
  process.exit(0);
});


app.listen(port, () => {
  console.log(`Gateway running on ${port}`);
});
