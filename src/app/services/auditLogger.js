import storage from "./storage.js";


const auditLogger = {
  log: (ip, endpoint, status) => {
    const logEntry = {
      ip,
      endpoint,
      timestamp: new Date().toISOString(),
      status
    };

    storage.addAuditLog(logEntry);
  }
}

export default auditLogger;