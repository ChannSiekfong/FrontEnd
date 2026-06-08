import { syncAPI } from "../api/communication.api";
export const useCommunication = () => {
  const sync = async (type, profileId) => {
    return await syncAPI(type, profileId);
  }

  return { sync };
}
