import React from 'react';
import { TypingUser } from '../types/chat';

interface TypingIndicatorProps {
  typingUsers: TypingUser[];
  currentUser: string;
}

export function TypingIndicator({ typingUsers, currentUser }: TypingIndicatorProps) {
  const otherTypingUsers = typingUsers.filter(user => user.username !== currentUser);
  
  if (otherTypingUsers.length === 0) return null;

  return (
    <div className="text-gray-400 text-sm italic flex items-center space-x-2">
      <div className="flex space-x-1">
        <span className="animate-bounce">•</span>
        <span className="animate-bounce delay-100">•</span>
        <span className="animate-bounce delay-200">•</span>
      </div>
      <span>
        {otherTypingUsers.length === 1
          ? `${otherTypingUsers[0].username} is typing...`
          : `${otherTypingUsers.length} people are typing...`}
      </span>
    </div>
  );
}