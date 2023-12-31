import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeContextProvider } from "./context/theme.context.tsx";
import { UserContextProvider } from "./context/user.context.tsx";
import { DataContextProvider } from "./context/data.context.tsx";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeContextProvider>
				<UserContextProvider>
					<DataContextProvider>
						<App />
					</DataContextProvider>
				</UserContextProvider>
			</ThemeContextProvider>
		</BrowserRouter>
		<ToastContainer
			position="bottom-right"
			theme="colored"
			transition={Flip}
		/>
	</React.StrictMode>
);
