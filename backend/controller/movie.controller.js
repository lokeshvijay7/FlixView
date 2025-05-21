import { getTMDBMovieDetails } from "../services/moviedbservices.js";
export async function gettrendingmovie(req, res) {
  try {
    const data = await getTMDBMovieDetails('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
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
    const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
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
    if(error.message.includes(404)){
      return res.status(404).json({ message: "Movie not found" }).send(null);
    }
    console.log("Error in getmovietrailer :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

 export async function getmoviedetails(req, res) {
  try {
    const { id } = req.params;
    const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    res.json({
      success: true,
      content: data,
    });
    res.status(200).json({ message: "Movie details fetched successfully" });
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }

  }
  catch(error) {
    if(error.message.includes(404)){
      return res.status(404).json({ message: "Movie not found" }).send(null);
    }
    console.log("Error in getmoviedetails :" + error.message);
    return res.status(500).json({ message: "Internal server error" });

  }
 }

