import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000'; // Your backend socket.io server URL

const AudioStreamer: React.FC = () => {
    const socketRef = useRef<Socket | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [isStreaming, setIsStreaming] = useState(false);
    const [receivedAudioChunks, setReceivedAudioChunks] = useState<Blob[]>([]);

    // Setup socket.io connection
    useEffect(() => {
        const socket = io(SOCKET_URL, {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Socket connected:', socket.id);
        });

        socket.on('audio-data', (data: ArrayBuffer) => {
            // Receive audio chunk from backend
            const audioBlob = new Blob([data], { type: 'audio/webm' });
            setReceivedAudioChunks((chunks) => [...chunks, audioBlob]);
        });

        socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });

        socketRef.current = socket;

        return () => {
            socket.disconnect();
        };
    }, []);

    // Play received audio chunks
    useEffect(() => {
        if (receivedAudioChunks.length === 0) return;

        const lastChunk = receivedAudioChunks[receivedAudioChunks.length - 1];
        const url = URL.createObjectURL(lastChunk);
        const audio = new Audio(url);
        audio.play();

        return () => {
            URL.revokeObjectURL(url);
        };
    }, [receivedAudioChunks]);

    // Start capturing and sending audio
    const startStreaming = async () => {
        if (isStreaming) return;
        setIsStreaming(true);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm',
            });

            mediaRecorder.ondataavailable = (event) => {
                if (
                    event.data.size > 0 &&
                    socketRef.current &&
                    socketRef.current.connected
                ) {
                    event.data.arrayBuffer().then((buffer) => {
                        socketRef.current?.emit('audio-data', buffer);
                    });
                }
            };

            mediaRecorder.start(250); // send every 250ms
            mediaRecorderRef.current = mediaRecorder;
        } catch (error) {
            console.error('Could not start audio streaming', error);
            setIsStreaming(false);
        }
    };

    // Stop audio streaming
    const stopStreaming = () => {
        if (!isStreaming) return;

        mediaRecorderRef.current?.stop();
        mediaRecorderRef.current = null;
        setIsStreaming(false);
    };

    return (
        <div>
            <h2>Socket.IO Audio Streamer</h2>
            <button onClick={startStreaming} disabled={isStreaming}>
                Start Streaming
            </button>
            <button onClick={stopStreaming} disabled={!isStreaming}>
                Stop Streaming
            </button>
            <p>Status: {isStreaming ? 'Streaming...' : 'Stopped'}</p>
        </div>
    );
};

export default AudioStreamer;
