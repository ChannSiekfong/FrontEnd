import { deleteMemoryNodeAPI } from "../api/memory.api";

export const useMemory = () => {
  const deleteMemoryNode = async (communicationIds, profile_id) => {
    return await deleteMemoryNodeAPI(communicationIds, profile_id);
  }
  return { deleteMemoryNode };
}
