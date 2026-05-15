import {
  deleteConversation,
  getAllConversations,
  getConversationStatus,
  updateConversationStatus,
} from "@/lib/api/conversation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTransitionRouter } from "next-view-transitions";
import { toast } from "sonner";

export const useGetConversations = (workspaceId: string, status: string) => {
  return useQuery({
    queryKey: ["conversations", workspaceId, status],
    queryFn: () => getAllConversations(workspaceId, status),
    enabled: !!workspaceId,
    retry: false,
    gcTime: 5 * 60 * 1000,
  });
};

export const useConversationStatus = (conversationId: string) => {
  return useQuery({
    queryKey: ["conversationStatus", conversationId],
    queryFn: () => getConversationStatus(conversationId),
    enabled: !!conversationId,
    retry: false,
    gcTime: 5 * 60 * 1000,
  });
};

export const useUpdateConversationStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      conversationId,
      status,
    }: {
      conversationId: string;
      status: string;
    }) => updateConversationStatus(conversationId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversationStatus"] });
    },
    onError: (error) => {
      toast.error(
        `Error updating conversation status: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });
};

export const useDeleteConversation = () => {
  const queryClient = useQueryClient();
  const router = useTransitionRouter();
  return useMutation({
    mutationFn: (conversationId: string) => deleteConversation(conversationId),
    onSuccess: (_data, conversationId) => {
      queryClient.setQueriesData(
        { queryKey: ["conversations"] },
        (oldData: unknown) => {
          if (
            !oldData ||
            typeof oldData !== "object" ||
            !("conversations" in oldData)
          ) {
            return oldData;
          }

          const data = oldData as { conversations?: { id: string }[] };
          return {
            ...data,
            conversations: data.conversations?.filter(
              (conversation) => conversation.id !== conversationId,
            ),
          };
        },
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.removeQueries({
        queryKey: ["conversationStatus", conversationId],
      });
      queryClient.removeQueries({ queryKey: ["messages"], exact: false });
      router.push("/dashboard/inbox");
    },
    onError: (error) => {
      toast.error(
        `Error deleting conversation: ${error instanceof Error ? error.message : String(error)}`
      );
    },
  });
};
