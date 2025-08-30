import { useEffect, useState, useCallback } from "react"

interface Message {
    text: string;
    isUser: boolean;
}

const useWebSocket = () => {
    const [ws, setWs] = useState<WebSocket | undefined>();
    const [messages, setMessages] = useState<Message[]>([{
        text: "Welcome, how can I help you today?",
        isUser: false
    }]);
    const [isLoading, setIsLoading] = useState(false);

    const connect = useCallback(() => {
        try {
            const websocket = new WebSocket("ws://localhost:8000/chat");
            setWs(websocket);
            
            websocket.onmessage = (event) => {
                const chatResponse = JSON.parse(event.data)                
                const updatedMessages = messages
                updatedMessages.push({
                    text: chatResponse,
                    isUser: false
                });
                setMessages(updatedMessages);
                setIsLoading(false);
            };
            
            websocket.onerror = (error) => {
                console.log("error encountered", error);
                setIsLoading(false);
            }

            websocket.onclose = (event) => {
                console.log('Disconnected from WebSocket server', event.code, event.reason);
            };
        } catch (error) {
            console.error("Failed to create WebSocket connection:", error);
        }
    }, []);

    useEffect(() => {
        connect();     
    }, [connect]);

    const sendMessage = (input: string) => {
        if (ws && ws.readyState === WebSocket.OPEN) {

            const updatedMessages = messages
            updatedMessages.push({
                text: input,
                isUser: true
            });
            setMessages(updatedMessages);

            ws.send(input);
            setIsLoading(true);
        } else {
            console.warn("WebSocket is not connected. Message not sent:", input);
        }
    };

    return {
        sendMessage,
        isLoading,
        messages, 
    }
}

export default useWebSocket;