import { getIntegrationStatusAPI, disconnectIntegrationAPI, connectIntegrationAPI, integrateAPI } from "../api/integration.api"

export const useIntegration = () => {
  const getIntegrationStatus = async (profileID) => {
    return await getIntegrationStatusAPI(profileID);
  };

  const disconnectIntegration = async (integrationId) => {
    if (!integrationId) {
      console.error("Integration ID is required to disconnect.");
      return { status: "error", message: "Integration ID is required." };
    }

    return await disconnectIntegrationAPI(integrationId);
  }

  const connectIntegration = async (profileId, type) => {
    return await connectIntegrationAPI(profileId, type);
  }

  const integrate = async (profileID, type) => {
    return await integrateAPI(profileID, type);
  }

  return { getIntegrationStatus, disconnectIntegration, connectIntegration, integrate };
}
