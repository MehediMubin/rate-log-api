import storage from "./storage.js";


const auditLogger = {
  log: (ip, endpoint, status) => {
    const logEntry = {
      ip,
      endpoint,
      timestamps: new Date().toISOString(),
      status
    };

    storage.addAuditLog(logEntry);
  }
}

export default auditLogger;