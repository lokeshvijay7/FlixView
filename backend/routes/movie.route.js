import express from "express";
import { gettrendingmovie, getmovietrailer, getmoviedetails } from "../controller/movie.controller.js";
const Router = express.Router();

Router.get("/trending", gettrendingmovie);  
Router.get("/:id/trailer", getmovietrailer);
Router.get("/:id/details", getmoviedetails);


export default Router;