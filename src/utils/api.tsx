import axios from "axios";

async function RefreshToken() {
	return await axios
		.post("/api/v1/users/refresh-token")
		.then((response) => {
			console.log(response);
			return true;
		})
		.catch((error) => {
			console.log(error);
			return false;
		});
}
const API = { RefreshToken };

export default API;
