const config = {
   port: process.env.PORT || 3000,
   dbUrl: process.env.DB_URL,
   jwtSecret: process.env.JWT_SECRET,
   rateLimitWindow: process.env.RATE_LIMIT_WINDOW || 60,
   rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS || 10,
};

export default config;
