import imageCompression from 'browser-image-compression';
import { FileAttachment } from '../types/chat';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
};

export async function processFile(file: File): Promise<{ file: File; thumbnail?: string }> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }

  if (file.type.startsWith('image/')) {
    try {
      const compressedFile = await imageCompression(file, IMAGE_COMPRESSION_OPTIONS);
      const thumbnail = await createImageThumbnail(compressedFile);
      return { file: compressedFile, thumbnail };
    } catch (error) {
      console.error('Error compressing image:', error);
      return { file };
    }
  }

  return { file };
}

async function createImageThumbnail(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const img = new Image();
        img.src = e.target?.result as string;
        await new Promise((res) => (img.onload = res));

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        const MAX_THUMB_SIZE = 100;

        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_THUMB_SIZE) {
            height = Math.round((height * MAX_THUMB_SIZE) / width);
            width = MAX_THUMB_SIZE;
          }
        } else {
          if (height > MAX_THUMB_SIZE) {
            width = Math.round((width * MAX_THUMB_SIZE) / height);
            height = MAX_THUMB_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function createObjectURL(file: File): string {
  return URL.createObjectURL(file);
}

export function revokeObjectURL(url: string): void {
  URL.revokeObjectURL(url);
}