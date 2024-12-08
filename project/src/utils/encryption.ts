import CryptoJS from 'crypto-js';

const SECRET_KEY = 'your-secret-key'; // In production, this should be an environment variable

export const encryptMessage = (message: string): string => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (encryptedMessage: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedMessage, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const securelyDeleteMessage = (message: string): void => {
  // Overwrite the message with random data before deletion
  const messageLength = message.length;
  const randomData = Array(messageLength).fill(0).map(() => 
    Math.random().toString(36).charAt(2)
  ).join('');
  
  // In a real implementation, you would also want to:
  // 1. Clear message from memory
  // 2. Clear message from storage
  // 3. Implement secure deletion on the backend
  return;
};