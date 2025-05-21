import express from 'express';
const router = express.Router();

router.get("/trending", gettrendingtv);  
router.get("/:id/trailer", gettvtrailer);
router.get("/:id/details", gettvdetails);
router.get("/:id/similarmovies", getsimilartv);
router.get("/:category", gettvcategory);


export default router;