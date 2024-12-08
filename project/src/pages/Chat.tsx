import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Shield, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMessages } from '../hooks/useMessages';
import { MessageInput } from '../components/MessageInput';
import { Message as MessageComponent } from '../components/Message';
import { TypingIndicator } from '../components/TypingIndicator';
import { ShareRoomModal } from '../components/chat/ShareRoomModal';
import { Message as MessageType, TypingUser } from '../types/chat';
import toast from 'react-hot-toast';

const TYPING_EXPIRY_TIME = 3000; // 3 seconds

export function Chat() {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { messages, isLoading, sendMessage, deleteMessage, addReaction } = useMessages(roomId!);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [replyTo, setReplyTo] = useState<MessageType['replyTo']>();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!roomId) {
      navigate('/rooms');
      return;
    }
  }, [roomId, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setTypingUsers(prev => prev.filter(user => now - user.timestamp < TYPING_EXPIRY_TIME));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (text: string, attachment?: { file: File; thumbnail?: string }) => {
    if (!user || !roomId) return;

    try {
      await sendMessage(text, attachment, replyTo?.id);
      setReplyTo(undefined);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleTyping = () => {
    if (!user) return;

    setTypingUsers(prev => {
      const existing = prev.find(u => u.username === user.username);
      if (existing) {
        return prev.map(u =>
          u.username === user.username
            ? { ...u, timestamp: Date.now() }
            : u
        );
      }
      return [...prev, { username: user.username, timestamp: Date.now() }];
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-black/30 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-purple-500" />
            <span className="text-white font-semibold">Anonymous Chat</span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 rounded-lg text-white text-sm transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Room</span>
            </button>
            <div className="text-gray-400 text-sm">
              Room ID: <span className="text-purple-400">{roomId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <MessageComponent
              key={message.id}
              message={message}
              currentUsername={user?.username || ''}
              onDelete={deleteMessage}
              onReact={addReaction}
              onReply={setReplyTo}
            />
          ))}
          <div className="p-2">
            <TypingIndicator
              typingUsers={typingUsers}
              currentUser={user?.username || ''}
            />
          </div>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <MessageInput
            onSendMessage={handleSendMessage}
            onTyping={handleTyping}
            replyTo={replyTo}
            onCancelReply={() => setReplyTo(undefined)}
          />
        </div>
      </div>

      <ShareRoomModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        roomId={roomId!}
      />
    </div>
  );
}