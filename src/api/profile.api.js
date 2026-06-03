import { toast } from "react-toastify";
import { api } from "./global.api";

export const API_BASE_URL = "/profile";

export const createProfileAPI = async (name, color, type, password, confirm_password) => {
  try {
    const response = await api.post(`${API_BASE_URL}/`, {
      name: name,
      color: color,
      type: type,
      password: password || undefined,
      confirm_password: confirm_password || undefined,
    });
    toast.success(response.data.message || "Profile created successfully!");
    return response.data;
  } catch (error) {
    console.error("Error creating profile:", error);
    const message = error.response?.data?.message || "Failed to create profile. Please try again.";
    toast.error(message);
    return { status: "error", message };
  }
}
