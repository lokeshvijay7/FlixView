import express from "express";
import { trendingmovie } from "../controller/movie.controller.js";
const Router = express.Router();

Router.get("/trending", gettrendingmovie);  



export default Router;