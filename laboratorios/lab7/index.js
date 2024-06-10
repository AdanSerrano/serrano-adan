import dotenv from 'dotenv';
import express from 'express';
import FibonacciRoute from './Fibonacci.js'; // Note the .js extension

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(express.json());

app.use("/fibonacci", FibonacciRoute);

// test api 
app.get('/test', async (req, res) => {
  try {
    res.status(200).json({ message: 'Hello World' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
