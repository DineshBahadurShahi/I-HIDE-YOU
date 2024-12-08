import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, Globe, Clock, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { ChatRoom } from '../../types/chatRoom';

interface ChatRoomCardProps {
  room: ChatRoom;
}

export function ChatRoomCard({ room }: ChatRoomCardProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/chat/${room.id}`}
        className="block bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4 hover:bg-gray-800/70 transition"
      >
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">{room.name}</h3>
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {room.isPrivate ? (
              <Lock className="w-5 h-5 text-purple-400" />
            ) : (
              <Globe className="w-5 h-5 text-green-400" />
            )}
          </motion.div>
        </div>
        
        {room.lastMessage && (
          <div className="mb-4">
            <p className="text-sm text-gray-400 line-clamp-2">
              {room.lastMessage.text}
            </p>
            <div className="flex items-center space-x-2 mt-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">
                {formatTimestamp(room.lastMessage.timestamp)}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-400">
          <motion.div 
            className="flex items-center space-x-1"
            whileHover={{ scale: 1.05 }}
          >
            <Users className="w-4 h-4" />
            <span>{room.participants.length} participants</span>
          </motion.div>
          <motion.span 
            className="text-purple-400"
            whileHover={{ y: -2 }}
          >
            {room.isPrivate ? 'Private' : 'Public'}
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}