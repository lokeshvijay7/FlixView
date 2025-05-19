import axois from 'axios';


export const getMovieDetails = async (url) => {
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + process.env.TMDB_API_KEY
    }
  };

  const response = await axois.get(url, options);

  if (response.status !== 200) {
    throw new Error('Failed to fetch data from TMDB API');
  }
  

  const data = await response.data;
  return data;

}