const cache = new Map();

export function setCache(key, data, ttlMs) {
  const expires = Date.now() + ttlMs;
  cache.set(key, { data, expires });
}

export function getCache(key) {
  const cached = cache.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expires) {
    cache.delete(key);
    return null;
  }
  return cached.data;
}
