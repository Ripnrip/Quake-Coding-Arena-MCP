#!/usr/bin/env node

/**
 * Minimal MCP Server for Smithery testing
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Configuration schema
export const configSchema = z.object({
    volume: z.number().min(0).max(100).default(80).describe("Volume level"),
}).optional();

// Create server function - required by Smithery
export default function createServer({ config }: { config?: z.infer<typeof configSchema> }) {
    const server = new McpServer({
        name: "Minimal Test Server",
        version: "1.0.0",
    });

    // Single simple tool
    server.registerTool(
        "test_tool",
        {
            description: "A simple test tool",
            inputSchema: {
                message: z.string().describe("Test message"),
            }
        },
        async ({ message }) => {
            return {
                content: [{
                    type: "text",
                    text: `Received: ${message}`
                }]
            };
        }
    );

    return server.server;
}
