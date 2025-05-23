import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { MaterialityItem } from "@/types/materiality";

export function useMaterialityItems() {
  const queryClient = useQueryClient();

  const materialityItemsQuery = useQuery({
    queryKey: ["materialityItems"],
    queryFn: api.getMaterialityItems,
  });

  const createMaterialityItemMutation = useMutation({
    mutationFn: (item: Omit<MaterialityItem, "id">) => {
      return api.createMaterialityItem(item);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialityItems"] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  const updateMaterialityItemMutation = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<MaterialityItem>;
    }) => {
      return api.updateMaterialityItem(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialityItems"] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  const deleteMaterialityItemMutation = useMutation({
    mutationFn: (id: string) => {
      return api.deleteMaterialityItem(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materialityItems"] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  return {
    materialityItems: materialityItemsQuery.data || [],
    isLoading: materialityItemsQuery.isLoading,
    isError: materialityItemsQuery.isError,
    error: materialityItemsQuery.error,
    createMaterialityItem: createMaterialityItemMutation.mutate,
    updateMaterialityItem: updateMaterialityItemMutation.mutate,
    deleteMaterialityItem: deleteMaterialityItemMutation.mutate,
    isCreating: createMaterialityItemMutation.isPending,
    isUpdating: updateMaterialityItemMutation.isPending,
    isDeleting: deleteMaterialityItemMutation.isPending,
  };
}

export function useMaterialityItem(id: string) {
  const queryClient = useQueryClient();

  const materialityItemQuery = useQuery({
    queryKey: ["materialityItem", id],
    queryFn: async () => {
      const items = await api.getMaterialityItems();
      return items.find((item) => item.id === id);
    },
    enabled: !!id,
  });

  const updateMaterialityItemMutation = useMutation({
    mutationFn: (updates: Partial<MaterialityItem>) => {
      if (!id)
        throw new Error("Cannot update materiality item: No item ID provided");
      return api.updateMaterialityItem(id, updates);
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData(["materialityItem", id], updatedItem);
      queryClient.invalidateQueries({ queryKey: ["materialityItems"] });
      queryClient.invalidateQueries({ queryKey: ["topics"] });
    },
  });

  return {
    materialityItem: materialityItemQuery.data,
    isLoading: materialityItemQuery.isLoading,
    isError: materialityItemQuery.isError,
    error: materialityItemQuery.error,
    updateMaterialityItem: updateMaterialityItemMutation.mutate,
    isUpdating: updateMaterialityItemMutation.isPending,
  };
}
