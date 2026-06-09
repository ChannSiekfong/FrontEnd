import { fetchChatsAPI, createChatAPI, fetchConversationAPI, deleteChatAPI} from "../api/chat.api"

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

  const delete_chat = async (chatId) => {
    return await deleteChatAPI(chatId);
  }
  return { fetch_chats, fetch_conversation, create_chat, delete_chat };
}
