// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'; 

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log('Mongo URI:', process.env.MONGO_URI);
console.log('JWT Secret:', process.env.JWT_SECRET);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);

app.use(cors({
  origin: 'http://localhost:5174', 
}));


app.get('/dashboard', (req, res) => {
  res.send('You are in the dashboard');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
