export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
}

export interface Reaction {
  emoji: string;
  count: number;
  users: string[];
}

export interface Message {
  id: string;
  text: string;
  timestamp: number;
  anonymousUsername: string;
  expiresAt: number;
  reactions: Record<string, Reaction>;
  attachment?: FileAttachment;
  replyTo?: {
    id: string;
    text: string;
    anonymousUsername: string;
  };
}

export interface TypingUser {
  username: string;
  timestamp: number;
}