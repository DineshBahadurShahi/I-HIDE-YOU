import React, { useState, useRef, useEffect } from 'react';
import RecordRTC from 'recordrtc';
import { Mic, Square, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface VoiceRecorderProps {
  onSend: (audioBlob: Blob) => void;
  onCancel: () => void;
}

export function VoiceRecorder({ onSend, onCancel }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const recorderRef = useRef<RecordRTC>();
  const timerRef = useRef<number>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (recorderRef.current) {
        recorderRef.current.destroy();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recorderRef.current = new RecordRTC(stream, {
        type: 'audio',
        mimeType: 'audio/webm',
        recorderType: RecordRTC.StereoAudioRecorder,
        numberOfAudioChannels: 1,
        desiredSampRate: 16000,
      });

      recorderRef.current.startRecording();
      setIsRecording(true);
      setDuration(0);

      timerRef.current = window.setInterval(() => {
        setDuration(d => d + 1);
      }, 1000);
    } catch (error) {
      toast.error('Unable to access microphone');
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (!recorderRef.current) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current!.getBlob();
      onSend(blob);
      cleanup();
    });
  };

  const cancelRecording = () => {
    cleanup();
    onCancel();
  };

  const cleanup = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (recorderRef.current) {
      recorderRef.current.destroy();
    }
    setIsRecording(false);
    setDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center space-x-4 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
        >
          <Mic className="w-5 h-5 text-white" />
        </button>
      ) : (
        <>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
            <span className="text-white font-medium">{formatDuration(duration)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={stopRecording}
              className="p-2 bg-purple-600 hover:bg-purple-700 rounded-full transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={cancelRecording}
              className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}