import useProfile from "../../context/user.context";

function Dashboard() {
	const { user } = useProfile();
	if (!user) return <></>;
	return (
		<div>
			<h1>{user.username}</h1>
		</div>
	);
}

export default Dashboard;
