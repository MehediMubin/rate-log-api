

class Storage {
  constructor() {
    this.rateLimits = new Map();
  }

  getRateLimitData(ip) {
    return this.rateLimits.get(ip) || [];
  }

  setRateLimitData(ip, timestamps) {
    this.rateLimits.set(ip, timestamps);
  }
}

const storage = new Storage();

export default storage;