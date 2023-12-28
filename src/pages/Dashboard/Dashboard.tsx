import useProfile from "../../context/user.context";

function Dashboard() {
	const { user } = useProfile();
	if (!user) return <></>;
	return (
		<div className="text-lg">
			<h1>Id: {user._id}</h1>
			<h1>Username: {user.username}</h1>
			<h1>Name: {user.firstname} {user.lastname}</h1>
			<h1>Email: {user.email}</h1>
			<h1>Avatar: <img src={user.avatar} alt="User Profile" width={"100px"} className="w-60" /></h1>

		</div>
	);
}

export default Dashboard;
