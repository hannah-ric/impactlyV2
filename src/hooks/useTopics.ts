import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Topic } from "@/lib/api";
import { handleAPIError } from "@/lib/errors";
import { useCallback } from "react";

export function useTopics() {
  const queryClient = useQueryClient();

  const topicsQuery = useQuery({
    queryKey: ["topics"],
    queryFn: api.getTopics,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const updateTopicMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Topic> }) => {
      return api.updateTopic(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("Failed to update topic:", handleAPIError(error));
    },
  });

  const createTopicMutation = useMutation({
    mutationFn: (topic: Omit<Topic, "id">) => {
      return api.createTopic(topic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("Failed to create topic:", handleAPIError(error));
    },
  });

  const deleteTopicMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteTopic(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
    onError: (error) => {
      console.error("Failed to delete topic:", handleAPIError(error));
    },
  });

  // Memoized functions
  const updateTopic = useCallback(
    (id: string, updates: Partial<Topic>) => {
      updateTopicMutation.mutate({ id, updates });
    },
    [updateTopicMutation],
  );

  const createTopic = useCallback(
    (topic: Omit<Topic, "id">) => {
      createTopicMutation.mutate(topic);
    },
    [createTopicMutation],
  );

  const deleteTopic = useCallback(
    (id: string) => {
      deleteTopicMutation.mutate(id);
    },
    [deleteTopicMutation],
  );

  return {
    topics: topicsQuery.data || [],
    isLoading: topicsQuery.isLoading,
    isError: topicsQuery.isError,
    error: topicsQuery.error ? handleAPIError(topicsQuery.error) : null,
    updateTopic,
    createTopic,
    deleteTopic,
    isUpdating: updateTopicMutation.isPending,
    isCreating: createTopicMutation.isPending,
    isDeleting: deleteTopicMutation.isPending,
    refetch: topicsQuery.refetch,
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
