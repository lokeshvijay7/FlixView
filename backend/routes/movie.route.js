import express from "express";
import { gettrendingmovie, getmovietrailer, getmoviedetails, getsimilarmovies } from "../controller/movie.controller.js";
const Router = express.Router();

Router.get("/trending", gettrendingmovie);  
Router.get("/:id/trailer", getmovietrailer);
Router.get("/:id/details", getmoviedetails);
Router.get("/:id/similarmovies", getsimilarmovies);


export default Router;