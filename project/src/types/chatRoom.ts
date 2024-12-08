export interface ChatRoom {
  id: string;
  name: string;
  createdBy: string;
  createdAt: number;
  participants: string[];
  isPrivate: boolean;
  lastMessage?: {
    text: string;
    sender: string;
    timestamp: number;
  };
}

export interface CreateRoomData {
  name: string;
  isPrivate: boolean;
}