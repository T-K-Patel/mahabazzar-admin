import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Header({
	onClose,
	title,
}: {
	onClose: (() => void) | null | undefined;
	title: string;
}) {
	return (
		<div className="flex items-center justify-between px-5 py-3 border-b border-solid border-blueGray-200 rounded-t bg-primary-150 dark:bg-gray-700">
			<h3 className="text-2xl font-semibold mr-3">{title}</h3>
			{onClose && (
				<button
					className="p-1 ml-auto bg-transparent border-0 opacity-55 float-right leading-none font-semibold outline-none focus:outline-none"
					onClick={onClose}
					type="button"
				>
					<FontAwesomeIcon icon={faX} className="text-lg" />
				</button>
			)}
		</div>
	);
}

function Body({ children }: { children?: React.ReactNode }) {
	return (
		<div className="relative p-6 flex-auto bg-primary-600 dark:bg-gray-600">
			{children}
		</div>
	);
}
function Footer({
	children,
	onClose,
	onAccept,
	closeText,
	acceptText,
}: {
	children?: React.ReactNode;
	closeText?: string;
	acceptText?: string;
	onClose?: () => void;
	onAccept?: () => void;
}) {
	return (
		<div className="flex items-center justify-end px-6 py-4 border-t border-solid border-blueGray-200 rounded-b bg-primary-150 dark:bg-gray-700">
			{children || (
				<>
					{onClose && (
						<button
							className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={onClose}
						>
							{closeText || "Cancel"}
						</button>
					)}
					{onAccept && (
						<button
							className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={onAccept}
						>
							{acceptText || "Ok"}
						</button>
					)}
				</>
			)}
		</div>
	);
}

function Modal({
	children,
	show,
	className,
}: {
	children?: React.ReactNode;
	show?: boolean;
	className?: string;
}) {
	document.body.style.position = show ? "fixed" : "";
	document.body.style.userSelect = show ? "none" : "";
	return (
		<>
			{show && (
				<>
					<div
						className="justify-center px-4 sm:items-center flex overflow-x-hidden overflow-y-auto max-w-[100vw] fixed inset-0 z-[10000] outline-none focus:outline-none"
						style={{ userSelect: "auto" }}
					>
						<div
							className={
								"relative w-auto py-6 overflow-y-scroll no-scrollbar mx-auto max-w-2xl " +
								(className || "")
							}
						>
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
								{children}
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			)}
		</>
	);
}

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;

export { Header as ModalHeader, Body as ModalBody, Footer as ModalFooter };
export default Modal;
