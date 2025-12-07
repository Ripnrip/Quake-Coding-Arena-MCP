
#!/usr/bin/env node

/**
 * Entry point for local development with stdio transport
 * For Smithery cloud deployment, src/index.ts exports the Express app directly
 */

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { enhancedStats } from "./src/utils/types.js";
import { registerAchievementTools } from "./src/tools/achievements.js";
import { registerSettingsTools } from "./src/tools/settings.js";
import { registerStatsTools } from "./src/tools/stats.js";
import { registerSoundResources } from "./src/resources/sounds.js";
import { registerEncouragementPrompts } from "./src/prompts/encouragement.js";

async function main() {
    const server = new McpServer({
        name: "Enhanced Quake Coding Arena",
        version: "2.2.0",
    }, {
        capabilities: {
            tools: {},
            resources: {},
            prompts: {},
        }
    });

    // Register all tools
    registerAchievementTools(server);
    registerSettingsTools(server);
    registerStatsTools(server);

    // Register resources
    registerSoundResources(server.server);

    // Register prompts
    registerEncouragementPrompts(server.server);

    const transport = new StdioServerTransport();
    await server.server.connect(transport);
    console.error("Quake MCP Server running on stdio");
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
