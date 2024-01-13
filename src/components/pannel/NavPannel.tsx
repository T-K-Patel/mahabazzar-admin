import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./NavPannel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronDown,
	faChevronUp,
	faSignOutAlt,
	faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import Inventory from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";

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

	const DivRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleOutsideClick = (e: MouseEvent) => {
			if (DivRef.current && !DivRef.current.contains(e.target as Node)) {
				setShow(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [setShow]);

	const navigate = useNavigate();

	useEffect(() => {
		setShow(false);
	}, [setShow, navigate]);

	return (
		<div
			className={
				show
					? "absolute w-screen h-screen backdrop-blur-[2px] z-[1000]"
					: "w-0"
			}
		>
			<aside
				className={`bg-primary-400 flex absolute z-[1001] ${
					show ? "left-0" : "left-[-100%]"
				} flex-col justify-between font-medium dark:bg-gray-950 w-[100vw] sm:w-56 sm:min-w-56 h-screen`}
				style={{ transition: "left 0.3s ease-in" }}
				ref={DivRef}
			>
				<div className="w-full px-4 pt-2">
					{/* <FontAwesomeIcon
						icon={faX}
						className="p-2 cursor-pointer"
						onClick={() => setShow(false)}
					/> */}
					<CloseIcon
						className="m-2 ms-4 cursor-pointer"
						onClick={() => setShow(false)}
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
									<PeopleIcon
										fontSize="small"
										className="w-[25px] my-auto me-2"
									/>
									Users
								</NavLink>
							</div>
							<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
								<NavLink
									to={`/inventory`}
									className="ps-2 flex align-middle py-2 w-full"
								>
									<Inventory
										fontSize="small"
										className="w-[25px] my-auto me-2"
									/>
									Inventory
								</NavLink>
							</div>
							<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
								<NavLink
									to={`/orders`}
									className="ps-2 flex align-middle py-2 w-full"
								>
									<ShoppingCartIcon
										fontSize="small"
										className="w-[25px] my-auto me-2"
									/>
									Orders
								</NavLink>
							</div>
							<div className="pannel_dropdown_field has-[.active]:bg-primary-100 hover:bg-primary-150 dark:has-[.active]:bg-gray-400 dark:hover:bg-gray-400">
								<NavLink
									to={`/transactions`}
									className="ps-2 flex align-middle py-2 w-full"
								>
									<ReceiptLongIcon
										fontSize="small"
										className="w-[25px] my-auto me-2"
									/>
									Invoices
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
		</div>
	);
}

export default NavPannel;
