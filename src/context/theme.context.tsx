import { ReactNode, useEffect } from "react";
import { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
	themeMode: "light",
	toggleTheme: () => {},
});

const ThemeProvider = ThemeContext.Provider;

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
	const [themeMode, setThemeMode] = useState(
		localStorage.getItem("theme") === "dark" ? "dark" : "light"
	);
	const toggleTheme = () => {
		if (themeMode === "light") {
			setThemeMode("dark");
			localStorage.setItem("theme", "dark");
		} else {
			setThemeMode("light");
			localStorage.setItem("theme", "light");
		}
	};

	useEffect(() => {
		document.querySelector("html")?.classList.remove("dark", "light");
		document.querySelector("html")?.classList.add(themeMode);
	}, [themeMode]);

	return (
		<ThemeProvider value={{ themeMode, toggleTheme }}>
			{children}
		</ThemeProvider>
	);
};

export default function useTheme() {
	return useContext(ThemeContext);
}
