// using the sliding window rate limiting algorithm. More on that in the documentation

import storage from "./storage.js";

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 10;

const rateLimiter = {
   checkLimit: (ip) => {
      const now = Date.now();
      const windowStart = now - WINDOW_SIZE_IN_SECONDS * 1000;

      let timestamps = storage.getRateLimitData(ip);
      timestamps = timestamps.filter((timestamp) => timestamp > windowStart);

      if (timestamps.length >= MAX_REQUESTS) {
         return false;
      }

      timestamps.push(now);
      storage.setRateLimitData(ip, timestamps);
      
      return true;
   },
};

export default rateLimiter;
