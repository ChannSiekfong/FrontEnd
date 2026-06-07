import { searchAPI } from "../api/search.api";

export const useSearch = () => {
  const search = async (query: string, aiId: string, onEvent: (data: any) => void) => {
    return searchAPI(query, aiId, onEvent);
  };

  return { search };
};
