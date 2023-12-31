import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
	server: {
		proxy: {
			"/api": "https://mahabazzar-backend.vercel.app",
		},
		host: "0.0.0.0",
	},
	plugins: [react()],
});
