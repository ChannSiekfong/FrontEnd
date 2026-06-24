import { deleteMemoryNodeAPI, searchMemoryAPI } from "../api/memory.api";

export const useMemory = () => {
  const deleteMemoryNode = async (communicationIds, profile_id) => {
    return await deleteMemoryNodeAPI(communicationIds, profile_id);
  }

  const searchMemory = async (profile_id, query, filters = {}, limit = 25, offset = 0) => {
    return await searchMemoryAPI(profile_id, query, filters, limit, offset);
  }

  return { deleteMemoryNode, searchMemory };
}
