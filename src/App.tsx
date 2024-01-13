import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import NavPannel from "./components/pannel/NavPannel";
import Login from "./pages/Login/Login";
import React, { useState } from "react";
import useProfile from "./context/user.context";
import Dashboard from "./pages/Dashboard/Dashboard";
import MyProfile from "./pages/MyProfile/MyProfile";
import Inventory from "./pages/Inventory/Inventory";
import Product from "./pages/Inventory/components/Product";
import EditProduct from "./pages/Inventory/components/EditProduct";


function ProtectRoute({ element, authRequired }: { element?: React.ReactNode, authRequired: boolean }): React.ReactNode {
	const navigate = useNavigate();
	const { user } = useProfile();
	// console.log("Route protection checked")
	React.useEffect(() => {
		if (authRequired && !user) navigate("/login", { replace: true });
		if (user && !authRequired) navigate("/dashboard", { replace: true });
	}, [authRequired, user, navigate]);
	return (
		<>
			{element}
			<Outlet />
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
							{/* Protected Routes with Authentication required */}
							<Route path="" element={<ProtectRoute />}>
								<Route path="" element={<Dashboard />} />
								<Route path="dashboard" element={<MyProfile />} />
								<Route path="inventory">
									<Route path="" element={<Inventory />} />
									<Route path="stats" element={"Stats Page"} />
									<Route path=":id" >
										<Route path="" element={<Product />} />
										<Route path="update" element={<><p>Edit This Product</p><EditProduct /></>} />
									</Route>
								</Route>
							</Route>

							{/* Protected Routes without Authentication */}
							<Route path="" element={<ProtectRoute authRequired={false} />}>
								<Route path="login" element={<Login />} />
							</Route>

							{/* 404 Route */}
							<Route path="*" element={<h1 className="text-3xl text-center">Error 404</h1>} />
						</Routes>
					</main>
				</div>
			</div>
		</>
	);
}

export default App;
