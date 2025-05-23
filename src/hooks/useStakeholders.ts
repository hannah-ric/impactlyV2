import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, Stakeholder, EngagementRecord } from "@/lib/api";

export function useStakeholders() {
  const queryClient = useQueryClient();

  const stakeholdersQuery = useQuery({
    queryKey: ["stakeholders"],
    queryFn: api.getStakeholders,
  });

  const createStakeholderMutation = useMutation({
    mutationFn: (stakeholder: Omit<Stakeholder, "id">) => {
      return api.createStakeholder(stakeholder);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
    },
  });

  const updateStakeholderMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<Stakeholder>;
    }) => {
      return api.updateStakeholder(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
    },
  });

  const deleteStakeholderMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteStakeholder(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
    },
  });

  return {
    stakeholders: stakeholdersQuery.data || [],
    isLoading: stakeholdersQuery.isLoading,
    isError: stakeholdersQuery.isError,
    error: stakeholdersQuery.error,
    createStakeholder: createStakeholderMutation.mutate,
    updateStakeholder: updateStakeholderMutation.mutate,
    deleteStakeholder: deleteStakeholderMutation.mutate,
    isCreating: createStakeholderMutation.isPending,
    isUpdating: updateStakeholderMutation.isPending,
    isDeleting: deleteStakeholderMutation.isPending,
  };
}

export function useStakeholder(id: string) {
  const queryClient = useQueryClient();

  const stakeholderQuery = useQuery({
    queryKey: ["stakeholder", id],
    queryFn: () => api.getStakeholder(id),
    enabled: !!id,
  });

  const updateStakeholderMutation = useMutation({
    mutationFn: (updates: Partial<Stakeholder>) => {
      if (!id)
        throw new Error(
          "Cannot update stakeholder: No stakeholder ID provided",
        );
      return api.updateStakeholder(id, updates);
    },
    onSuccess: (updatedStakeholder) => {
      queryClient.setQueryData(["stakeholder", id], updatedStakeholder);
      queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
    },
  });

  return {
    stakeholder: stakeholderQuery.data,
    isLoading: stakeholderQuery.isLoading,
    isError: stakeholderQuery.isError,
    error: stakeholderQuery.error,
    updateStakeholder: updateStakeholderMutation.mutate,
    isUpdating: updateStakeholderMutation.isPending,
  };
}

export function useEngagements(stakeholderId?: string) {
  const queryClient = useQueryClient();

  const engagementsQuery = useQuery({
    queryKey: ["engagements", stakeholderId],
    queryFn: () => api.getEngagements(stakeholderId),
  });

  const createEngagementMutation = useMutation({
    mutationFn: (engagement: Omit<EngagementRecord, "id">) => {
      return api.createEngagement(engagement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["engagements"] });
      queryClient.invalidateQueries({ queryKey: ["stakeholders"] });
    },
  });

  return {
    engagements: engagementsQuery.data || [],
    isLoading: engagementsQuery.isLoading,
    isError: engagementsQuery.isError,
    error: engagementsQuery.error,
    createEngagement: createEngagementMutation.mutate,
    isCreating: createEngagementMutation.isPending,
  };
}
