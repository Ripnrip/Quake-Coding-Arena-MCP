import * as fs from "fs";
import * as path from "path";

// 🌟 Path Resolution Helper
export function getProjectRoot(): string {
    // Try to find 'sounds' directory starting from CWD
    if (fs.existsSync(path.join(process.cwd(), 'sounds'))) {
        return process.cwd();
    }

    // Try __dirname (standard CJS)
    // If we are in .smithery/index.cjs, the root is one level up
    try {
        if (fs.existsSync(path.join(__dirname, '..', 'sounds'))) {
            return path.resolve(__dirname, '..');
        }
    } catch (e) {
        // Ignore error
    }

    // Fallback to CWD
    return process.cwd();
}
