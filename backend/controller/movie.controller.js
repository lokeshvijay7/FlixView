import { getMovieDetails } from "../services/moviedbservices.js";
export async function gettrendingmovie(req, res) {
  try {
    const data = await getMovieDetails('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    const randommovie = data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({
      success: true,
      content: randommovie,
    });
  }
  catch (error) {
    console.log("Error in gettrendingmovie :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getmovietrailer (req, res) {
  try {
    const { id } = req.params;
    const data = await getMovieDetails(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    // const trailer = data.results.find((video) => video.type === "Trailer");

    res.json({
      success: true,
      trailer: data.results,
    });
  }
  catch (error) {
    console.log("Error in getmovietrailer :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

