import { useState, useEffect, useRef, useCallback } from "react";

const useWebSocket = (url) => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState("NO");
  const wsRef = useRef(null);
  const reconnectInterval = useRef(1000); // Initial reconnect interval

  const connect = useCallback(() => {
    if (wsRef.current) {
      console.warn("WebSocket is already connected or connecting.");
      return;
    }

    wsRef.current = new WebSocket(url);

    wsRef.current.onopen = () => {
      setIsConnected("YES");
      reconnectInterval.current = 1000; // Reset reconnect interval
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, data]);
      if (!data.status && data.message === "invalid_data")
        setIsConnected("ERROR_DATA");
      else setIsConnected("YES");
    };

    wsRef.current.onclose = () => {
      setIsConnected("NO");
      wsRef.current = null;
      // Exponential backoff
      reconnectInterval.current = Math.min(
        reconnectInterval.current * 2,
        30000
      );
      setTimeout(connect, reconnectInterval.current);
    };

    wsRef.current.onerror = (error) => {
      setIsConnected("ERROR");
      console.error("WebSocket error:", error);
    };
  }, [url]);

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect, url]);

  const sendMessage = (message) => {
    if (wsRef.current) {
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error("Cannot send message. WebSocket is not connected.");
    }
  };

  return { messages, isConnected, sendMessage };
};

export default useWebSocket;