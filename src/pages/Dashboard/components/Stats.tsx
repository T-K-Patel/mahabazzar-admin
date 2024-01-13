function Stats() {
	return (
		<section className="bg-primary-500 dark:bg-gray-700 p-2 py-4 gap-3 grid sm:grid-cols-2 lg:grid-cols-4">
			<div className="flex sm:block justify-between align-middle pb-2 w-full border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-white">
				<h2 className="my-auto">Total Quantity</h2>
				<div className="text-right sm:text-left">
					<p className="text-2xl">
						{Number(
							Math.floor(Math.random() * 900000 + 1000)
						).toLocaleString()}
					</p>
					<small>
						{Number(
							Math.round((Math.random() * 10 + 0.2) * 100) / 100
						)}
						% ( 30days )
					</small>
				</div>
			</div>
			<div className="flex sm:block justify-between align-middle pb-2 w-full border-b-2 sm:border-b-0 lg:border-r-2 border-black dark:border-white">
				<h2 className="my-auto">Total Cost</h2>
				<div className="text-right sm:text-left">
					<p className="text-2xl">
						₹{" "}
						{Number(
							Math.floor(Math.random() * 900000 + 1000)
						).toLocaleString()}
					</p>
					<small>
						{Number(
							Math.round((Math.random() * 10 + 0.2) * 100) / 100
						)}
						% ( 30days )
					</small>
				</div>
			</div>
			<div className="flex sm:block justify-between align-middle pb-2 w-full border-b-2 sm:border-b-0 sm:border-r-2 border-black dark:border-white">
				<h2 className="my-auto">Total Revenue</h2>
				<div className="text-right sm:text-left">
					<p className="text-2xl">
						₹{" "}
						{Number(
							Math.floor(Math.random() * 900000 + 1000)
						).toLocaleString()}
					</p>
					<small>
						{Number(
							Math.round((Math.random() * 10 + 0.2) * 100) / 100
						)}
						% ( 30days )
					</small>
				</div>
			</div>
			<div className="flex sm:block justify-between align-middle w-full">
				<h2 className="my-auto">Total Profit</h2>
				<div className="text-right sm:text-left">
					<p className="text-2xl">
						₹{" "}
						{Number(
							Math.floor(Math.random() * 900000 + 1000)
						).toLocaleString()}
					</p>
					<small>
						{Number(
							Math.round((Math.random() * 10 + 0.2) * 100) / 100
						)}
						% ( 30days )
					</small>
				</div>
			</div>
		</section>
	);
}

export default Stats;
