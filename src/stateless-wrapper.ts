#!/usr/bin/env node

/**
 * Smithery Cloud Deployment Entry Point
 *
 * This file is the entry point when deployed on Smithery.
 * It wraps the Express app and starts the HTTP server on the PORT environment variable.
 * For stdio transport (local MCP), it uses the MCP server directly.
 */

import http from "http";
import { AddressInfo } from "net";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import app, { configSchema, createMcpServer } from "./index.ts";

// Add the config schema to the app for Smithery
(app as any).smitheryConfigSchema = configSchema;

// 🌟 Detect transport mode: stdio (for local MCP) or HTTP (for Smithery)
// When run via stdio, stdin/stdout are not TTY
const isStdioTransport = !process.stdin.isTTY && !process.stdout.isTTY;

// If using stdio transport (local MCP client), use stdio instead of HTTP
if (isStdioTransport) {
    // Create MCP server instance
    const { mcpServer } = createMcpServer({});
    
    // Create stdio transport
    const transport = new StdioServerTransport();
    
    // Connect McpServer to transport
    mcpServer.connect(transport);
    
    // No console output to avoid interfering with JSON-RPC on stdout
    // The server will handle all communication via stdio
} else {
    // HTTP transport mode (Smithery or dev server)
    // Continue with HTTP server setup below

// 🌟 Port Resolution with Conflict Handling
function findAvailablePort(startPort: number, maxAttempts: number = 10): Promise<number> {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        let currentPort = startPort;

        const tryPort = (port: number) => {
            const testServer = http.createServer();
            
            testServer.listen(port, () => {
                testServer.close(() => {
                    resolve(port);
                });
            });

            testServer.on('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    attempts++;
                    if (attempts >= maxAttempts) {
                        reject(new Error(`❌ Could not find available port after ${maxAttempts} attempts`));
                    } else {
                        currentPort++;
                        console.error(`⚠️  Port ${port} is in use, trying port ${currentPort}...`);
                        tryPort(currentPort);
                    }
                } else {
                    reject(err);
                }
            });
        };

        tryPort(currentPort);
    });
}

// 🎯 Start Server with Port Conflict Handling
async function startServer() {
    const defaultPort = parseInt(process.env.PORT || '3000', 10);
    const startPort = process.env.SMITHERY_DEV ? 8081 : defaultPort;

    try {
        // In development, automatically find available port
        if (process.env.SMITHERY_DEV || process.env.NODE_ENV !== 'production') {
            const availablePort = await findAvailablePort(startPort);
            
            const server = http.createServer(app);
            
            server.listen(availablePort, () => {
                const address = server.address() as AddressInfo;
                const actualPort = address?.port || availablePort;
                
                // Use stderr for logs to avoid interfering with MCP JSON-RPC on stdout
                console.error(`🎮 Quake Coding Arena MCP Server running on port ${actualPort}`);
                if (actualPort !== startPort) {
                    console.error(`   ⚠️  Port ${startPort} was in use, automatically switched to port ${actualPort}`);
                    console.error(`   💡 To use a specific port, set PORT environment variable: PORT=${actualPort}`);
                }
                console.error(`📍 MCP endpoint: http://localhost:${actualPort}/mcp`);
                console.error(`📋 Config endpoint: http://localhost:${actualPort}/.well-known/mcp-config`);
            });

            server.on('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    console.error(`❌ Port ${availablePort} became unavailable after binding.`);
                    console.error(`   Please free the port or set a different PORT environment variable.`);
                    process.exit(1);
                } else {
                    console.error('❌ Server error:', err);
                    process.exit(1);
                }
            });
        } else {
            // Production: use PORT env var directly
            const port = defaultPort;
            const server = http.createServer(app);
            
            server.listen(port, () => {
                // Use stderr for logs to avoid interfering with MCP JSON-RPC on stdout
                console.error(`🎮 Quake Coding Arena MCP Server running on port ${port}`);
                console.error(`📍 MCP endpoint: http://localhost:${port}/mcp`);
                console.error(`📋 Config endpoint: http://localhost:${port}/.well-known/mcp-config`);
            });

            server.on('error', (err: NodeJS.ErrnoException) => {
                if (err.code === 'EADDRINUSE') {
                    console.error(`❌ Port ${port} is in use. Please set a different PORT environment variable.`);
                    process.exit(1);
                } else {
                    console.error('❌ Server error:', err);
                    process.exit(1);
                }
            });
        }
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

    startServer();
}