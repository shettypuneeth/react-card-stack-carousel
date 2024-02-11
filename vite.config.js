// generate vite config for react component prod build
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "./index.js",
            name: "react-card-stack-carousel",
            fileName: "index",
            formats: ["cjs"],
        },
        rollupOptions: {
            external: ["react"],
            output: {
                globals: {
                    react: "React",
                },
            },
        },
    },
});
