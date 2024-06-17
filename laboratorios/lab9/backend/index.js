// backend/index.js
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import fibonacciRoute from './Fibonacci.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/fibonacci", fibonacciRoute);

app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
