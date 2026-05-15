"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const getEventsUrl = (workspaceId: string, conversationId: string) => {
  const apiBaseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api/v1";
  return `${apiBaseUrl}/workspace/${workspaceId}/conversations/${conversationId}/events`;
};

export const useConversationEvents = (
  workspaceId: string,
  conversationId: string,
  onDeleted?: () => void,
) => {
  const queryClient = useQueryClient();
  const onDeletedRef = useRef(onDeleted);

  useEffect(() => {
    onDeletedRef.current = onDeleted;
  }, [onDeleted]);

  useEffect(() => {
    if (!workspaceId || !conversationId) return;

    const events = new EventSource(getEventsUrl(workspaceId, conversationId), {
      withCredentials: true,
    });

    const refreshConversation = () => {
      queryClient.invalidateQueries({
        queryKey: ["conversationMessages", conversationId],
      });
      queryClient.invalidateQueries({ queryKey: ["last-message"] });
    };

    events.addEventListener("message", refreshConversation);
    events.addEventListener("status", refreshConversation);
    events.addEventListener("deleted", () => {
      queryClient.removeQueries({
        queryKey: ["conversationMessages", conversationId],
      });
      onDeletedRef.current?.();
    });

    events.onerror = () => {
      events.close();
    };

    return () => {
      events.close();
    };
  }, [conversationId, queryClient, workspaceId]);
};
