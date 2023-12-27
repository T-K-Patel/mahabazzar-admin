import { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

interface myObj {
	[x: string]: string | number | boolean | null | undefined;
}

interface data {
	data: {
		users: myObj[];
		products: myObj[];
		orders: myObj[];
		transactions: myObj[];
	};
	setData: {
		setUsers: Dispatch<SetStateAction<myObj[]>>;
		setProducts: Dispatch<SetStateAction<myObj[]>>;
		setOrders: Dispatch<SetStateAction<myObj[]>>;
		setTransactions: Dispatch<SetStateAction<myObj[]>>;
	};
}

export const DataContext = createContext<data | null>(null);

const DataProvider = DataContext.Provider;

export const DataContextProvider = ({ children }: { children: ReactNode }) => {
	const [users, setUsers] = useState<myObj[]>([]);
	const [products, setProducts] = useState<myObj[]>([]);
	const [orders, setOrders] = useState<myObj[]>([]);
	const [transactions, setTransactions] = useState<myObj[]>([]);

	return (
		<DataProvider
			value={{
				data: {
					users,
					products,
					orders,
					transactions,
				},
				setData: {
					setUsers,
					setProducts,
					setOrders,
					setTransactions,
				},
			}}
		>
			{children}
		</DataProvider>
	);
};

export default function useData() {
	return useContext(DataContext);
}
