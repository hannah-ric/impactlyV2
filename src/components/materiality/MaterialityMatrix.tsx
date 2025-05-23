import React from "react";
import { D3MaterialityMatrix } from "../D3MaterialityMatrix";
import { useTopics } from "@/hooks/useTopics";
import { useMaterialityItems } from "@/hooks/useMaterialityItems";
import { topicToMaterialityItem } from "@/utils/materialityTypeAdapter";
import { Topic } from "@/lib/api";
import { MaterialityItem } from "@/types/materiality";
import { Card, CardContent } from "@/components/ui/card";

interface MaterialityMatrixProps {
  onTopicSelect: (topic: Topic) => void;
  enableFiltering?: boolean;
  enableZoom?: boolean;
  enableTooltips?: boolean;
  autoResize?: boolean;
}

const MaterialityMatrix: React.FC<MaterialityMatrixProps> = ({
  onTopicSelect,
  enableFiltering = true,
  enableZoom = true,
  enableTooltips = true,
  autoResize = true,
}) => {
  const { topics, isLoading: topicsLoading } = useTopics();
  const {
    materialityItems,
    isLoading: itemsLoading,
    updateMaterialityItem,
    deleteMaterialityItem,
    createMaterialityItem,
  } = useMaterialityItems();

  const isLoading = topicsLoading || itemsLoading;

  // Use materiality items if available, otherwise convert topics
  const items =
    materialityItems.length > 0
      ? materialityItems
      : topics?.map(topicToMaterialityItem) || [];

  // Handle item selection and convert back to Topic format for the parent component
  const handleItemSelect = (item: MaterialityItem) => {
    // Find the original topic that corresponds to this item
    const topic = topics?.find((t) => t.id === item.id);
    if (topic) {
      onTopicSelect(topic);
    }
  };

  const handleItemUpdate = (item: MaterialityItem) => {
    updateMaterialityItem({ id: item.id, updates: item });
  };

  const handleItemDelete = (itemId: string) => {
    deleteMaterialityItem(itemId);
  };

  const handleAddNew = () => {
    // Create a new materiality item with default values
    const newItem: Omit<MaterialityItem, "id"> = {
      name: "New Topic",
      description: "Description for new topic",
      stakeholderImpact: 3,
      businessImpact: 3,
      category: "environmental" as any,
      status: "draft" as any,
      priority: "medium" as any,
      lastUpdated: new Date(),
      createdBy: "user",
    };
    createMaterialityItem(newItem);
  };

  const handleExport = () => {
    // Export functionality - could export as CSV, JSON, etc.
    const dataStr = JSON.stringify(items, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `materiality-matrix-${new Date().toISOString().split("T")[0]}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <Card className="w-full h-full bg-[var(--bg-elevated)] border-[var(--border-secondary)] shadow-sm transition-all duration-normal ease-out hover:shadow-md">
      <CardContent className="p-0 overflow-hidden">
        <D3MaterialityMatrix
          items={items}
          onItemSelect={handleItemSelect}
          onItemUpdate={handleItemUpdate}
          onItemDelete={handleItemDelete}
          onAddNew={handleAddNew}
          onExport={handleExport}
          isLoading={isLoading}
          editable={true}
          enableFiltering={enableFiltering}
          enableZoom={enableZoom}
          enableTooltips={enableTooltips}
          autoResize={autoResize}
          className="animate-fade-in-up"
        />
      </CardContent>
    </Card>
  );
};

export default MaterialityMatrix;
