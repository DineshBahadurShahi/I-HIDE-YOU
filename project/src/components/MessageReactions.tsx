import React from 'react';
import { Reaction } from '../types/chat';

const AVAILABLE_REACTIONS = ['👍', '❤️', '😂', '😮', '😢', '😡'];

interface MessageReactionsProps {
  reactions: Record<string, Reaction>;
  messageId: string;
  username: string;
  onReact: (messageId: string, emoji: string) => void;
}

export function MessageReactions({ reactions, messageId, username, onReact }: MessageReactionsProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {AVAILABLE_REACTIONS.map(emoji => {
        const reaction = reactions[emoji] || { emoji, count: 0, users: [] };
        const hasReacted = reaction.users.includes(username);
        
        return (
          <button
            key={emoji}
            onClick={() => onReact(messageId, emoji)}
            className={`px-2 py-1 rounded-full text-sm ${
              hasReacted 
                ? 'bg-purple-500/30 border-purple-500' 
                : 'bg-gray-800/30 hover:bg-gray-700/30 border-gray-700'
            } border transition-colors`}
          >
            <span className="mr-1">{emoji}</span>
            {reaction.count > 0 && (
              <span className="text-xs text-gray-400">{reaction.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}