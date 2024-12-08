import { Message, FileAttachment } from '../types/chat';

// In-memory message storage (replace with actual backend implementation)
const messagesByRoom: Record<string, Message[]> = {};

export const messageService = {
  getMessages: async (roomId: string): Promise<Message[]> => {
    return messagesByRoom[roomId] || [];
  },

  sendMessage: async (
    roomId: string,
    message: Omit<Message, 'id' | 'timestamp' | 'reactions'>
  ): Promise<Message> => {
    const newMessage: Message = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      reactions: {},
    };

    messagesByRoom[roomId] = [...(messagesByRoom[roomId] || []), newMessage];
    return newMessage;
  },

  deleteMessage: async (roomId: string, messageId: string): Promise<void> => {
    if (messagesByRoom[roomId]) {
      messagesByRoom[roomId] = messagesByRoom[roomId].filter(
        msg => msg.id !== messageId
      );
    }
  },

  addReaction: async (
    roomId: string,
    messageId: string,
    username: string,
    emoji: string
  ): Promise<void> => {
    if (!messagesByRoom[roomId]) return;

    messagesByRoom[roomId] = messagesByRoom[roomId].map(message => {
      if (message.id !== messageId) return message;

      const currentReaction = message.reactions[emoji] || { emoji, count: 0, users: [] };
      const hasReacted = currentReaction.users.includes(username);

      return {
        ...message,
        reactions: {
          ...message.reactions,
          [emoji]: hasReacted
            ? undefined
            : {
                emoji,
                count: currentReaction.count + 1,
                users: [...currentReaction.users, username],
              },
        },
      };
    });
  },

  clearRoomMessages: async (roomId: string): Promise<void> => {
    delete messagesByRoom[roomId];
  },
};