// Thin wrapper around the /api/brews JSON API.
// Every function throws an Error with a readable message on failure so
// components can catch it and show something useful to the user.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function handleResponse(res) {
  if (res.status === 204) return null;
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const message = data?.details || data?.error || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return data;
}

export async function fetchBrews(method) {
  const url = method ? `${API_URL}/brews?method=${encodeURIComponent(method)}` : `${API_URL}/brews`;
  const res = await fetch(url);
  return handleResponse(res);
}

export async function createBrew(brew) {
  const res = await fetch(`${API_URL}/brews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brew),
  });
  return handleResponse(res);
}

export async function updateBrew(id, brew) {
  const res = await fetch(`${API_URL}/brews/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brew),
  });
  return handleResponse(res);
}

export async function deleteBrew(id) {
  const res = await fetch(`${API_URL}/brews/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}
