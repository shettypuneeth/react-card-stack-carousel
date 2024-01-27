import path from "path";
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            include: "**/*.jsx",
        }),
    ],
    resolve: {
        alias: {
            "react-card-stack-carousel": path.resolve(__dirname, "../"),
        },
    },
});
