const config = {
   port: process.env.PORT || 3000,
   rateLimitWindow: process.env.RATE_LIMIT_WINDOW || 60,
   rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS || 10,
};

export default config;
