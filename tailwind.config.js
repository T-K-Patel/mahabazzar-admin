/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
	darkMode: "class",
	theme: {
		screens: {
			'sm': '500px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				primary: {
					950: "#fff",
					900: "#fefefe",
					800: "#eee",
					700: "#ededed",
					600: "#ddd",
					500: "#ccc",
					400: "#bbb",
					300: "#aaa",
					200: "#999",
					150: "#888",
					100: "#777",
					50: "#555",
				},
				secondary: {
					50: "#000",
					100: "#010101",
					150: "#050505",
					200: "#111",
					300: "#101010",
					400: "#151515",
					500: "#222",
					600: "#252525",
					700: "#333",
					800: "#353535",
					900: "#444",
					950: "#454545",
				},
			},
		},
		plugins: [],
	},
};
