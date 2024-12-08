import { ChatRoom, CreateRoomData } from '../types/chatRoom';

// In-memory storage for rooms (replace with actual backend API calls)
let rooms: ChatRoom[] = [
  {
    id: '1',
    name: 'General Discussion',
    createdBy: 'system',
    createdAt: Date.now(),
    participants: [],
    isPrivate: false,
    lastMessage: {
      text: 'Welcome to the general discussion room!',
      sender: 'system',
      timestamp: Date.now(),
    },
  },
];

export const chatService = {
  getRooms: async (): Promise<ChatRoom[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return rooms;
  },

  createRoom: async (data: CreateRoomData, userId: string): Promise<ChatRoom> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const newRoom: ChatRoom = {
      id: crypto.randomUUID(),
      name: data.name,
      createdBy: userId,
      createdAt: Date.now(),
      participants: [userId],
      isPrivate: data.isPrivate,
      lastMessage: {
        text: 'Room created',
        sender: 'system',
        timestamp: Date.now(),
      },
    };

    rooms = [...rooms, newRoom];
    return newRoom;
  },

  joinRoom: async (roomId: string, userId: string): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    const room = rooms.find(r => r.id === roomId);
    if (!room) {
      throw new Error('Room not found');
    }

    if (!room.participants.includes(userId)) {
      rooms = rooms.map(r => 
        r.id === roomId 
          ? { ...r, participants: [...r.participants, userId] }
          : r
      );
    }
  },

  getRoomById: async (roomId: string): Promise<ChatRoom | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return rooms.find(r => r.id === roomId) || null;
  },
};