import { searchAPI, statelesSearchAPI } from "../api/search.api";

export const useSearch = () => {
  const search = async (
    query: string,
    aiId: string,
    onEvent: (data: any) => void,
    chatId?: string,
    profileId?: string,
    type?: string
  ) => {
    if(type?.toLowerCase() === "standard") {
      await searchAPI(query, aiId, onEvent, chatId, profileId);
    } else if(type?.toLowerCase() === "stateless") {
      await statelesSearchAPI(query, aiId, onEvent, chatId, profileId);
    } else {
      console.error("Invalid search type:", type);
    }
  };

  return { search };
};
