import { fetchChatsAPI, createChatAPI, fetchConversationAPI } from "../api/chat.api"

export const useChat = () => {
  const fetch_chats = async (profileId) => {
    return await fetchChatsAPI(profileId);
  }

  const fetch_conversation = async (chatId) => {
    return await fetchConversationAPI(chatId);
  }

  const create_chat = async (profileId) => {
    return await createChatAPI(profileId);
  }
  return { fetch_chats, fetch_conversation, create_chat };
}
