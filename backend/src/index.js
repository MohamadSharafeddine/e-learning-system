import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './database/connection.js';
import userRoutes from './routes/users.routes.js';
import courseRoutes from './routes/courses.routes.js';
import fileRoutes from './routes/files.routes.js';
import withdrawalRoutes from './routes/withdrawals.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';  

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 

connectToDatabase();

app.use('/api/users', userRoutes); 
app.use('/api/courses', courseRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/withdrawals', withdrawalRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/test', (req, res) => {
  res.send('API is working');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
