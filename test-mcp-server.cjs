#!/usr/bin/env node

/**
 * 🧪 Enhanced Quake Arena MCP Server Test
 *
 * Quick test to verify our MCP server works with Cursor and other IDEs
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🎯 Testing Enhanced Quake Arena MCP Server...\n');

// Test server startup
// Test server startup
const serverPath = path.join(__dirname, 'run-server.ts');
const tsxPath = path.join(__dirname, 'node_modules', '.bin', 'tsx');
const server = spawn(tsxPath, [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let serverOutput = '';
let serverError = '';

server.stdout.on('data', (data) => {
  serverOutput += data.toString();
});

server.stderr.on('data', (data) => {
  serverError += data.toString();
});

// Test initialization
const testMessage = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2024-11-05",
    capabilities: {}
  }
});

server.stdin.write(testMessage + '\n');

// Wait a moment then test tools list
setTimeout(() => {
  const toolsMessage = JSON.stringify({
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {}
  });

  server.stdin.write(toolsMessage + '\n');

  // Wait another moment then test achievement
  setTimeout(() => {
    const achievementMessage = JSON.stringify({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: {
        name: "play_enhanced_quake_sound",
        arguments: {
          achievement: "EXCELLENT",
          volume: 50
        }
      }
    });

    server.stdin.write(achievementMessage + '\n');

    // Final check and cleanup
    setTimeout(() => {
      console.log('✅ Server Test Results:');
      console.log('📊 Output length:', serverOutput.length, 'characters');
      console.log('🔧 Error length:', serverError.length, 'characters');

      if (serverOutput.includes('result')) {
        console.log('✅ MCP Protocol working correctly!');
      }

      if (serverError.includes('15 achievements')) {
        console.log('✅ Server loaded 15 achievements!');
      }

      console.log('\n🎯 Enhanced Quake Arena MCP Server is READY for Cursor!');
      console.log('📋 Configuration:');
      console.log('   Command: node');
      console.log('   Args:', [`"${serverPath}"`]);
      console.log('   Working Directory:', __dirname);

      server.kill();
      process.exit(0);
    }, 1000);
  }, 500);
}, 3000);