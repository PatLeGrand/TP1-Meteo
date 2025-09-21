const cache = new Map();

export function setCache(key, data, timeToLeave) {
  const expires = Date.now() + timeToLeave;
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
