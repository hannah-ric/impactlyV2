import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, AssessmentResult } from "@/lib/api";

export function useAssessmentResults() {
  const queryClient = useQueryClient();

  const assessmentResultsQuery = useQuery({
    queryKey: ["assessmentResults"],
    queryFn: api.getAssessmentResults,
  });

  const createAssessmentResultMutation = useMutation({
    mutationFn: (result: Omit<AssessmentResult, "id">) => {
      return api.createAssessmentResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentResults"] });
    },
  });

  const updateAssessmentResultMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<AssessmentResult>;
    }) => {
      return api.updateAssessmentResult(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentResults"] });
    },
  });

  const deleteAssessmentResultMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteAssessmentResult(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assessmentResults"] });
    },
  });

  return {
    assessmentResults: assessmentResultsQuery.data || [],
    isLoading: assessmentResultsQuery.isLoading,
    isError: assessmentResultsQuery.isError,
    error: assessmentResultsQuery.error,
    createAssessmentResult: createAssessmentResultMutation.mutate,
    updateAssessmentResult: updateAssessmentResultMutation.mutate,
    deleteAssessmentResult: deleteAssessmentResultMutation.mutate,
    isCreating: createAssessmentResultMutation.isPending,
    isUpdating: updateAssessmentResultMutation.isPending,
    isDeleting: deleteAssessmentResultMutation.isPending,
  };
}

export function useAssessmentResult(id: string) {
  const queryClient = useQueryClient();

  const assessmentResultQuery = useQuery({
    queryKey: ["assessmentResult", id],
    queryFn: () => api.getAssessmentResult(id),
    enabled: !!id,
  });

  const updateAssessmentResultMutation = useMutation({
    mutationFn: (updates: Partial<AssessmentResult>) => {
      if (!id)
        throw new Error(
          "Cannot update assessment result: No result ID provided",
        );
      return api.updateAssessmentResult(id, updates);
    },
    onSuccess: (updatedResult) => {
      queryClient.setQueryData(["assessmentResult", id], updatedResult);
      queryClient.invalidateQueries({ queryKey: ["assessmentResults"] });
    },
  });

  return {
    assessmentResult: assessmentResultQuery.data,
    isLoading: assessmentResultQuery.isLoading,
    isError: assessmentResultQuery.isError,
    error: assessmentResultQuery.error,
    updateAssessmentResult: updateAssessmentResultMutation.mutate,
    isUpdating: updateAssessmentResultMutation.isPending,
  };
}
