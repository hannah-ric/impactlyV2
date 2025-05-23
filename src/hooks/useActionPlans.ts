import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, ActionPlan, Task } from "@/lib/api";

export function useActionPlans() {
  const queryClient = useQueryClient();

  const plansQuery = useQuery({
    queryKey: ["actionPlans"],
    queryFn: api.getActionPlans,
  });

  const createPlanMutation = useMutation({
    mutationFn: (plan: Omit<ActionPlan, "id">) => {
      return api.createActionPlan(plan);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actionPlans"] });
    },
  });

  return {
    plans: plansQuery.data || [],
    isLoading: plansQuery.isLoading,
    isError: plansQuery.isError,
    error: plansQuery.error,
    createPlan: createPlanMutation.mutate,
    isCreating: createPlanMutation.isPending,
  };
}

export function useActionPlan(id?: string) {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["actionPlan", id],
    queryFn: () => (id ? api.getActionPlan(id) : undefined),
    enabled: !!id,
  });

  const updatePlanMutation = useMutation({
    mutationFn: (updates: Partial<ActionPlan>) => {
      if (!id) throw new Error("No plan ID provided");
      return api.updateActionPlan(id, updates);
    },
    onSuccess: (updatedPlan) => {
      queryClient.setQueryData(["actionPlan", id], updatedPlan);
      queryClient.invalidateQueries({ queryKey: ["actionPlans"] });
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: (task: Omit<Task, "id">) => {
      if (!id) throw new Error("No plan ID provided");
      return api.createTask(id, task);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actionPlan", id] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({
      taskId,
      updates,
    }: {
      taskId: string;
      updates: Partial<Task>;
    }) => {
      if (!id) throw new Error("No plan ID provided");
      return api.updateTask(id, taskId, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actionPlan", id] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: string) => {
      if (!id) throw new Error("No plan ID provided");
      return api.deleteTask(id, taskId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["actionPlan", id] });
    },
  });

  return {
    plan: planQuery.data,
    isLoading: planQuery.isLoading,
    isError: planQuery.isError,
    error: planQuery.error,
    updatePlan: updatePlanMutation.mutate,
    isUpdating: updatePlanMutation.isPending,
    createTask: createTaskMutation.mutate,
    isCreatingTask: createTaskMutation.isPending,
    updateTask: updateTaskMutation.mutate,
    isUpdatingTask: updateTaskMutation.isPending,
    deleteTask: deleteTaskMutation.mutate,
    isDeletingTask: deleteTaskMutation.isPending,
  };
}

export function useActionPlanByTopic(topicId?: string) {
  const queryClient = useQueryClient();

  const planQuery = useQuery({
    queryKey: ["actionPlanByTopic", topicId],
    queryFn: () => (topicId ? api.getActionPlanByTopic(topicId) : undefined),
    enabled: !!topicId,
  });

  const createPlanMutation = useMutation({
    mutationFn: (plan: Omit<ActionPlan, "id">) => {
      return api.createActionPlan(plan);
    },
    onSuccess: (newPlan) => {
      queryClient.setQueryData(["actionPlanByTopic", topicId], newPlan);
      queryClient.invalidateQueries({ queryKey: ["actionPlans"] });
    },
  });

  return {
    plan: planQuery.data,
    isLoading: planQuery.isLoading,
    isError: planQuery.isError,
    error: planQuery.error,
    createPlan: createPlanMutation.mutate,
    isCreating: createPlanMutation.isPending,
  };
}
