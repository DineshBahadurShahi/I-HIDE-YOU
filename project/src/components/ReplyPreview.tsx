import React from 'react';
import { X } from 'lucide-react';
import { decryptMessage } from '../utils/encryption';

interface ReplyPreviewProps {
  replyTo: {
    id: string;
    text: string;
    anonymousUsername: string;
  };
  onCancelReply: () => void;
}

export function ReplyPreview({ replyTo, onCancelReply }: ReplyPreviewProps) {
  const decryptedText = decryptMessage(replyTo.text);
  const previewText = decryptedText.length > 50 
    ? `${decryptedText.slice(0, 50)}...` 
    : decryptedText;

  return (
    <div className="flex items-center justify-between bg-gray-800/30 rounded-lg p-2 mb-2">
      <div className="flex-1">
        <span className="text-sm text-purple-400">
          Replying to {replyTo.anonymousUsername}
        </span>
        <p className="text-sm text-gray-400 truncate">{previewText}</p>
      </div>
      <button
        onClick={onCancelReply}
        className="ml-2 text-gray-500 hover:text-gray-400 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}