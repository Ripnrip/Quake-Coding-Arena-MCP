#!/usr/bin/env node

/**
 * Smithery Cloud Deployment Entry Point
 *
 * This file is the entry point when deployed on Smithery.
 * It wraps the Express app and starts the HTTP server on the PORT environment variable.
 * Also adds HTTP endpoints for streaming audio files to MCP clients.
 */

import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import app from "./index.ts";
import { configSchema } from "./index.ts";
import { zodToJsonSchema } from "zod-to-json-schema";

// Helper to get project root
function getProjectRoot() {
    // In CommonJS build, __dirname is available
    if (typeof __dirname !== "undefined") {
        return path.resolve(__dirname, "../");
    }
    // Fallback for ES modules (not used in this build)
    return process.cwd();
}

const port = process.env.PORT || 3000;

// Add the config schema to the app for Smithery
(app as any).smitheryConfigSchema = configSchema;

// Add audio streaming endpoints before starting the server
app.get('/sounds/:voicePack/:filename', (req: any, res: any) => {
    const { voicePack, filename } = req.params;
    const projectRoot = getProjectRoot();
    const soundPath = path.join(projectRoot, 'sounds', voicePack, filename);

    // Security: Only allow accessing files in sounds directory
    const normalizedPath = path.normalize(soundPath);
    const soundsDir = path.normalize(path.join(projectRoot, 'sounds'));

    if (!normalizedPath.startsWith(soundsDir)) {
        res.status(403).json({ error: 'Access denied' });
        return;
    }

    // Check if file exists
    if (!fs.existsSync(normalizedPath)) {
        // Try alternative extensions
        const baseName = filename.replace(/\.(wav|mp3)$/i, '');
        const altPaths = [
            path.join(projectRoot, 'sounds', voicePack, `${baseName}.wav`),
            path.join(projectRoot, 'sounds', voicePack, `${baseName}.mp3`),
            path.join(projectRoot, 'sounds', 'male', `${baseName}.wav`),
            path.join(projectRoot, 'sounds', 'male', `${baseName}.mp3`)
        ];

        let foundPath = null;
        for (const altPath of altPaths) {
            if (fs.existsSync(altPath)) {
                foundPath = altPath;
                break;
            }
        }

        if (!foundPath) {
            res.status(404).json({ error: 'Sound file not found' });
            return;
        }
        // Use the found file
        return sendSoundFile(foundPath, res);
    }

    sendSoundFile(normalizedPath, res);
});

function sendSoundFile(filePath: string, res: any) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = ext === '.wav' ? 'audio/wav' : 'audio/mpeg';

    res.setHeader('Content-Type', mimeType);
    res.setHeader('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('error', (err) => {
        console.error('Error streaming sound file:', err);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error streaming file' });
        }
    });

    fileStream.pipe(res);
}

// List available sounds endpoint
app.get('/sounds', (_req: any, res: any) => {
    const projectRoot = getProjectRoot();
    const soundsDir = path.join(projectRoot, 'sounds');

    if (!fs.existsSync(soundsDir)) {
        res.status(404).json({ error: 'Sounds directory not found' });
        return;
    }

    const soundFiles: any[] = [];

    function scanDirectory(dir: string, voicePack: string) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                scanDirectory(filePath, file);
            } else if (/\.(wav|mp3)$/i.test(file)) {
                soundFiles.push({
                    voicePack,
                    filename: file,
                    url: `/sounds/${voicePack}/${file}`,
                    size: stat.size
                });
            }
        }
    }

    const voicePacks = fs.readdirSync(soundsDir);
    for (const voicePack of voicePacks) {
        const voicePackDir = path.join(soundsDir, voicePack);
        if (fs.statSync(voicePackDir).isDirectory()) {
            scanDirectory(voicePackDir, voicePack);
        }
    }

    res.json({ sounds: soundFiles });
});

// Start the HTTP server
const server = http.createServer(app);
server.listen(port, () => {
    console.log(`🎮 Quake Coding Arena MCP Server running on port ${port}`);
    console.log(`📍 MCP endpoint: http://localhost:${port}/mcp`);
    console.log(`📋 Config endpoint: http://localhost:${port}/.well-known/mcp-config`);
    console.log(`🎵 Audio streaming endpoint: http://localhost:${port}/sounds/:voicePack/:filename`);
    console.log(`📊 List all sounds: http://localhost:${port}/sounds`);
});