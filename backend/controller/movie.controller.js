import { getMovieDetails } from "../services/moviedbservices.js";
export async function gettrendingmovie(req, res) {
  try {
    const data = await getMovieDetails('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    const randommovie = data.results[Math.floor(Math.random() * data.results?.length)];

  }
  catch (error) {
    console.log("Error in gettrendingmovie :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

