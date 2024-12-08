import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types/chat';
import { messageService } from '../services/messageService';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

export function useMessages(roomId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  const loadMessages = useCallback(async () => {
    try {
      const fetchedMessages = await messageService.getMessages(roomId);
      setMessages(fetchedMessages);
    } catch (error) {
      toast.error('Failed to load messages');
    } finally {
      setIsLoading(false);
    }
  }, [roomId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  const sendMessage = async (text: string, attachment?: FileAttachment, replyToId?: string) => {
    if (!user) return;

    try {
      const message = await messageService.sendMessage(roomId, {
        text,
        anonymousUsername: user.username,
        expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        attachment,
        replyTo: replyToId ? messages.find(m => m.id === replyToId) : undefined,
      });

      setMessages(prev => [...prev, message]);
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      await messageService.deleteMessage(roomId, messageId);
      setMessages(prev => prev.filter(m => m.id !== messageId));
    } catch (error) {
      toast.error('Failed to delete message');
    }
  };

  const addReaction = async (messageId: string, emoji: string) => {
    if (!user) return;

    try {
      await messageService.addReaction(roomId, messageId, user.username, emoji);
      await loadMessages(); // Reload messages to get updated reactions
    } catch (error) {
      toast.error('Failed to add reaction');
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    deleteMessage,
    addReaction,
  };
}