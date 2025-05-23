import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Topic } from "@/lib/api";

export function useTopics() {
  const queryClient = useQueryClient();

  const topicsQuery = useQuery({
    queryKey: ["topics"],
    queryFn: api.getTopics,
  });

  const updateTopicMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Topic> }) => {
      return api.updateTopic(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  return {
    topics: topicsQuery.data || [],
    isLoading: topicsQuery.isLoading,
    isError: topicsQuery.isError,
    error: topicsQuery.error,
    updateTopic: updateTopicMutation.mutate,
    isUpdating: updateTopicMutation.isPending,
  };
}

export function useTopic(id: string) {
  const queryClient = useQueryClient();

  const topicQuery = useQuery({
    queryKey: ["topic", id],
    queryFn: () => api.getTopic(id),
    enabled: !!id,
  });

  const updateTopicMutation = useMutation({
    mutationFn: (updates: Partial<Topic>) => {
      if (!id) throw new Error("Cannot update topic: No topic ID provided");
      return api.updateTopic(id, updates);
    },
    onSuccess: (updatedTopic) => {
      queryClient.setQueryData(["topic", id], updatedTopic);
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  return {
    topic: topicQuery.data,
    isLoading: topicQuery.isLoading,
    isError: topicQuery.isError,
    error: topicQuery.error,
    updateTopic: updateTopicMutation.mutate,
    isUpdating: updateTopicMutation.isPending,
  };
}
