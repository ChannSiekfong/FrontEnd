import { searchAPI } from "../api/search.api";

export const useSearch = () => {
  const search = async (query: string, aiId: string, onEvent: (data: any) => void, chatId?: string, profileId?: string) => {
    return searchAPI(query, aiId, onEvent, chatId, profileId);
  };

  return { search };
};
