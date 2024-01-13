import { Button } from "@mui/material";
import { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

function Product() {
	const { id, ntm } = useParams();
	useEffect(() => {
		document.title = "Product | Inventory";
		return () => {
			document.title = "Mahabazzar Admin";
		};
	}, []);
	return (
		<div>
			{id}
			<h1>{ntm}</h1>
			<NavLink to={"update"}>
				<Button variant="contained">Edit</Button>
			</NavLink>
		</div>
	);
}

export default Product;
