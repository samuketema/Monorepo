import React from 'react';
import { SystemAnalytics, ServerStatus } from '@monorepo/feature-x';
import { UserManagement, ActivityLogs } from '@monorepo/feature-y';
import './App.css';

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#0f172a', color: 'white', padding: '20px' }}>
        <h2 style={{ margin: '0 0 30px' }}>AdminOS</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', color: '#cbd5e1' }}>
          <div style={{ cursor: 'pointer', fontWeight: '500', color: 'white' }}>Dashboard (Config & Assembly)</div>
        </div>
      </div>
      
      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: '#f1f5f9', padding: '40px', overflowY: 'auto' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ color: '#0f172a', margin: '0 0 8px' }}>Global Dashboard</h1>
          <p style={{ color: '#64748b', marginBottom: '40px' }}>
            This application composes exactly 4 individual features from 2 monorepo packages.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Feature X components */}
            <div style={{ padding: '30px', backgroundColor: 'transparent', borderRadius: '12px', border: '2px dashed #94a3b8' }}>
              <h3 style={{ marginTop: 0, color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Mounted from @monorepo/feature-x</h3>
              <SystemAnalytics />  {/* Feature X - 1 */}
              <ServerStatus />     {/* Feature X - 2 */}
            </div>

            {/* Feature Y components */}
            <div style={{ padding: '30px', backgroundColor: 'transparent', borderRadius: '12px', border: '2px dashed #94a3b8' }}>
              <h3 style={{ marginTop: 0, color: '#64748b', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Mounted from @monorepo/feature-y</h3>
              <UserManagement />   {/* Feature Y - 1 */}
              <ActivityLogs />     {/* Feature Y - 2 */}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;