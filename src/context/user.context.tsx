import {
	ReactNode,
	useEffect,
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useState,
} from "react";
import Preloader from "../components/preloader/Preloader";
import axios from "axios";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Product {
	_id: string;
	title: string;
	category: string;
	thumbnail: string;
	price: number;
	total: number;
	quantity: number;
}
interface OrderHistoryItem {
	_id: string;
	totalPrice: number;
	products: Product[];
	discountedPrice: number | null;
	status: string | null;
	expectedDelivery: Date | null;
	createdAt: Date;
}
interface UserData {
	_id: string;
	username: string;
	email: string;
	firstname: string;
	lastname: string;
	gender?: "Male" | "Female";
	avatar: string;
	createdAt: string;
	updatedAt: string;
	orderHistory: OrderHistoryItem[];
}

interface User {
	user?: UserData | null;
	setUser: Dispatch<SetStateAction<UserData | null>>;
}

export const UserContext = createContext<User>({
	setUser: () => { },
});

const UserProvider = UserContext.Provider;

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<UserData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		if (user) return;
		setLoading(true);
		axios
			.get("/api/v1/users/profile")
			.then((response) => {
				response = response.data;
				setUser(response.data);
			})
			.catch(async (error) => {
				console.error(error);
				if (error.response?.status === 401) {
					const s = await API.RefreshToken();
					if (s) navigate(0);
					else if (
						!["/login", "/forgot-password"].includes(
							window.location.pathname
						)
					) {
						navigate("/login");
					}
				} else toast.error("Some Error occured.");
			})
			.finally(() => {
				setTimeout(() => {
					setLoading(false);
				}, 300);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<UserProvider value={{ user, setUser }}>
			{loading ? <Preloader /> : children}
		</UserProvider>
	);
};

export default function useProfile() {
	return useContext(UserContext);
}
