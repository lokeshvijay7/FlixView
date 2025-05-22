import { getTMDBMovieDetails } from "../services/moviedbservices.js";
export async function gettrendingtv(req, res) {
  try {
    const data = await getTMDBMovieDetails('https://api.themoviedb.org/3/trending/tv/day?language=en-US');
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    const randomtv = data.results[Math.floor(Math.random() * data.results?.length)];
    res.json({
      success: true,
      content: randomtv,
    });
  }
  catch (error) {
    console.log("Error in gettrendingtv :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function gettvtrailer (req, res) {
  try {
    const { id } = req.params;
    const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
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
      return res.status(404).json({ message: "tv not found" }).send(null);
    }
    console.log("Error in gettvtrailer :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
}

 export async function gettvdetails(req, res) {
  try {
    const { id } = req.params;
    const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3tve/${id}/videos?language=en-US`);
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    return res.status(200).json({
      success: true,
      content: data,
      message: "tv details fetched successfully"
    });
  }
  catch(error) {
    if(error.message.includes(404)){
      return res.status(404).json({ message: "tv not found" }).send(null);
    }
    console.log("Error in gettvdetails :" + error.message);
    return res.status(500).json({ message: "Internal server error" });

  }
 }



 export async function getsimilartv(req, res) {
  try {
    const { id } = req.params;
    const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
    if (!data) {
      return res.status(400).json({ message: "No data found" });
    }
    return res.status(200).json({
      success: true,
      similar: data.results,
      message: "Similar mtv fetched successfully"
    });
  } catch (error) {
    if(error.message.includes(404)){
      return res.status(404).json({ message: "tv not found" }).send(null);
    }
    console.log("Error in getsimilartvs :" + error.message);
    return res.status(500).json({ message: "Internal server error" });
    
  }
 }


  export async function gettvcategory(req, res) {
    try {
      const { category } = req.params;
      const data = await getTMDBMovieDetails(`https://api.themoviedb.org/3/tv/${category}?`);
      if (!data) {
        return res.status(400).json({ message: "No data found" });
      }
      return res.status(200).json({
        success: true,
        content: data,
        message: "tv category fetched successfully"
      });
      

    } catch (error) {
      console.log("Error in gettvcategory :" + error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }