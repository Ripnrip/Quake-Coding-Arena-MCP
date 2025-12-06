import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { ListResourcesRequestSchema, ReadResourceRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs";
import * as path from "path";
import { VOICE_PACKS } from "../utils/types.js";
import { getProjectRoot } from "../utils/path.js";

export function registerSoundResources(server: Server) {
    // 📚 Resources Implementation
    server.setRequestHandler(ListResourcesRequestSchema, async () => {
        const projectRoot = getProjectRoot();
        const resources = [];

        // Male sounds
        const malePath = path.join(projectRoot, VOICE_PACKS.male.path);
        if (fs.existsSync(malePath)) {
            const files = fs.readdirSync(malePath).filter(f => f.endsWith('.mp3') || f.endsWith('.wav'));
            files.forEach(file => {
                resources.push({
                    uri: `quake://${VOICE_PACKS.male.path}/${file}`,
                    name: `Male Voice: ${file.replace(/\.(mp3|wav)/, '')}`,
                    mimeType: file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav',
                    description: `Male announcer sound for ${file}`
                });
            });
        }

        // Female sounds
        const femalePath = path.join(projectRoot, VOICE_PACKS.female.path);
        if (fs.existsSync(femalePath)) {
            const files = fs.readdirSync(femalePath).filter(f => f.endsWith('.mp3') || f.endsWith('.wav'));
            files.forEach(file => {
                resources.push({
                    uri: `quake://${VOICE_PACKS.female.path}/${file}`,
                    name: `Female Voice: ${file.replace(/\.(mp3|wav)/, '')}`,
                    mimeType: file.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav',
                    description: `Female announcer sound for ${file}`
                });
            });
        }

        return {
            resources
        };
    });

    server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
        const uri = request.params.uri;
        const projectRoot = getProjectRoot();

        // Parse URI quake://path/to/file
        if (!uri.startsWith('quake://')) {
            throw new Error('Invalid resource URI');
        }

        const relativePath = uri.replace('quake://', '');
        const fullPath = path.join(projectRoot, relativePath);

        if (!fs.existsSync(fullPath)) {
            throw new Error(`Resource not found: ${uri}`);
        }

        const content = fs.readFileSync(fullPath);
        const mimeType = fullPath.endsWith('.mp3') ? 'audio/mpeg' : 'audio/wav';

        return {
            contents: [{
                uri,
                mimeType,
                blob: content.toString('base64')
            }]
        };
    });
}
