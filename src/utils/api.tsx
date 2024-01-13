import axios from "axios";

async function RefreshToken() {
	return await axios
		.post("/api/v1/users/refresh-token")
		.then((response) => {
			return response?.data?.success;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
}
const API = { RefreshToken };

export default API;
