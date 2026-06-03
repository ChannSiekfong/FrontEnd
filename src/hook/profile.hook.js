import { createProfileAPI, getProfilesAPI } from "../api/profile.api";

export const useCreateProfile = () => {
  const createProfile = async (name, color, type, password, confirm_password) => {
    const data = await createProfileAPI(name, color, type, password, confirm_password);
    return data;
  }
  return { createProfile };
}

export const useGetProfiles = () => {
  const getProfiles = async () => {
    const data = await getProfilesAPI();
    const profiles = data.data?.data || [];
    return profiles;
  }
  return { getProfiles };
}
