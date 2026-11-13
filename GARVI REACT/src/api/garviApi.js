// API Client Configuration for GARVI Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// In-memory cache for GET requests to optimize API response times & bandwidth
const apiCache = new Map();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchWithCache(url) {
  const now = Date.now();
  if (apiCache.has(url)) {
    const cached = apiCache.get(url);
    if (now - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
    apiCache.delete(url);
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }
  const data = await res.json();
  apiCache.set(url, { timestamp: now, data });
  return data;
}

/**
 * Authenticate college against PostgreSQL Supabase backend.
 * Passwords are sent over HTTPS and NEVER stored in the browser.
 */
export async function loginInstitution(username, password) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || 'Authentication failed');
  }

  // Save JWT token and role in localStorage
  if (data.token) {
    localStorage.setItem('garvi_auth_token', data.token);
  }
  if (data.role) {
    localStorage.setItem('garvi_user_role', data.role);
  }

  return { ...data.institution, role: data.role || data.institution?.role || 'college' };
}

/**
 * Fetch full institution details and Recharts metrics from backend (with caching)
 */
export async function fetchInstitutionByUid(uid) {
  return await fetchWithCache(`${API_BASE_URL}/institutions/${uid}`);
}

/**
 * Fetch public list of colleges (no passwords exposed, with caching)
 */
export async function fetchInstitutionsList() {
  return await fetchWithCache(`${API_BASE_URL}/institutions`);
}

