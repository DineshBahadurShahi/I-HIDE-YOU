import React, { useState, useEffect } from 'react';
import { Trash2, Reply } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { decryptMessage } from '../utils/encryption';
import { Message as MessageType } from '../types/chat';
import { MessageReactions } from './MessageReactions';
import { AudioPlayer } from './AudioPlayer';
import { FilePreview } from './FilePreview';

interface MessageProps {
  message: MessageType;
  currentUsername: string;
  onDelete: (messageId: string) => void;
  onReact: (messageId: string, emoji: string) => void;
  onReply: (message: MessageType) => void;
}

export function Message({ message, currentUsername, onDelete, onReact, onReply }: MessageProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const decryptedText = message.text ? decryptMessage(message.text) : '';
  const isOwnMessage = message.anonymousUsername === currentUsername;
  const isVoiceMessage = message.attachment?.type === 'audio/webm';

  useEffect(() => {
    const updateTimeLeft = () => {
      const remaining = Math.max(0, message.expiresAt - Date.now());
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    const interval = setInterval(updateTimeLeft, 1000);
    updateTimeLeft();

    return () => clearInterval(interval);
  }, [message.expiresAt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700"
    >
      <div className="flex items-center justify-between mb-2">
        <motion.span 
          className="text-purple-400 font-medium"
          whileHover={{ scale: 1.05 }}
        >
          {message.anonymousUsername}
          {isOwnMessage && ' (You)'}
        </motion.span>
        <div className="flex items-center space-x-3">
          <span className="text-gray-500 text-sm">
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
          <motion.span 
            className="text-red-400 text-sm"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Expires in {timeLeft}
          </motion.span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onReply(message)}
            className="text-gray-500 hover:text-purple-400 transition-colors"
            title="Reply to message"
          >
            <Reply className="w-4 h-4" />
          </motion.button>
          {isOwnMessage && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(message.id)}
              className="text-gray-500 hover:text-red-400 transition-colors"
              title="Delete message"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {message.replyTo && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="mb-2 pl-4 border-l-2 border-gray-700"
          >
            <div className="text-sm text-purple-400">
              Reply to {message.replyTo.anonymousUsername}
            </div>
            <div className="text-sm text-gray-400">
              {decryptMessage(message.replyTo.text)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {decryptedText && (
        <motion.p 
          className="text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {decryptedText}
        </motion.p>
      )}
      {message.attachment && (
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          {isVoiceMessage ? (
            <AudioPlayer audioUrl={message.attachment.url} />
          ) : (
            <FilePreview file={message.attachment} />
          )}
        </motion.div>
      )}
      <MessageReactions
        reactions={message.reactions}
        messageId={message.id}
        username={currentUsername}
        onReact={onReact}
      />
    </motion.div>
  );
}