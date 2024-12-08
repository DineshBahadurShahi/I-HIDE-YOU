import React, { useState } from 'react';
import { X, Lock, Globe } from 'lucide-react';
import { CreateRoomData } from '../../types/chatRoom';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateRoom: (data: CreateRoomData) => Promise<void>;
}

export function CreateRoomModal({ isOpen, onClose, onCreateRoom }: CreateRoomModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateRoomData>({
    name: '',
    isPrivate: false,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onCreateRoom(formData);
      setFormData({ name: '', isPrivate: false });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Create Chat Room</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="room-name" className="block text-sm font-medium text-gray-300 mb-1">
              Room Name
            </label>
            <input
              type="text"
              id="room-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter room name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPrivate: false })}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                !formData.isPrivate
                  ? 'bg-green-500/20 border-green-500 text-green-400'
                  : 'border-gray-600 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Globe className="w-5 h-5" />
              <span>Public</span>
            </button>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, isPrivate: true })}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg border ${
                formData.isPrivate
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                  : 'border-gray-600 text-gray-400 hover:bg-gray-700'
              }`}
            >
              <Lock className="w-5 h-5" />
              <span>Private</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </div>
            ) : (
              'Create Room'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}