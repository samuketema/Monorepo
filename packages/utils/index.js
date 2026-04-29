export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

const API_URL = 'http://localhost:3002/api';

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const addUser = async (user) => {
  await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
};

export const removeUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE'
  });
};

export const fetchServers = async () => {
  const res = await fetch(`${API_URL}/servers`);
  return res.json();
};

export const fetchLogs = async () => {
  const res = await fetch(`${API_URL}/logs`);
  return res.json();
};