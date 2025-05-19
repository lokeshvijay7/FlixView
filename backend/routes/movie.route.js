import express from "express";
import { gettrendingmovie, getmovietrailer } from "../controller/movie.controller.js";
const Router = express.Router();

Router.get("/trending", gettrendingmovie);  
Router.get("/:id/trailer", getmovietrailer);


export default Router;