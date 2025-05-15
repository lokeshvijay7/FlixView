import express from 'express';
import authRoutes from './routes/auth.route.js';
import  connect_db  from './config/db.js';
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect_db();
  console.log('Server is running at http://localhost:' + port);
});
