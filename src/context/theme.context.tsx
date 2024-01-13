import { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
	themeMode: "light",
	toggleTheme: () => {},
});

const ThemeProvider = ThemeContext.Provider;

const getSystemTheme = () => {
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
};
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [themeMode, setThemeMode] = useState<"dark" | "light" | "system">(
		(() => {
			switch (localStorage.getItem("theme")) {
				case "light":
					return "light";
				case "dark":
					return "dark";
				default:
					localStorage.setItem("theme", "system");
					return "system";
			}
		})()
	);
	const toggleTheme = () => {
		if (themeMode === "light") {
			setThemeMode("dark");
			localStorage.setItem("theme", "dark");
		} else if (themeMode === "dark") {
			setThemeMode("system");
			localStorage.setItem("theme", "system");
		} else {
			setThemeMode("light");
			localStorage.setItem("theme", "light");
		}
	};
	const handleStorageChange = (event: StorageEvent) => {
		if (event.key === "theme") {
			switch (event.newValue) {
				case "light":
					setThemeMode("light");
					break;
				case "dark":
					setThemeMode("dark");
					break;
				default:
					localStorage.setItem("theme", "system");
					setThemeMode("system");
			}
		}
	};

	window.addEventListener("storage", handleStorageChange);

	useEffect(() => {
		document.querySelector("html")?.classList.remove("dark", "light");
		document
			.querySelector("html")
			?.classList.add(
				themeMode === "system" ? getSystemTheme() : themeMode
			);
		window.addEventListener("storage", handleStorageChange);
		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [themeMode]);

	return (
		<ThemeProvider value={{ themeMode, toggleTheme }}>
			{children}
		</ThemeProvider>
	);
};

import { ThemeProvider as MTP, PaletteMode, createTheme } from "@mui/material";

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
	const { themeMode } = useTheme();
	const muiTheme = createTheme({
		palette: {
			mode:
				themeMode === "system"
					? (getSystemTheme() as PaletteMode)
					: (themeMode as PaletteMode),
		},
	});
	return <MTP theme={muiTheme}>{children}</MTP>;
}

export default function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
