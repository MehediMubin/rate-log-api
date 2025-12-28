import rateLimiter from '../src/app/services/rateLimiter.js';
import storage from '../src/app/services/storage.js';

describe("Test rateLimiter.checkLimit", () => {
  const testIP = "123.456.789.000";

  beforeEach(() => {
    storage.setRateLimitData(testIP, []);
  });

  it("should allow requests under the limit", () => {
    for (let i = 0; i < 10; i++) {
      expect(rateLimiter.checkLimit(testIP)).toBe(true);
    }
  });

  it("should block requests over the limit", () => {
    for (let i = 0; i < 10; i++) {
      rateLimiter.checkLimit(testIP);
    }
    expect(rateLimiter.checkLimit(testIP)).toBe(false);
  });
})