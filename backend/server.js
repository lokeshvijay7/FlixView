import express from 'express';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRouter from './routes/tv.route.js';

import  connect_db  from './config/db.js';
const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/movie', movieRoutes);
app.use('/tv', tvRouter);


const port = process.env.PORT || 5000;

app.listen(port, () => {
  connect_db();
  console.log('Server is running at http://localhost:' + port);
});




const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + process.env.TMDB_API_KEY
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(err => console.error(err));