/*
   NOTE: In a production environment with multiple server instances,
   this Map (rateLimits) would be replaced by a distributed store like Redis
   to ensure rate limits are shared across all servers.
*/

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";


class Storage {
   constructor() {
      this.rateLimits = new Map();

      
      // audit log file path setup
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      // Going up three levels -> from /src/app/services to project root
      const projectRoot = path.join(__dirname, "../../../");
      this.auditLogPath = path.join(projectRoot, "logs/audit.log");
   }

   getRateLimitData(ip) {
      return this.rateLimits.get(ip) || [];
   }

   setRateLimitData(ip, timestamps) {
      this.rateLimits.set(ip, timestamps);
   }

   addAuditLog(log) {
      const logEntry = JSON.stringify(log) + "\n";

      fs.appendFile(this.auditLogPath, logEntry, (err) => {
         if (err) {
            console.error("Failed to write audit log:", err);
         }
      });
      console.log("New Audit Log:", log);
   }
}

const storage = new Storage();

export default storage;
