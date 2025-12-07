#!/usr/bin/env node

/**
 * Smithery Cloud Deployment Entry Point
 *
 * This file is the entry point when deployed on Smithery.
 * It wraps the Express app and starts the HTTP server on the PORT environment variable.
 */

import http from "http";
import app from "./index.ts";
import { configSchema } from "./index.ts";
import { zodToJsonSchema } from "zod-to-json-schema";

const port = process.env.PORT || 3000;

// Add the config schema to the app for Smithery
(app as any).smitheryConfigSchema = configSchema;

// Start the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`🎮 Quake Coding Arena MCP Server running on port ${port}`);
    console.log(`📍 MCP endpoint: http://localhost:${port}/mcp`);
    console.log(`📋 Config endpoint: http://localhost:${port}/.well-known/mcp-config`);
});