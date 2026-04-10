"use client";

import { useState, useEffect } from "react";
import type { Conversation } from "../../../types/chat";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AvatarWithStatus } from "@/components/ui/avatar-with-status";

interface ConversationListProps {
  activeConversationId: string | null;
  onSelectConversation: (conversation: Conversation) => void;
}

export function ConversationList({
  activeConversationId,
  onSelectConversation,
}: ConversationListProps) {
  const { data: session } = useSession();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!session?.accessToken) return;

      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/messages/getallchat`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data?.status) {
          setConversations(Array.isArray(data.data) ? data.data : []);
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
        setConversations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, [session?.accessToken]);

  const filteredConversations = conversations;

  

  return (
    <div className="flex flex-col h-full border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search Message....."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading conversations...</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              {searchQuery
                ? "No matching conversations found"
                : "No conversations"}
            </p>
          </div>
        ) : (
          filteredConversations.map((conversation) => {
            if (!conversation) return null;

            const lastMessage = conversation.messages?.length
              ? conversation.messages[conversation.messages.length - 1]
              : null;

            const hasUnreadMessages =
              conversation.messages?.some(
                (msg) => msg && !msg.read && msg.receiver === session?.user?.id
              ) ?? false;

            return (
              <div
                key={
                  conversation._id ?? Math.random().toString(36).substring(2, 9)
                }
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                  activeConversationId === conversation._id ? "bg-gray-100" : ""
                }`}
                onClick={() =>
                  conversation && onSelectConversation(conversation)
                }
              >
                <div className="flex items-center gap-3">
                  <AvatarWithStatus
                    name={conversation.client?.name ?? "Unknown"}
                    status="online"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate">
                        {conversation.client?.name ?? "Unknown"}
                      </h3>
                      {lastMessage?.createdAt && (
                        <span className="text-xs text-gray-500">
                          {new Date(lastMessage.createdAt).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      )}
                    </div>
                    {lastMessage?.message && (
                      <p
                        className={`text-sm truncate ${
                          hasUnreadMessages ? "font-medium" : "text-gray-500"
                        }`}
                      >
                        {lastMessage.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
