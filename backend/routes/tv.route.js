import express from 'express';
import { getsimilartv, gettrendingtv, gettvcategory, gettvdetails, gettvtrailer } from '../controller/tv.controller.js';
const router = express.Router();

router.get("/trending", gettrendingtv);  
router.get("/:id/trailer", gettvtrailer);
router.get("/:id/details", gettvdetails);
router.get("/:id/similarmovies", getsimilartv);
router.get("/:category", gettvcategory);


export default router;