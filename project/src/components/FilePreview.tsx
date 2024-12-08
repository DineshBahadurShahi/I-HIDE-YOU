import React from 'react';
import { FileIcon, X, FileImage, FileText, FileArchive, FileVideo, FileAudio } from 'lucide-react';
import { FileAttachment } from '../types/chat';

interface FilePreviewProps {
  file: File | FileAttachment;
  onRemove?: () => void;
  className?: string;
}

const FILE_ICONS = {
  'image': FileImage,
  'video': FileVideo,
  'audio': FileAudio,
  'text': FileText,
  'application': FileArchive,
} as const;

export function FilePreview({ file, onRemove, className = '' }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');
  const fileType = file.type.split('/')[0];
  const Icon = FILE_ICONS[fileType as keyof typeof FILE_ICONS] || FileIcon;
  const isFileAttachment = 'url' in file;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`relative group ${className}`}>
      <div className="flex items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
        {isImage && isFileAttachment ? (
          <img
            src={file.url}
            alt={file.name}
            className="w-12 h-12 object-cover rounded"
          />
        ) : (
          <Icon className="w-12 h-12 text-purple-400" />
        )}
        <div className="ml-3 flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{file.name}</p>
          <p className="text-xs text-gray-400">{formatFileSize(file.size)}</p>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="ml-2 p-1 text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}