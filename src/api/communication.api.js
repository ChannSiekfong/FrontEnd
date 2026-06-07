import { toast } from "react-toastify";
import { api } from "./global.api";

export const API_BASE_URL = "/communication";

export const syncAPI = async (type, profileId) => {
  try {
    if(type.toUpperCase() === "GMAIL") {
      const response = await api.post(`${API_BASE_URL}/gmail/sync/${profileId}`);
      toast.success(response.data.message || "Gmail sync successful!");
      return response.data;
    }

  } catch (error) {
    const message = error.response?.data?.message || "Sync failed. Please try again.";
    console.error("(API) Sync failed:", message);
    toast.error(message);
    return { status: "error", message };
  }
}
