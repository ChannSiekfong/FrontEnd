import axios from "axios";

export const API_BASE_URL = "http://localhost:8000/api/authentication";

export const registerAPI = async (username, email, hash_password, confirm_password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      username: username,
      email: email,
      hash_password: hash_password,
      confirm_password: confirm_password,
    });

    console.log("(API) Registration successful:", response.data);

    return response.data;
  } catch (error) {
    throw error;
  }
}
