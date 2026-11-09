// API Client Configuration for GARVI Backend
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Authenticate college against PostgreSQL Supabase backend.
 * Passwords are sent over HTTPS and NEVER stored in the browser.
 */
export async function loginInstitution(username, password) {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    // Save JWT token in sessionStorage (or localStorage)
    if (data.token) {
      localStorage.setItem('garvi_auth_token', data.token);
    }

    return data.institution;
  } catch (err) {
    throw err;
  }
}

/**
 * Fetch full institution details and Recharts metrics from backend
 */
export async function fetchInstitutionByUid(uid) {
  try {
    const res = await fetch(`${API_BASE_URL}/institutions/${uid}`);
    if (!res.ok) {
      throw new Error('Failed to fetch institution metrics');
    }
    return await res.json();
  } catch (err) {
    throw err;
  }
}

/**
 * Fetch public list of colleges (no passwords exposed)
 */
export async function fetchInstitutionsList() {
  try {
    const res = await fetch(`${API_BASE_URL}/institutions`);
    if (!res.ok) throw new Error('Failed to fetch colleges list');
    return await res.json();
  } catch (err) {
    throw err;
  }
}

