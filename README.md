# API Rate Limiting & Audit Logging Assignment

This project implements a minimal backend API with IP-based rate limiting and request audit logging using Node.js and Express.

## Deliverables

1. **GitHub repository link**
2. **Working API**
3. **README.md** including:
   -  [How to run the project](#how-to-run-the-project)
   -  [Rate limiting rules](#rate-limiting-rules)
   -  [Storage choice and reasoning](#storage-choice--reasoning)
   -  [Any assumptions or tradeoffs made](#assumptions--tradeoffs)

## Features

-  **API Endpoint**: `POST /api/action`
-  **Rate Limiting**: Limits requests to 10 per minute per IP. Returns `429 Too Many Requests` when exceeded.
-  **Audit Logging**: Logs every request (IP, endpoint, timestamp, status) to a persistent file (`audit.log`) in NDJSON format.

## Project Structure

```
logs/
   └── audit.log                 # Persistent audit log file (NDJSON)
src/
├── app.js                      # Main app setup
├── server.js                   # Server entry point
├── app/
│   ├── config/                 # App configuration files
│   ├── middlewares/
│   │   └── rateLimitMiddleware.js  # Handles rate limiting checks and logging
│   ├── routes/
│   │   └── action.routes.js    # API route definitions
│   ├── services/
│   │   ├── auditLogger.js      # Service for logging requests
│   │   ├── rateLimiter.js      # Service for rate limit logic
│   │   └── storage.js          # In-memory data storage
```

## How to Run the Project

1. **Prerequisites**: Ensure Node.js is installed.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Start the Server**:
   ```bash
   npm run dev
   ```
   (Or `node src/server.js`)
4. **Test the Endpoint**:
   You can use `curl` or Postman.

   ```bash

   curl -X POST http://localhost:3000/api/action
   ```

## Rate Limiting Rules

-  **Limit**: 10 requests per minute
-  **Scope**: Per IP address
-  **Behavior**:
   -  Requests within the limit return `200 OK`.
   -  Requests exceeding the limit return `429 Too Many Requests` with a JSON error message.

**Note:**
For this assignment, I implemented the rate limiting logic manually (instead of using the `express-rate-limit` package) to clearly demonstrate my understanding of backend concepts such as rate limiting algorithms, middleware design, and request auditing, as required by the task brief.

**Sliding Window Algorithm:**
This project uses the sliding window rate limiting algorithm. For each IP address, the server keeps track of the timestamps of recent requests. On each new request, it removes timestamps older than the current time window (e.g., 60 seconds), then checks if the number of requests in the window exceeds the allowed limit. This approach provides a fair and accurate way to enforce rate limits over a moving time window, rather than resetting at fixed intervals.

## Storage Choice & Reasoning

**Choice**: In-Memory Storage (JavaScript `Map`) for rate limiting, and persistent file storage (`audit.log`) for audit logs.

**Reasoning**:

-  **Simplicity**: Keeps the project self-contained and easy to run without external dependencies like Redis or a database.
-  **Performance**: In-memory operations are extremely fast for rate limiting in a simple demonstration.
-  **Persistence**: Audit logs are written to a file, ensuring they are not lost on server restart.

**Best Practice:**
The `Storage` class is exported as a singleton. This ensures that only one instance of the storage exists and is shared across the entire application, preventing accidental creation of multiple, inconsistent storage objects.

## Assumptions & Tradeoffs

-  The application runs on a single instance (not clustered).
-  `req.ip` is sufficient for identifying clients (trust proxy settings may need adjustment in a real deployment behind a load balancer).
-  **Persistence**: Rate limit data is lost when the server restarts. In a production environment, this would be replaced by a distributed store like Redis to handle persistence and scaling across multiple server instances.
-  **Scalability**: In-memory storage is not suitable for clustered/multi-instance deployments.

## Audit Log File Format & Efficiency

**Format**: Newline Delimited JSON (NDJSON)

-  Each audit log entry is written as a single line of JSON to the `audit.log` file (one object per line).
-  This approach is highly efficient: appending a line to a file is a constant-time operation, regardless of file size.
-  Unlike storing all logs in a single JSON array (which would require reading and rewriting the entire file for every new log), NDJSON allows the server to write logs quickly and reliably, even as the file grows large.
-  This method saves both time and system resources, and is robust against crashes (only the last line might be lost if interrupted).

**Example:**

```json
{"ip":"1.2.3.4","endpoint":"/api/action","timestamp":"2025-12-27T12:00:00.000Z","status":"allowed"}
{"ip":"5.6.7.8","endpoint":"/api/action","timestamp":"2025-12-27T12:01:00.000Z","status":"blocked"}
```
