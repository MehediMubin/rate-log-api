import express from "express";
import rateLimitMiddleware from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

router.post("/action", rateLimitMiddleware, (req, res) => {
   res.status(200).json({
      success: true,
      message: "Action performed successfully",
   });
});

export default router;
