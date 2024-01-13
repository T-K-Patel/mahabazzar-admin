import { Rating } from "@mui/material";
import useProfile from "../../context/user.context";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Stats from "./components/Stats";
import RecentOrders from "./components/RecentOrders";
import TopProducts from "./components/TopProducts";

function Dashboard() {
	const { user } = useProfile();
	const rating = Number(Math.round(Math.random() * 400 + 100) / 100);
	if (!user) return <></>;
	return (
		<>
			<div className="w-full flex flex-col md:flex-row gap-4 justify-between mb-3">
				<div>
					<h2>Hi {user.firstname}, Welcome back</h2>
					<p className="text-xs">
						Your Sales and Products management dashboard
					</p>
				</div>
				<div className="w-full md:w-auto flex flex-col sm:flex-row justify-center sm:justify-between gap-5 sm:gap-3 md:gap-8">
					<div className="flex justify-between sm:block">
						<h2 className="text-center">
							Rating{" "}
							<small>
								(
								{Number(
									Math.floor(Math.random() * 9000 + 100)
								).toLocaleString()}
								)
							</small>
						</h2>
						<div className="flex gap-1">
							<Rating
								readOnly
								value={rating}
								size="small"
								precision={0.1}
								color="#ffd875"
								icon={<FontAwesomeIcon icon={faStar} />}
								emptyIcon={<FontAwesomeIcon icon={faStar} />}
							/>
							<span>{rating}</span>
						</div>
					</div>
					<div className="flex justify-between sm:block">
						<h2 className="text-center sm:text-end">
							Total products
						</h2>
						<p className="text-lg text-center sm:text-end">
							{Number(
								Math.floor(Math.random() * 90000 + 1000)
							).toLocaleString()}
						</p>
					</div>
					<div className="flex justify-between sm:block">
						<h2 className=" text-center sm:text-end">
							Total sales
						</h2>
						<p className="text-lg text-center sm:text-end">
							₹{" "}
							{Number(
								Math.floor(Math.random() * 900000 + 1000)
							).toLocaleString()}
						</p>
					</div>
				</div>
			</div>
			<Stats />
			<div className="grid grid-cols-1 mt-2 lg:grid-cols-2 align-middle">
				<RecentOrders />
				<TopProducts />
			</div>
		</>
	);
}

export default Dashboard;
