import { api } from "./global.api";
import { toast } from "react-toastify";

const API_BASE_URL = "/memory";

export const deleteMemoryNodeAPI = async (communicationIds, profile_id) => {
  try {
    const response = await api.post(`${API_BASE_URL}/communication/${profile_id}/delete`, { communicationIDs: communicationIds });

    console.log("(API) Deleted memory nodes:", response.data);

    toast.success(response.data.message || "Selected memory nodes deleted successfully!");
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete memory nodes.";
    console.error("(API) Delete Memory Nodes failed:", message);
    toast.error(message);
    return { status: "error", message };
  }
}

export const searchMemoryAPI = async (
  profile_id,
  query,
  filters = {},
  limit = 25,
  offset = 0
) => {
  try {
    const response = await api.post(`${API_BASE_URL}/communication/search/${profile_id}`, {
      query,
      filters,
      limit,
      offset,
    });

    console.log("(API) Searched memory nodes:", response.data);

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to search memory nodes.";
    console.error("(API) Search Memory Nodes failed:", message);
    toast.error(message);
    return { status: "error", message };
  }
}
