import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		server: {
			proxy: {
				"/api": process.env.VITE_BACKEND_URL,
			},
			host: "0.0.0.0",
		},
		plugins: [react()],
	});
};
