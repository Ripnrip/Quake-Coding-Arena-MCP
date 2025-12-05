const fs = require('fs');
const path = require('path');

console.log('🧪 Testing Build Artifact (.smithery/index.cjs)...');

try {
    const buildPath = path.join(__dirname, '.smithery/index.cjs');
    if (!fs.existsSync(buildPath)) {
        console.error('❌ Build artifact not found:', buildPath);
        process.exit(1);
    }

    console.log('📦 Loading module...');
    const module = require(buildPath);

    if (!module.default) {
        console.error('❌ Default export not found in build artifact');
        console.log('Exports:', Object.keys(module));
        process.exit(1);
    }

    const createServer = module.default;
    console.log('✅ Module loaded successfully');

    console.log('🔧 Creating server instance...');
    // Mock config
    const server = createServer({ config: { volume: 50, voiceGender: 'male' } });

    if (!server) {
        console.error('❌ Server instance is null/undefined');
        process.exit(1);
    }

    console.log('✅ Server instance created');
    console.log('Server info:', server.name, server.version);

    // Verify capabilities if possible (private property usually)
    // But just getting here means imports worked!

    console.log('🎉 Build verification PASSED!');
    process.exit(0);

} catch (error) {
    console.error('❌ Verification FAILED:', error);
    process.exit(1);
}
