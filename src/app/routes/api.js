import express from 'express';

const router = express.Router();

router.post('/action', (req, res) => {
  res.status(200).json({
    success: true,
    message: "Action performed successfully",
  })
})

export default router;