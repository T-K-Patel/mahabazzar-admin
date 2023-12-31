import { Rating } from "@mui/material";
import useProfile from "../../context/user.context";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
	const { user } = useProfile();
	const rating = Number(Math.round(Math.random() * 400 + 100) / 100)
	if (!user) return <></>;
	return (
		<>
			<div className="w-full flex flex-col md:flex-row gap-4 justify-between mb-3">
				<div>
					<h2>Hi {user.firstname}, Welcome back</h2>
					<p className="text-xs">Your Sales and Products management dashboard</p>
				</div>
				<div className="w-full md:w-auto flex flex-col sm:flex-row justify-center sm:justify-between gap-3 md:gap-8">
					<div className="mx-auto">
						<h2 className="text-center">Rating <small>({Number(Math.floor(Math.random() * 9000 + 100)).toLocaleString()})</small></h2>
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
					<div className="mx-auto">
						<h2 className="text-center sm:text-end">Total products</h2>
						<p className="text-lg text-center sm:text-end">{Number(Math.floor(Math.random() * 90000 + 1000)).toLocaleString()}</p>
					</div>
					<div className="mx-auto">
						<h2 className=" text-center sm:text-end">Total sales</h2>
						<p className="text-lg text-center sm:text-end">{Number(Math.floor(Math.random() * 900000 + 1000)).toLocaleString()}</p>
					</div>
				</div>
			</div>
			<section className="bg-primary-500 dark:bg-gray-700 p-2 py-4 gap-3 grid sm:grid-cols-2 lg:grid-cols-4">
				<div className="w-full border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-white">
					<h2>Total Quantity</h2>
					<p className="text-2xl">{Number(Math.floor(Math.random() * 900000 + 1000)).toLocaleString()}</p>
					<small>{Number(Math.round((Math.random() * 10 + 0.2) * 100) / 100)}% ( 30days )</small>
				</div>

				<div className="w-full border-b-2 sm:border-b-0 lg:border-r-2 border-black dark:border-white">
					<h2>Total Cost</h2>
					<p className="text-2xl">₹ {Number(Math.floor(Math.random() * 900000 + 1000)).toLocaleString()}</p>
					<small>{Number(Math.round((Math.random() * 10 + 0.2) * 100) / 100)}% ( 30days )</small>
				</div>
				<div className="w-full border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-white">
					<h2>Total Revenue</h2>
					<p className="text-2xl">₹ {Number(Math.floor(Math.random() * 900000 + 1000)).toLocaleString()}</p>
					<small>{Number(Math.round((Math.random() * 10 + 0.2) * 100) / 100)}% ( 30days )</small>
				</div>
				<div className="w-full">
					<h2>Total Profit</h2>
					<p className="text-2xl">₹ {Number(Math.floor(Math.random() * 900000 + 1000)).toLocaleString()}</p>
					<small>{Number(Math.round((Math.random() * 10 + 0.2) * 100) / 100)}% ( 30days )</small>
				</div>
			</section>
		</>
	);
}

export default Dashboard;