import React from "react";
import useTheme from "../../context/theme.context";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Brand/Logo.svg";
import LogoDark from "../../assets/Brand/Logo Dark.svg";
import useProfile from "../../context/user.context";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";

const ThemeToggle: React.FC = () => {
	const { themeMode, toggleTheme } = useTheme();

	const buttonStyles: React.CSSProperties = {
		padding: "10px",
		borderRadius: "20px",
		border: "none",
		cursor: "pointer",
		outline: "none",
		aspectRatio: "1",
		width: "30px",
		height: "30px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		transition: "background-color 0.3s, color 0.3s",
	};

	return (
		<button
			style={buttonStyles}
			onClick={toggleTheme}
			className="m-auto dark:bg-gray-900 dark:hover:bg-gray-700 shadow-gray-500 shadow-sm dark:shadow-primary-300 hover:bg-primary-300 bg-primary-500 dark:text-primary-700 text-gray-800"
		>
			{themeMode == "dark" ? (
				<DarkModeIcon fontSize="small" />
			) : themeMode == "light" ? (
				<LightModeIcon fontSize="small" />
			) : (
				<BrightnessAutoIcon fontSize="small" />
			)}
		</button>
	);
};

function Header({
	setShow,
}: {
	setShow: React.Dispatch<React.SetStateAction<boolean>> | (() => null);
}) {
	const { user } = useProfile();
	return (
		<header className="bg-primary-500 dark:bg-gray-900 h-[50px]">
			<nav className="px-9 py-2 flex flex-row justify-between max-w-screen-2xl h-full mx-auto">
				<div
					className="align-middle my-auto flex"
					style={{ userSelect: "none" }}
				>
					{user && (
						<MenuIcon
							onClick={() => {
								setShow(true);
							}}
							className="me-5 my-auto cursor-pointer"
						/>
					)}
					<NavLink to="/" className={"w-max"}>
						<h1 className="text-3xl my-auto flex dark:text-[#fbb040] gap-4">
							<img
								src={Logo}
								alt="MB"
								className="h-[30px] dark:block hidden"
							/>
							<img
								src={LogoDark}
								alt="MB"
								className="h-[30px] dark:hidden"
							/>
							Merchant
						</h1>
					</NavLink>
				</div>

				<ul className="flex gap-8">
					{user ? (
						<>
							<li className="my-auto hidden md:block">
								<NavLink to={"/"}>Home</NavLink>
							</li>
							<li className="my-auto hidden md:block">
								<NavLink to={"/users"}>Users</NavLink>
							</li>
							<li className="my-auto hidden md:block">
								{/* TODO: Update admin mail or component here */}
								<NavLink
									to={"mailto:admin@domain.com"}
									rel="noopener noreferrer"
								>
									Mail
								</NavLink>
							</li>
							<li className="my-auto hidden md:block">
								{/* TODO: Make this a dropdown on hover link */}
								<NavLink to={"/dashboard"}>My Profile</NavLink>
							</li>
						</>
					) : (
						<li className="my-auto">
							<NavLink to={"/login"}>Login</NavLink>
						</li>
					)}
					<ThemeToggle />
				</ul>
			</nav>
		</header>
	);
}
export default Header;
