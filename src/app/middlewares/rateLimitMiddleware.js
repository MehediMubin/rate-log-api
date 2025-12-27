import auditLogger from "../services/auditLogger.js";
import rateLimiter from "../services/rateLimiter.js";

const rateLimitMiddleware = (req, res, next) => {
   const ip = req.ip;
   const endpoint = req.originalUrl;

   const isAllowed = rateLimiter.checkLimit(ip);

   if (isAllowed) {
      auditLogger.log(ip, endpoint, "allowed");
      next();
   } else {
      auditLogger.log(ip, endpoint, "blocked");
      res.status(429).json({
         success: false,
         message:
            "You have exceeded the maximum number of requests. Please try again later.",
      });
   }
};

export default rateLimitMiddleware;
