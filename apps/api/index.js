import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

let db;

async function initializeDatabase() {
  db = await open({
    filename: path.join(__dirname, 'database.sqlite'),
    driver: sqlite3.Database
  });

  // Create tables
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT,
      role TEXT,
      status TEXT,
      joined TEXT
    );
    CREATE TABLE IF NOT EXISTS servers (
      id TEXT PRIMARY KEY,
      name TEXT,
      status TEXT,
      uptime TEXT
    );
    CREATE TABLE IF NOT EXISTS logs (
      id TEXT PRIMARY KEY,
      action TEXT,
      user TEXT,
      timestamp TEXT
    );
  `);

  // Seed data if empty
  const { count } = await db.get('SELECT COUNT(*) as count FROM users');
  if (count === 0) {
    const timestamp = new Date().toISOString();
    
    // Seed Users
    await db.run("INSERT INTO users VALUES ('u1', 'Alice Smith', 'Admin', 'Active', ?)", [timestamp]);
    await db.run("INSERT INTO users VALUES ('u2', 'Bob Jones', 'Editor', 'Inactive', ?)", [timestamp]);
    await db.run("INSERT INTO users VALUES ('u3', 'Charlie Brown', 'Viewer', 'Active', ?)", [timestamp]);
    
    // Seed Servers
    await db.run("INSERT INTO servers VALUES ('s1', 'us-east-1-api', 'Operational', '99.9%')");
    await db.run("INSERT INTO servers VALUES ('s2', 'us-east-1-db', 'Maintenance', '98.5%')");

    // Seed Logs
    await db.run("INSERT INTO logs VALUES ('l1', 'User Login', 'Alice Smith', ?)", [new Date(Date.now() - 3600000).toISOString()]);
    await db.run("INSERT INTO logs VALUES ('l2', 'Data Export', 'Bob Jones', ?)", [new Date(Date.now() - 7200000).toISOString()]);
    await db.run("INSERT INTO logs VALUES ('l3', 'System Boot', 'Admin System', ?)", [new Date(Date.now() - 86400000).toISOString()]);
  }
  
  console.log("Database initialized successfully.");
}

// routes: Users
app.get('/api/users', async (req, res) => {
  const users = await db.all('SELECT * FROM users ORDER BY joined DESC');
  res.json(users);
});

app.post('/api/users', async (req, res) => {
  const { id, name, role, status, joined } = req.body;
  await db.run('INSERT INTO users VALUES (?, ?, ?, ?, ?)', [id, name, role, status, joined]);
  
  // also add an audit log
  const logId = Math.random().toString(36).substr(2, 9);
  await db.run('INSERT INTO logs VALUES (?, ?, ?, ?)', [logId, 'User Invited: ' + name, 'Admin', new Date().toISOString()]);
  
  res.json({ success: true, id });
});

app.delete('/api/users/:id', async (req, res) => {
  await db.run('DELETE FROM users WHERE id = ?', [req.params.id]);
  
  // also log removal
  const logId = Math.random().toString(36).substr(2, 9);
  await db.run('INSERT INTO logs VALUES (?, ?, ?, ?)', [logId, 'User Removed', 'Admin', new Date().toISOString()]);
  
  res.json({ success: true });
});

// routes: Servers
app.get('/api/servers', async (req, res) => {
  const servers = await db.all('SELECT * FROM servers');
  res.json(servers);
});

// routes: Logs
app.get('/api/logs', async (req, res) => {
  const logs = await db.all('SELECT * FROM logs ORDER BY timestamp DESC LIMIT 5');
  res.json(logs);
});

initializeDatabase().then(() => {
  const PORT = 3002;
  app.listen(PORT, () => {
    console.log("API running on http://localhost:3002");
  });
}).catch(err => {
  console.error("Failed to start database:", err);
});