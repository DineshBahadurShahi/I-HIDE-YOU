import { useState, useEffect } from 'react';
import { ChatRoom, CreateRoomData } from '../types/chatRoom';
import { chatService } from '../services/chatService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useChatRooms() {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const fetchedRooms = await chatService.getRooms();
      setRooms(fetchedRooms);
    } catch (error) {
      toast.error('Failed to load chat rooms');
    } finally {
      setIsLoading(false);
    }
  };

  const createRoom = async (data: CreateRoomData) => {
    if (!user) return;
    
    try {
      const newRoom = await chatService.createRoom(data, user.id);
      setRooms(prev => [...prev, newRoom]);
      toast.success('Chat room created successfully!');
      return newRoom;
    } catch (error) {
      toast.error('Failed to create chat room');
      return null;
    }
  };

  const joinRoom = async (roomId: string) => {
    if (!user) return;

    try {
      await chatService.joinRoom(roomId, user.id);
      setRooms(prev =>
        prev.map(room =>
          room.id === roomId
            ? { ...room, participants: [...room.participants, user.id] }
            : room
        )
      );
    } catch (error) {
      toast.error('Failed to join chat room');
    }
  };

  return {
    rooms,
    isLoading,
    createRoom,
    joinRoom,
  };
}