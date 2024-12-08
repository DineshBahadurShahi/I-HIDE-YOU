import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { encryptMessage } from '../utils/encryption';
import { processFile, createObjectURL } from '../utils/file';
import { ReplyPreview } from './ReplyPreview';
import { FilePreview } from './FilePreview';
import { VoiceRecorder } from './VoiceRecorder';
import toast from 'react-hot-toast';

interface MessageInputProps {
  onSendMessage: (message: string, attachment?: { file: File; thumbnail?: string }, replyToId?: string) => void;
  onTyping: () => void;
  replyTo?: {
    id: string;
    text: string;
    anonymousUsername: string;
  };
  onCancelReply: () => void;
}

export function MessageInput({ onSendMessage, onTyping, replyTo, onCancelReply }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [lastTypingTime, setLastTypingTime] = useState(0);
  const [attachment, setAttachment] = useState<{ file: File; objectUrl: string }>();
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (attachment?.objectUrl) {
        URL.revokeObjectURL(attachment.objectUrl);
      }
    };
  }, [attachment]);

  const handleTyping = useCallback(() => {
    const now = Date.now();
    if (now - lastTypingTime > 1000) {
      onTyping();
      setLastTypingTime(now);
    }
  }, [lastTypingTime, onTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !attachment) return;

    try {
      const encryptedMessage = message.trim() ? encryptMessage(message.trim()) : '';
      
      if (attachment) {
        const { file, thumbnail } = await processFile(attachment.file);
        onSendMessage(encryptedMessage, { file, thumbnail }, replyTo?.id);
      } else {
        onSendMessage(encryptedMessage, undefined, replyTo?.id);
      }

      setMessage('');
      setAttachment(undefined);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const objectUrl = createObjectURL(file);
      setAttachment({ file, objectUrl });
    } catch (error) {
      toast.error('Failed to process file');
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    const file = new File([audioBlob], 'voice-message.webm', { type: 'audio/webm' });
    try {
      onSendMessage('', { file, thumbnail: undefined }, replyTo?.id);
    } catch (error) {
      toast.error('Failed to send voice message');
    }
    setIsRecording(false);
  };

  return (
    <div className="space-y-2">
      {replyTo && <ReplyPreview replyTo={replyTo} onCancelReply={onCancelReply} />}
      {attachment && (
        <FilePreview
          file={attachment.file}
          onRemove={() => setAttachment(undefined)}
          className="mb-2"
        />
      )}
      {isRecording ? (
        <VoiceRecorder
          onSend={handleVoiceMessage}
          onCancel={() => setIsRecording(false)}
        />
      ) : (
        <form onSubmit={handleSubmit} className="flex space-x-4">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type your message..."
            className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setIsRecording(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      )}
    </div>
  );
}