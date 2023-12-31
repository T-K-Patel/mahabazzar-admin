import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import NavPannel from "./components/pannel/NavPannel";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import useProfile from "./context/user.context";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyProfile from "./pages/MyProfile/MyProfile";


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
	const [show, setShow] = useState(false)

	return (
		<>
			<div className="flex md:h-[100vh] min-h-[600px] max-w-screen-2xl mx-auto">
				{user && <NavPannel show={show} setShow={setShow} />}
				<div className="no-scrollbar w-[100vw] h-full min-h-[100vh] overflow-scroll">
					<Header setShow={setShow} />
					<main className="h-[calc(100%-50px)] overflow-y-scroll max-w-screen-2xl p-4 md:px-6">
						<Routes>
							<Route path="" element={<ProtectRoute element={<Dashboard />} />} />
							<Route path="/dashboard" element={<ProtectRoute element={<MyProfile />} />} />
							<Route path="/login" element={<ProtectRoute authRequired={false} element={<Login />} />} />
							{/* <Route path="/new">
								<Route path="" element={<h1 className="text-3xl">Nested Route</h1>} />
								<Route path="two" element={<h1 className="text-3xl">Custom Nested Route</h1>} />
							</Route> */}
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
