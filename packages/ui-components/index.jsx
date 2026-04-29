import React from 'react';

export const Button = ({ children, variant = 'primary', ...props }) => {
  const bg = variant === 'primary' ? '#0f172a' : '#ef4444';
  const color = 'white';
  return (
    <button 
      style={{ padding: '8px 16px', background: bg, color, border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}
      {...props}
    >
      {children}
    </button>
  );
};

export const Card = ({ title, children, style }) => {
  return (
    <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', ...style }}>
      {title && <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', color: '#1e293b' }}>{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

export const Input = (props) => (
  <input 
    style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', width: '100%', boxSizing: 'border-box' }}
    {...props}
  />
);

export const Badge = ({ children }) => (
  <span style={{ padding: '4px 8px', background: '#dbeafe', color: '#1e40af', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold' }}>
    {children}
  </span>
);
