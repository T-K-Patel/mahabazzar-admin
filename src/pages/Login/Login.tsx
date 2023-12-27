import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUser,
	faLock,
	faEye,
	faEyeSlash,
	faLockOpen,
	faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Login.css"; // Import your CSS file
import Banner from "../../assets/Brand/myfreelogomaker.com_editor_164044737 (3).png";
import BannerDark from "../../assets/Brand/myfreelogomaker.com_editor_164044737 (2).png";
import axios, { AxiosResponse } from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useProfile from "../../context/user.context";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

interface valuesType {
	username: string;
	password: string;
}
interface errorsType {
	username?: string;
	password?: string;
}

const Login = () => {
	const { setUser } = useProfile();
	const [showPassword, setShowPassword] = useState(false);

	const validateForm = (value: valuesType) => {
		const errors: errorsType = {};
		if (!value.username) errors.username = "Username required";
		if (!value.password) errors.password = "Password required";
		return errors;
	};

	const handleSubmit = async (values: valuesType) => {
		await toast.promise(axios.post("/api/v1/users/login", values), {
			pending: {
				render() {
					return "Logging In";
				},
				position: "top-right",
			},
			success: {
				render(resp) {
					const response: AxiosResponse | undefined = resp.data;
					console.log(response);
					setUser(response?.data?.data?.profile || null);
					return "Log-in successful 👌";
				},
				position: "bottom-right",
			},
			error: {
				render(err) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const error: any = err.data;
					console.log(error);
					return (
						error.response?.data?.message || "Some error occured"
					);
				},
			},
		});
	};

	return (
		<div className="flex align-middle justify-center w-full h-full p-3 pb-5">
			<div className="h-max grid grid-flow-row-dense lg:grid-flow-col mx-5 md:mx-16 lg:mx-24 my-auto py-3">
				<div
					className="w-full h-full flex z-[-1] max-w-[500px] md:max-w-max bg-primary-500 dark:bg-gray-900"
					style={{ userSelect: "none" }}
				>
					<img src={Banner} alt="" className="dark:hidden my-auto" />
					<img
						src={BannerDark}
						alt=""
						className="hidden dark:block my-auto"
					/>
				</div>
				<div className="flex h-full py-8 w-full lg:w-max justify-center bg-primary-500 dark:bg-gray-900">
					<Formik
						initialValues={{ username: "", password: "" }}
						onSubmit={handleSubmit}
						validate={validateForm}
					>
						{({ isSubmitting, isValid, values }) => (
							<Form className="h-fit my-auto px-6">
								<h2 className="login-heading text-center text-3xl mb-8">
									Admin Login
								</h2>

								{/* Username Field */}
								<div className="flex align-middle bg-opacity-25 m-0 bg-black dark:bg-white dark:bg-opacity-15 mt-5 p-0">
									<div>
										<div className="w-10 flex justify-center h-full bg-primary-50 text-primary-800">
											<FontAwesomeIcon
												icon={faUser}
												className="my-auto"
											/>
										</div>
									</div>
									<Field
										id="username"
										name="username"
										type="text"
										placeholder="Username"
										className="bg-transparent outline-none p-2 w-full placeholder:text-current"
									/>
								</div>
								<span className="text-red-500 text-sm">
									<ErrorMessage name="username" />
								</span>

								{/* Password Field */}
								<div className="flex align-middle bg-opacity-25 bg-black dark:bg-white dark:bg-opacity-15 mt-5 mb-1 p-0">
									<div>
										<div className="w-10 flex justify-center h-full bg-primary-50 text-primary-800">
											<FontAwesomeIcon
												icon={
													showPassword
														? faLockOpen
														: faLock
												}
												className="my-auto"
											/>
										</div>
									</div>
									<Field
										id="password"
										name="password"
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Password"
										className="bg-transparent outline-none p-2 pe-0 w-full placeholder:text-current"
									/>
									<div>
										<div
											className="w-10 flex justify-center h-full cursor-pointer bg-black bg-opacity-25 text-primary-800"
											onClick={() => {
												setShowPassword(!showPassword);
											}}
										>
											<FontAwesomeIcon
												icon={
													showPassword
														? faEye
														: faEyeSlash
												}
												className="my-auto"
											/>
										</div>
									</div>
								</div>
								<span className="text-red-500 text-sm">
									<ErrorMessage name="password" />
								</span>

								{/* Forgot Password Field */}
								<div className="flex items-center justify-end">
									<div className="text-sm">
										<NavLink
											to={`${import.meta.env
												.VITE_FRONTEND_URL || ""
												}/forgot-password`}
											className="underline"
											target={
												import.meta.env
													.VITE_FRONTEND_URL ===
													undefined
													? ""
													: "_blank"
											}
										>
											Forgot your password?
										</NavLink>
									</div>
								</div>

								{/* SubmitButton */}
								<div>
									<button
										type="submit"
										className="w-full py-2 my-5 text-xl bg-gray-800 dark:bg-blue-400 text-primary-800 disabled:opacity-50 disabled:text-opacity-50"
										disabled={
											isSubmitting ||
											!isValid ||
											values.username == "" ||
											values.password == ""
										}
									>
										{isSubmitting ? "Logging in" : "Log in"}
										<FontAwesomeIcon
											icon={faSignInAlt}
											className="my-auto mx-2"
										/>
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default Login;
