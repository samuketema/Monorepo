import React, { useState, useEffect } from 'react';
import { Button, Card, Input, Badge } from '@monorepo/ui-components';
import { fetchUsers, addUser, removeUser, generateId, formatDate, capitalize, fetchLogs } from '@monorepo/utils';

// --- Feature 1: User Management Portal ---
export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState('');

    const refreshUsers = () => fetchUsers().then(setUsers);

    useEffect(() => {
        refreshUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!newUser.trim()) return;
        const user = {
            id: generateId(),
            name: newUser,
            role: 'User',
            status: 'Active',
            joined: new Date().toISOString()
        };
        await addUser(user);
        await refreshUsers();
        setNewUser('');
    };

    const handleDeleteUser = async (id) => {
        await removeUser(id);
        await refreshUsers();
    }

    return (
        <div style={{ marginBottom: '32px' }}>
            <h2 style={{ color: '#0f172a', marginTop: 0 }}>{capitalize("user management portal (database)")}</h2>
            
            <Card title="Invite New User" style={{ marginBottom: '20px' }}>
                <form onSubmit={handleAddUser} style={{ display: 'flex', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <Input 
                            placeholder="Enter user name..." 
                            value={newUser}
                            onChange={(e) => setNewUser(e.target.value)} 
                        />
                    </div>
                    <Button type="submit">Invite</Button>
                </form>
            </Card>

            <Card style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <tr>
                            <th style={{ padding: '12px 16px', color: '#475569' }}>Name</th>
                            <th style={{ padding: '12px 16px', color: '#475569' }}>Status</th>
                            <th style={{ padding: '12px 16px', color: '#475569' }}>Joined</th>
                            <th style={{ padding: '12px 16px', color: '#475569' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, idx) => (
                            <tr key={user.id} style={{ borderBottom: idx !== users.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                                <td style={{ padding: '12px 16px', fontWeight: '500' }}>{user.name}</td>
                                <td style={{ padding: '12px 16px' }}><Badge>{user.status}</Badge></td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{formatDate(user.joined)}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>Remove</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
};

// --- Feature 2: Activity Logs Viewer ---
export const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    
    useEffect(() => {
        const loadLogs = async () => {
          const l = await fetchLogs();
          setLogs(l);
        };
        loadLogs();
        
        // Polling to keep logs fresh and demonstrate live database!
        const interval = setInterval(loadLogs, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h2 style={{ color: '#0f172a' }}>{capitalize("live activity logs")}</h2>
            <Card>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {logs.map(log => (
                        <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #e2e8f0' }}>
                            <div>
                                <div style={{ fontWeight: '500' }}>{log.action}</div>
                                <div style={{ fontSize: '0.85rem', color: '#64748b' }}>by {log.user}</div>
                            </div>
                            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
                                {formatDate(log.timestamp)}
                            </div>
                        </div>
                    ))}
                    {logs.length === 0 && <p>Waiting for activity...</p>}
                </div>
            </Card>
        </div>
    );
};