export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const capitalize = (str) => {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

const API_URL = "http://localhost:3002/api";

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return res.json();
};

export const addUser = async (user) => {
  await fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export const removeUser = async (id) => {
  await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
};

export const fetchServers = async () => {
  const res = await fetch(`${API_URL}/servers`);
  return res.json();
};

export const addServer = async (server) => {
  await fetch(`${API_URL}/servers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(server),
  });
};

export const updateServer = async (id, updates) => {
  await fetch(`${API_URL}/servers/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
};

export const removeServer = async (id) => {
  await fetch(`${API_URL}/servers/${id}`, {
    method: "DELETE",
  });
};

export const fetchLogs = async () => {
  const res = await fetch(`${API_URL}/logs`);
  return res.json();
};

export const addLog = async (log) => {
  await fetch(`${API_URL}/logs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(log),
  });
};

export const updateLog = async (id, updates) => {
  await fetch(`${API_URL}/logs/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
};

export const removeLog = async (id) => {
  await fetch(`${API_URL}/logs/${id}`, {
    method: "DELETE",
  });
};
