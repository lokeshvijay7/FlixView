import express from "express";
import { gettrendingmovie } from "../controller/movie.controller.js";
const Router = express.Router();

Router.get("/trending", gettrendingmovie);  



export default Router;