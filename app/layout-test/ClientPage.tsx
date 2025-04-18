"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  sender: string;
  text: string;
}

function ClientPage() {
  const [containerHeight, setContainerHeight] = useState("100dvh");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.visualViewport) {
  //       setContainerHeight(`${window.visualViewport.height}px`);
  //     } else {
  //       // Fallback for older browsers that don't support visualViewport
  //       setContainerHeight(`${window.innerHeight}px`);
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("resize", handleResize);
  //     handleResize(); // Initial calculation
  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   // Optionally, scroll to the bottom when new messages are added
  // if (chatContainerRef.current) {
  //   chatContainerRef.current.scrollTop =
  //     chatContainerRef.current.scrollHeight;
  // }
  // }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      const newMessage: Message = {
        id: Math.random().toString(),
        sender: "User", // Replace with actual user identification
        text: inputText,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputText("");
      // if (inputRef.current) {
      //   inputRef.current.focus();
      // }
      // setTimeout(() => {
      //   if (chatContainerRef.current) {
      //     chatContainerRef.current.scrollTop =
      //       chatContainerRef.current.scrollHeight;
      //   }
      // }, 0);
    }
  };

  const pixelHeight = containerHeight.replaceAll("px", "");

  return (
    <div className="flex flex-col h-[100dvh]">
      <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex w-full",
                message.sender === "User" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "rounded-lg px-4 py-2 max-w-[70%] sm:max-w-[50%]",
                  message.sender === "User"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800 mr-auto"
                )}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="sticky bottom-0 left-0 p-4 border-t border-gray-200 flex items-center gap-2"
        style={{ bottom: 0 }}
      >
        <input
          ref={inputRef}
          type="text"
          placeholder={pixelHeight}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          autoFocus
          className="flex-1"
        />
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ClientPage;
