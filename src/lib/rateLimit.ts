/**
 * Rate Limiting & Anti-Abuse Protection for API Endpoints.
 * 
 * Supports:
 * 1. Upstash Redis REST API (when UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN are set)
 * 2. In-memory sliding-window fallback for local development / single instance
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

// In-memory token store for local dev fallback
const ipRequestMap = new Map<string, { count: number; expiresAt: number }>();

export async function checkRateLimit(
  clientIp: string,
  config: RateLimitConfig = { maxRequests: 5, windowMs: 15 * 60 * 1000 }
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
  const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  // 1. Upstash Redis Serverless Path
  if (upstashUrl && upstashToken) {
    try {
      const key = `ratelimit:${clientIp}`;
      const now = Date.now();
      const windowSec = Math.ceil(config.windowMs / 1000);

      // Execute Redis INCR and EXPIRE pipeline via REST
      const res = await fetch(`${upstashUrl}/pipeline`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${upstashToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          ["INCR", key],
          ["EXPIRE", key, windowSec],
        ]),
      });

      if (res.ok) {
        const data = await res.json();
        const count = data[0]?.result || 1;
        if (count > config.maxRequests) {
          return {
            success: false,
            remaining: 0,
            reset: now + config.windowMs,
          };
        }
        return {
          success: true,
          remaining: Math.max(0, config.maxRequests - count),
          reset: now + config.windowMs,
        };
      }
    } catch (err) {
      console.warn("Upstash rate limit check error, falling back to local:", err);
    }
  }

  // 2. In-memory fallback
  const now = Date.now();
  const record = ipRequestMap.get(clientIp);

  if (!record || record.expiresAt < now) {
    ipRequestMap.set(clientIp, {
      count: 1,
      expiresAt: now + config.windowMs,
    });
    return {
      success: true,
      remaining: config.maxRequests - 1,
      reset: now + config.windowMs,
    };
  }

  if (record.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      reset: record.expiresAt,
    };
  }

  record.count += 1;
  return {
    success: true,
    remaining: config.maxRequests - record.count,
    reset: record.expiresAt,
  };
}

/**
 * Extracts client IP from standard Next.js request headers
 */
export function getClientIp(req: Request): string {
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }
  const xRealIp = req.headers.get("x-real-ip");
  if (xRealIp) {
    return xRealIp.trim();
  }
  return "127.0.0.1";
}
