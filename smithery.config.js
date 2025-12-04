export default {
  esbuild: {
    format: "esm",
    target: "node18",
    platform: "node",
    external: [
      "fs",
      "path",
      "child_process",
      "os",
      "url"
    ],
    minify: false,
    sourcemap: true,
  },
};