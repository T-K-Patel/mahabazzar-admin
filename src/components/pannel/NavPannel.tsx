import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./NavPannel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronUp,
	faCartShopping,
	faTag,
	faUserFriends,
	faExchange,
	faSignOutAlt,
	faUserCircle,
	faX,
} from "@fortawesome/free-solid-svg-icons";

import BrandHeroLight from "../../assets/Brand/MahaBazzar.svg";
import BrandHeroDark from "../../assets/Brand/MahaBazzar Dark.svg";
import useProfile from "../../context/user.context";
import Modal from "../../utils/Modal/Modal";
import { toast } from "react-toastify";
import axios from "axios";

function NavPannel({
	show,
	setShow,
}: {
	show?: boolean;
	setShow: (x: boolean) => void;
}) {
	const [open, setOpen] = useState(false);
	const { user, setUser } = useProfile();
	const [showModal, setShowModal] = useState(false);
	const handleModalClose = () => setShowModal(false);

	return (
		<aside
			className={`bg-primary-400 flex absolute ${
				show ? "left-0" : "left-[-100%]"
			} flex-col
			 justify-between font-medium dark:bg-gray-950 w-56 
			  min-w-56 h-full`}
			style={{ transition: "left 0.3s ease-in" }}
		>
			<div className="w-full px-4 pt-2">
				<FontAwesomeIcon
					icon={faX}
					className="p-2 cursor-pointer"
					onClick={() => setShow(!show)}
				/>
			</div>
			<div className="m-3" style={{ userSelect: "none" }}>
				<img
					src={BrandHeroLight}
					className="w-40 mx-auto dark:block hidden"
					alt="MahaBazzar"
				/>
				<img
					src={BrandHeroDark}
					className="w-40 mx-auto dark:hidden"
					alt="MahaBazzar"
				/>
			</div>
			<h1 className="text-center text-xl my-4">Databases</h1>

			<div className="pannel_dropdown_wrapper px-4 h-full overflow-y-scroll">
				<div className="pannel_dropdown dark:bg-gray-600 bg-primary-300 p-0 my-2 rounded-lg">
					<div
						className={`pannel_dropdown_header m-0 pe-3 p-2 py-2 cursor-pointer flex align-middle justify-between hover:bg-primary-150 dark:hover:bg-gray-400 ${
							open ? "bg-primary-150 dark:bg-gray-400" : ""
						}`}
						onClick={() => {
							setOpen(!open);
						}}
					>
						<span>Collections</span>
						<FontAwesomeIcon
							icon={open ? faChevronUp : faChevronDown}
							className="my-auto"
						/>
					</div>
					<div
						className={`pannel_dropdown_field_wrapper m-2 border-t py-2 flex flex-col ${
							open ? "" : "hidden"
						}`}
					>
						<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
							<NavLink
								to={`/users`}
								className="ps-2 flex align-middle py-2 w-full"
							>
								<FontAwesomeIcon
									icon={faUserFriends}
									className="w-[25px] my-auto"
								/>{" "}
								Users
							</NavLink>
						</div>
						<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
							<NavLink
								to={`/products`}
								className="ps-2 flex align-middle py-2 w-full"
							>
								<FontAwesomeIcon
									icon={faTag}
									className="w-[25px] my-auto"
								/>{" "}
								Products
							</NavLink>
						</div>
						<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
							<NavLink
								to={`/orders`}
								className="ps-2 flex align-middle py-2 w-full"
							>
								<FontAwesomeIcon
									icon={faCartShopping}
									className="w-[25px] my-auto"
								/>{" "}
								Orders
							</NavLink>
						</div>
						<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
							<NavLink
								to={`/transactions`}
								className="ps-2 flex align-middle py-2 w-full"
							>
								<FontAwesomeIcon
									icon={faExchange}
									className="w-[25px] my-auto"
								/>{" "}
								Transactions
							</NavLink>
						</div>
					</div>
				</div>
			</div>
			<div className="my-3 mx-4 flex gap-3 flex-col ">
				<div className="pannel_dropdown_field has-[.active]:bg-primary-100 dark:bg-gray-700 bg-primary-300 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
					<NavLink
						to={`/dashboard`}
						className="flex align-middle justify-center py-2 w-full capitalize"
					>
						<FontAwesomeIcon
							icon={faUserCircle}
							className="w-[25px] my-auto"
						/>
						{user?.username}
					</NavLink>
				</div>
				<div className="pannel_dropdown_field has-[.active]:bg-primary-100 dark:bg-gray-700 bg-primary-300 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
					<button
						onClick={() => {
							setShowModal(true);
						}}
						className="flex align-middle justify-center py-2 w-full"
						type="button"
					>
						<FontAwesomeIcon
							icon={faSignOutAlt}
							className="w-[25px] my-auto"
						/>
						Sign Out
					</button>
					<Modal show={showModal}>
						<Modal.Header
							onClose={handleModalClose}
							title="Confirm Signout"
						/>
						<Modal.Body>
							<p className="text-lg">
								Are you sure you want to signout?
							</p>
						</Modal.Body>
						<Modal.Footer
							onClose={handleModalClose}
							onAccept={async () => {
								await toast.promise(
									axios.get("/api/v1/users/logout"),
									{
										success: {
											render() {
												setUser(null);
												return "Signed out successfully";
											},
										},
										error: "Cant Signout",
										pending: "Signing out",
									}
								);
							}}
							closeText="No"
							acceptText="Signout"
						/>
					</Modal>
				</div>
			</div>
		</aside>
	);
}

export default NavPannel;
