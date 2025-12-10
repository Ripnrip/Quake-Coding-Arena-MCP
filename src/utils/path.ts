import * as fs from "fs";
import * as path from "path";

// 🌟 Path Resolution Helper - Enhanced for Smithery Cloud Deployment
export function getProjectRoot(): string {
    // Priority 1: Check CWD (works in local and most cloud environments)
    const cwdSounds = path.join(process.cwd(), 'sounds');
    if (fs.existsSync(cwdSounds)) {
        return process.cwd();
    }

    // Priority 2: Check __dirname (for bundled code)
    // In Smithery, code is bundled, so check relative to bundle location
    try {
        // If we are in .smithery/index.cjs, the root is one level up
        const dirnameSounds = path.join(__dirname, '..', 'sounds');
        if (fs.existsSync(dirnameSounds)) {
            return path.resolve(__dirname, '..');
        }
        
        // Try two levels up (in case of nested structure)
        const dirnameSounds2 = path.join(__dirname, '..', '..', 'sounds');
        if (fs.existsSync(dirnameSounds2)) {
            return path.resolve(__dirname, '..', '..');
        }
    } catch (e) {
        // Ignore error
    }

    // Priority 3: Check common Smithery deployment paths
    const smitheryPaths = [
        '/app',                    // Smithery default
        '/app/sounds',             // Direct sounds path
        path.join(process.cwd(), '..', 'sounds'),  // Parent directory
    ];

    for (const smitheryPath of smitheryPaths) {
        if (fs.existsSync(smitheryPath)) {
            // If it's a direct sounds path, go up one level
            if (smitheryPath.endsWith('sounds')) {
                return path.resolve(smitheryPath, '..');
            }
            // Check if sounds exists in this path
            const soundsInPath = path.join(smitheryPath, 'sounds');
            if (fs.existsSync(soundsInPath)) {
                return smitheryPath;
            }
        }
    }

    // Priority 4: Check if sounds is in package.json files (Smithery includes it)
    // In Smithery, files from package.json are copied to the deployment
    // Try checking if we're in a Smithery environment
    if (process.env.SMITHERY || process.env.PORT) {
        // Smithery environment - sounds should be in CWD or one level up
        const envPaths = [
            process.cwd(),
            path.join(process.cwd(), '..'),
            '/app',
        ];
        
        for (const envPath of envPaths) {
            const soundsPath = path.join(envPath, 'sounds');
            if (fs.existsSync(soundsPath)) {
                return envPath;
            }
        }
    }

    // Fallback to CWD (will throw error if sounds not found, which is expected)
    // Log diagnostic info in development
    if (process.env.NODE_ENV !== 'production') {
        console.log('🔍 Path resolution debug:', {
            cwd: process.cwd(),
            dirname: typeof __dirname !== 'undefined' ? __dirname : 'undefined',
            env: {
                SMITHERY: process.env.SMITHERY,
                PORT: process.env.PORT,
                NODE_ENV: process.env.NODE_ENV
            }
        });
    }
    
    return process.cwd();
}
