import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import NavPannel from "./components/pannel/NavPannel";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import useProfile from "./context/user.context";
import Dashboard from "./pages/Dashboard/Dashboard";


function ProtectRoute({ element, authRequired }: { element: React.ReactNode, authRequired: boolean }): React.ReactNode {
	const navigate = useNavigate();
	const { user } = useProfile();
	React.useEffect(() => {
		if (authRequired && !user) navigate("/login", { replace: true });
		if (user && !authRequired) navigate("/dashboard", { replace: true });
	}, [authRequired, user, navigate]);

	return (
		<>
			{element}
		</>
	)
}
ProtectRoute.defaultProps = {
	authRequired: true
}

function App() {
	const { user } = useProfile()
	const [show, setShow] = useState(user === null)

	return (
		<>
			<div className="flex md:h-[100vh] min-h-[600px] max-w-screen-2xl">
				{user && <NavPannel show={show} setShow={setShow} />}
				<div className="no-scrollbar w-[100vw] h-full min-h-[100vh] overflow-scroll">
					<Header setShow={setShow} />
					<main className="h-[calc(100%-50px)] overflow-y-scroll max-w-screen-2xl p-2">
						<Routes>
							<Route path="/" element={
								<div className="max-w-screen-xl mx-auto">
									<h1 className="text-3xl  text-center dark:text-white dark:bg-gray-800 py-3">
										Hello this is Admin Page
									</h1>
								</div>
							} />
							<Route path="/dashboard" element={<><ProtectRoute element={<Dashboard />} /></>} />
							<Route path="/login" element={<><ProtectRoute authRequired={false} element={<Login />} /></>} />
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
