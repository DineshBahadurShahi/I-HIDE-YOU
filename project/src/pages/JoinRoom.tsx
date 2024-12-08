import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useChatRooms } from '../hooks/useChatRooms';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function JoinRoom() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { joinRoom } = useChatRooms();
  const { user } = useAuth();

  useEffect(() => {
    const handleJoin = async () => {
      if (!user || !roomId) {
        toast.error('Please log in to join the room');
        navigate('/login');
        return;
      }

      try {
        await joinRoom(roomId);
        toast.success('Successfully joined the room!');
        navigate(`/chat/${roomId}`);
      } catch (error) {
        toast.error('Failed to join the room');
        navigate('/rooms');
      }
    };

    handleJoin();
  }, [roomId, user, joinRoom, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <Shield className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Joining Room...</h1>
        <p className="text-gray-400">Please wait while we connect you to the chat room.</p>
        <div className="mt-4">
          <div className="animate-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    </div>
  );
}