import React, { useState, useEffect } from "react";
import { Card, Badge } from "@monorepo/ui-components";
import {
  capitalize,
  formatDate,
  fetchServers,
  fetchUsers,
} from "@monorepo/utils";

// --- Feature 1: System Analytics Overview ---
export const SystemAnalytics = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      const users = await fetchUsers();
      const activeUsers = users.filter(
        (user) => user.status === "Active",
      ).length;
      setMetrics({
        activeUsers,
        serverUptime: "99.9%",
        revenue: "$12,450",
        lastUpdated: new Date().toISOString(),
      });
    };

    loadMetrics();
  }, []);

  return (
    <div style={{ marginBottom: "32px" }}>
      <h2 style={{ color: "#0f172a", marginTop: 0 }}>
        {capitalize("system analytics")}
      </h2>
      {metrics ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
          }}
        >
          <Card title="Active Users" style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#2563eb" }}
            >
              {metrics.activeUsers}
            </div>
          </Card>
          <Card title="Revenue" style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#10b981" }}
            >
              {metrics.revenue}
            </div>
          </Card>
          <Card title="Avg Server Uptime" style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#8b5cf6" }}
            >
              {metrics.serverUptime}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#64748b", marginTop: "8px" }}
            >
              As of {formatDate(metrics.lastUpdated)}
            </div>
          </Card>
        </div>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
};

// --- Feature 2: Server Status Monitor ---
export const ServerStatus = () => {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    fetchServers().then(setServers);
  }, []);

  return (
    <div>
      <h2 style={{ color: "#0f172a" }}>{capitalize("server nodes")}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {servers.map((server) => (
          <Card key={server.id} style={{ padding: "15px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontWeight: "500" }}>{server.name}</div>
              <div style={{ color: "#64748b", fontSize: "0.9rem" }}>
                Uptime: {server.uptime}
              </div>
              <Badge>{server.status}</Badge>
            </div>
          </Card>
        ))}
        {servers.length === 0 && <p>Loading servers...</p>}
      </div>
    </div>
  );
};
