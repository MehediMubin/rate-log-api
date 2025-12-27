const rateLimitMiddleware = (req, res, next) => {
   const ip = req.ip;

   const isAllowed = false;

   if (isAllowed) {
      next();
   } else {
      res.status(429).json({
         success: false,
         message:
            "You have exceeded the maximum number of requests (10 per minute). Please try again later.",
      });
   }
};

export default rateLimitMiddleware;
