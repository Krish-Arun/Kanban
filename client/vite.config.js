import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// we wanna be able to point imports to --dirname for which we need ts:
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
