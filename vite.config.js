import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👇 הוספת tailwindcss
import tailwindcss from "tailwindcss";
import postcss from "./postcss.config.cjs";

export default defineConfig({ base: "/my-react-project/", plugins: [react()] });
