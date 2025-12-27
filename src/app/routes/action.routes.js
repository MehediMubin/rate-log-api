import express from "express";
import rateLimitMiddleware from "../middlewares/rateLimitMiddleware.js";

const router = express.Router();

// Though it should return 201 for creation, using 200 for simplicity (as it's not creating any resource)
router.post("/action", rateLimitMiddleware, (req, res) => {
   res.status(200).json({
      success: true,
      message: "Action performed successfully",
   });
});

export default router;
