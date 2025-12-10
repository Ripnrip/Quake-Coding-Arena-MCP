#!/usr/bin/env node

/**
 * Test script to invoke MCP server and play a sound
 */

const { spawn } = require('child_process');

// Start the MCP server
const server = spawn('node', ['.smithery/index.cjs'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: __dirname
});

// MCP JSON-RPC request to play a sound
const request = {
    jsonrpc: "2.0",
    id: 1,
    method: "tools/call",
    params: {
        name: "play_enhanced_quake_sound",
        arguments: {
            achievement: "FIRST BLOOD",
            volume: 80
        }
    }
};

// Send request after a short delay
setTimeout(() => {
    console.log('Sending MCP request to play FIRST BLOOD...');
    server.stdin.write(JSON.stringify(request) + '\n');
    
    // Listen for response
    server.stdout.on('data', (data) => {
        try {
            const response = JSON.parse(data.toString());
            console.log('Response:', JSON.stringify(response, null, 2));
        } catch (e) {
            console.log('Output:', data.toString());
        }
    });
    
    server.stderr.on('data', (data) => {
        console.error('Stderr:', data.toString());
    });
    
    // Cleanup after 3 seconds
    setTimeout(() => {
        server.kill();
        process.exit(0);
    }, 3000);
}, 1000);

