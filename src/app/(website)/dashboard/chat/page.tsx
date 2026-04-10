"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Message } from "../../../../../types/chat";
import { MessageList } from "@/components/chat/message-list";
import { MessageInput } from "@/components/chat/message-input";
// import { AvatarWithStatus } from "@/components/ui/avatar-with-status";
import { connectSocket, disconnectSocket } from "../../../../lib/socket";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";

export default function UserChatPage() {
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);


 

  const userInfo = session?.user;

  // Redirect if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      redirect("/login");
    }
  }, [status]);

  // Get or create chat ID
  useEffect(() => {
    const fetchChatId = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/chat-id`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setChatId(data.data);
        }
      } catch (error) {
        console.error("Error fetching chat ID:", error);
      }
    };

    fetchChatId();
  }, [session?.accessToken]);

  // Connect to socket when chat ID is available
  // useEffect(() => {
  //   if (session?.accessToken && chatId) {
  //     const socket = connectSocket(session.accessToken, chatId);

  //     socket.on("newMessage", (newMessage: Message) => {
  //       setMessages((prev) => [...prev, newMessage]);
  //     });

  //     return () => {
  //       disconnectSocket();
  //     };
  //   }
  // }, [session?.accessToken, chatId]);

  useEffect(() => {
    // Load messagesuseEffect(() => {
    if (session?.accessToken && chatId) {
      const socket = connectSocket(session.accessToken, chatId);

      socket.emit("joinRoom", chatId);

      socket.on("newMessage", (newMessage: Message) => {
        setMessages((prev) => [...prev, newMessage]);
       
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [session?.accessToken, chatId]);
  useEffect(() => {
    const fetchMessages = async () => {
      if (!session?.accessToken || !session?.user?.id) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/${session.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.status) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [session?.accessToken, session?.user?.id]);

  const handleSendMessage = async (messageText: string) => {
    if (!session?.accessToken) return;

    try {
      // For users, we don't need to specify a receiver as they can only message admins/staff
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/messages/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: JSON.stringify({
            message: messageText,
          }),
        }
      );

      const data = await response.json();
      if (data.status) {
        // Socket will handle adding the message to the UI
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Client Name"
      subtitle="Client Dashboard"
      userName={userInfo?.name}
      userRole={userInfo?.role}
    >
      <div className="flex flex-col h-[90vh]">
        {/* <div className="h-16 border-b flex items-center px-4 justify-between">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold">Client Name</h1>
            <p className="text-sm text-gray-500">Client Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <AvatarWithStatus
              name={session?.user?.name || "User"}
              status="online"
            />
            <div>
              <p className="font-medium text-sm">{session?.user?.name}</p>
              <p className="text-xs text-gray-500">Customer</p>
            </div>
          </div>
        </div> */}

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </DashboardLayout>
  );
}
