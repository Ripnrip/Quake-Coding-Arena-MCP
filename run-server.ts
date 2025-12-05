
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import createServer, { configSchema } from "./src/index.ts";

async function main() {
    const server = createServer({ config: undefined });
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Quake MCP Server running on stdio");
}

main().catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
});
