import React, { useState, useCallback } from "react";
import { useTopics } from "@/hooks/useTopics";
import { D3MaterialityMatrix } from "@/components/D3MaterialityMatrix";
import MaterialityMatrix from "./MaterialityMatrix";
import { Topic } from "@/lib/api";
import { MaterialityItem } from "@/types/materiality";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  topicToMaterialityItem,
  materialityItemToTopic,
} from "@/utils/materialityTypeAdapter";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

interface MaterialityMatrixWrapperProps {
  onTopicSelect?: (topic: Topic) => void;
  // New optional props for D3 version
  onItemUpdate?: (item: MaterialityItem) => void;
  onItemDelete?: (itemId: string) => void;
  onAddNew?: () => void;
  onExport?: () => void;
  isLoading?: boolean;
  editable?: boolean;
  // Optional prop to provide materiality items for D3 version
  materialityItems?: MaterialityItem[];
}

type VisualizationType = "standard" | "enhanced" | "d3";

const MaterialityMatrixWrapper: React.FC<MaterialityMatrixWrapperProps> = ({
  onTopicSelect = () => {},
  onItemUpdate,
  onItemDelete,
  onAddNew,
  onExport,
  isLoading = false,
  editable = true,
  materialityItems = [],
}) => {
  const [visualizationType, setVisualizationType] =
    useState<VisualizationType>("standard");

  // For backward compatibility, keep the boolean state
  const useEnhanced = visualizationType === "enhanced";
  const setUseEnhanced = (value: boolean) => {
    setVisualizationType(value ? "enhanced" : "standard");
  };

  // Convert Topic to MaterialityItem for D3 visualization
  const convertTopicToMaterialityItem = useCallback(
    (topic: Topic): MaterialityItem => {
      return {
        id: topic.id || "",
        name: topic.name || "",
        description: topic.description || "",
        stakeholderImpact: topic.stakeholderImpact || 3,
        businessImpact: topic.businessImpact || 3,
        category: topic.category || "environmental",
        status: topic.status || "draft",
        priority: topic.priority || "medium",
        lastUpdated: topic.lastUpdated
          ? new Date(topic.lastUpdated)
          : new Date(),
        createdBy: topic.createdBy || "system",
      };
    },
    [],
  );

  // Convert MaterialityItem to Topic for callbacks
  const convertMaterialityItemToTopic = useCallback(
    (item: MaterialityItem): Topic => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        stakeholderImpact: item.stakeholderImpact,
        businessImpact: item.businessImpact,
        category: item.category,
        status: item.status,
        priority: item.priority,
        lastUpdated: item.lastUpdated.toISOString(),
        createdBy: item.createdBy,
      } as Topic;
    },
    [],
  );

  const handleTopicSelect = useCallback(
    (topic: Topic) => {
      onTopicSelect(topic);
    },
    [onTopicSelect],
  );

  const handleMaterialityItemSelect = useCallback(
    (item: MaterialityItem) => {
      const topic = convertMaterialityItemToTopic(item);
      onTopicSelect(topic);
    },
    [onTopicSelect, convertMaterialityItemToTopic],
  );

  // Get topics from hook if materiality items not provided
  const { topics, loading } = useTopics();
  const itemsForD3 =
    materialityItems.length > 0
      ? materialityItems
      : (topics || []).map(convertTopicToMaterialityItem);

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading materiality data..." />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <div className="flex items-center justify-end space-x-4">
          {/* For backward compatibility, keep the switch for standard/enhanced */}
          <div className="flex items-center space-x-2">
            <Label htmlFor="enhanced-mode" className="text-sm">
              Use Enhanced Visualization
            </Label>
            <Switch
              id="enhanced-mode"
              checked={useEnhanced}
              onCheckedChange={setUseEnhanced}
              disabled={visualizationType === "d3"}
            />
          </div>

          {/* New radio group for all three options */}
          <RadioGroup
            value={visualizationType}
            onValueChange={(value) =>
              setVisualizationType(value as VisualizationType)
            }
            className="flex items-center space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard" className="text-sm cursor-pointer">
                Standard
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="enhanced" id="enhanced" />
              <Label htmlFor="enhanced" className="text-sm cursor-pointer">
                Enhanced
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="d3" id="d3" />
              <Label htmlFor="d3" className="text-sm cursor-pointer">
                D3 Visualization
              </Label>
            </div>
          </RadioGroup>
        </div>

        {visualizationType === "d3" ? (
          <D3MaterialityMatrix
            items={itemsForD3}
            onItemSelect={handleMaterialityItemSelect}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
            onAddNew={onAddNew}
            onExport={onExport}
            isLoading={isLoading}
            editable={editable}
          />
        ) : (
          <MaterialityMatrix onTopicSelect={handleTopicSelect} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MaterialityMatrixWrapper;
