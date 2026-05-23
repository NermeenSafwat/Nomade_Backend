import express from 'express';
import { config } from 'dotenv';

const app = express();

app.use(express.json());