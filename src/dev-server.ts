#!/usr/bin/env node

/**
 * 🎭 Development Server with Port Conflict Handling
 *
 * Interactive development server that handles port conflicts gracefully
 */

import http from "http";
import { AddressInfo } from "net";
import readline from "readline";
import app from "./index.ts";
import { configSchema } from "./index.ts";

// Add the config schema to the app
(app as any).smitheryConfigSchema = configSchema;

// 🌟 Check if port is available
function isPortAvailable(port: number): Promise<boolean> {
    return new Promise((resolve) => {
        const testServer = http.createServer();
        
        testServer.listen(port, () => {
            testServer.close(() => {
                resolve(true);
            });
        });

        testServer.on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                resolve(false);
            } else {
                resolve(false);
            }
        });
    });
}

// 🎯 Ask user for port choice
function askForPort(rl: readline.Interface, defaultPort: number): Promise<number> {
    return new Promise((resolve) => {
        rl.question(
            `⚠️  Port ${defaultPort} is already in use.\n` +
            `   Enter a different port number (or press Enter to try ${defaultPort + 1}): `,
            (answer) => {
                const port = answer.trim() ? parseInt(answer.trim(), 10) : defaultPort + 1;
                if (isNaN(port) || port < 1024 || port > 65535) {
                    console.log(`⚠️  Invalid port. Using ${defaultPort + 1} instead.`);
                    resolve(defaultPort + 1);
                } else {
                    resolve(port);
                }
            }
        );
    });
}

// 🚀 Start server with interactive port selection
async function startDevServer() {
    const defaultPort = parseInt(process.env.PORT || '8081', 10);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        let port = defaultPort;
        const portAvailable = await isPortAvailable(port);

        if (!portAvailable) {
            console.log(`\n🔍 Port ${port} is already in use.`);
            port = await askForPort(rl, defaultPort);
            
            // Check if the chosen port is available
            while (!(await isPortAvailable(port))) {
                console.log(`⚠️  Port ${port} is also in use.`);
                port = await askForPort(rl, port);
            }
        }

        rl.close();

        const server = http.createServer(app);
        
        server.listen(port, () => {
            const address = server.address() as AddressInfo;
            const actualPort = address?.port || port;
            
            console.log(`\n🎮 ✨ Quake Coding Arena MCP Server starting!`);
            console.log(`📍 Running on port ${actualPort}`);
            console.log(`🌐 MCP endpoint: http://localhost:${actualPort}/mcp`);
            console.log(`📋 Config endpoint: http://localhost:${actualPort}/.well-known/mcp-config`);
            console.log(`\n💡 Press Ctrl+C to stop the server\n`);
        });

        server.on('error', (err: NodeJS.ErrnoException) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`\n❌ Port ${port} became unavailable. Please try a different port.`);
                console.error(`   Set PORT environment variable: PORT=8082 npm run dev`);
                process.exit(1);
            } else {
                console.error('❌ Server error:', err);
                process.exit(1);
            }
        });

        // Graceful shutdown
        process.on('SIGINT', () => {
            console.log('\n\n🛑 Shutting down server...');
            server.close(() => {
                console.log('✅ Server stopped');
                process.exit(0);
            });
        });

    } catch (error) {
        rl.close();
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

startDevServer();

