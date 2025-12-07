export default {
  esbuild: {
    entryPoints: ["src/stateless-wrapper.ts"],
    bundle: true,
    platform: "node",
    target: "node18",
    format: "cjs",
    outfile: ".smithery/index.cjs",
    external: [
      "@modelcontextprotocol/sdk",
      "zod",
      "fs",
      "path",
      "child_process",
      "os",
      "url",
      "./sounds/**"  // Include sounds directory
    ],
    minify: false,
    sourcemap: true,
    allowOverwrite: true,
  },
};