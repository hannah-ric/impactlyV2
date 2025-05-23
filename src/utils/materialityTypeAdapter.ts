// src/utils/materialityTypeAdapter.ts

import { Topic } from "@/lib/api";
import { 
  MaterialityItem, 
  MaterialityCategory, 
  MaterialityStatus, 
  MaterialityPriority 
} from "@/types/materiality";

/**
 * Maps Topic category to MaterialityCategory enum
 */
export const mapTopicCategory = (category?: string): MaterialityCategory => {
  const categoryMap: Record<string, MaterialityCategory> = {
    'environmental': MaterialityCategory.ENVIRONMENTAL,
    'social': MaterialityCategory.SOCIAL,
    'governance': MaterialityCategory.GOVERNANCE,
    'economic': MaterialityCategory.ECONOMIC,
  };
  
  return categoryMap[category?.toLowerCase() || ''] || MaterialityCategory.ENVIRONMENTAL;
};

/**
 * Maps Topic status to MaterialityStatus enum
 */
export const mapTopicStatus = (status?: string): MaterialityStatus => {
  const statusMap: Record<string, MaterialityStatus> = {
    'draft': MaterialityStatus.DRAFT,
    'under_review': MaterialityStatus.UNDER_REVIEW,
    'approved': MaterialityStatus.APPROVED,
    'archived': MaterialityStatus.ARCHIVED,
  };
  
  return statusMap[status?.toLowerCase() || ''] || MaterialityStatus.DRAFT;
};

/**
 * Maps Topic priority to MaterialityPriority enum
 */
export const mapTopicPriority = (priority?: string): MaterialityPriority => {
  const priorityMap: Record<string, MaterialityPriority> = {
    'low': MaterialityPriority.LOW,
    'medium': MaterialityPriority.MEDIUM,
    'high': MaterialityPriority.HIGH,
    'critical': MaterialityPriority.CRITICAL,
  };
  
  return priorityMap[priority?.toLowerCase() || ''] || MaterialityPriority.MEDIUM;
};

/**
 * Converts a Topic object to a MaterialityItem
 */
export const topicToMaterialityItem = (topic: Topic): MaterialityItem => {
  return {
    id: topic.id || generateId(),
    name: topic.name || 'Unnamed Topic',
    description: topic.description || '',
    stakeholderImpact: normalizeImpactScore(topic.stakeholderImpact),
    businessImpact: normalizeImpactScore(topic.businessImpact),
    category: mapTopicCategory(topic.category),
    status: mapTopicStatus(topic.status),
    priority: mapTopicPriority(topic.priority),
    lastUpdated: topic.lastUpdated ? new Date(topic.lastUpdated) : new Date(),
    createdBy: topic.createdBy || 'system',
    tags: topic.tags || [],
    notes: topic.notes || '',
    evidence: topic.evidence || [],
    relatedItems: topic.relatedItems || [],
  };
};

/**
 * Converts a MaterialityItem to a Topic object
 */
export const materialityItemToTopic = (item: MaterialityItem): Topic => {
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
    tags: item.tags,
    notes: item.notes,
    evidence: item.evidence,
    relatedItems: item.relatedItems,
  } as Topic;
};

/**
 * Batch convert Topics to MaterialityItems
 */
export const topicsToMaterialityItems = (topics: Topic[]): MaterialityItem[] => {
  return topics.map(topicToMaterialityItem);
};

/**
 * Batch convert MaterialityItems to Topics
 */
export const materialityItemsToTopics = (items: MaterialityItem[]): Topic[] => {
  return items.map(materialityItemToTopic);
};

/**
 * Normalize impact score to ensure it's between 1 and 5
 */
function normalizeImpactScore(score?: number): number {
  if (!score || score < 1) return 1;
  if (score > 5) return 5;
  return Math.round(score);
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Type guard to check if an object is a MaterialityItem
 */
export function isMaterialityItem(obj: any): obj is MaterialityItem {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.businessImpact === 'number' &&
    typeof obj.stakeholderImpact === 'number' &&
    obj.lastUpdated instanceof Date
  );
}

/**
 * Type guard to check if an object is a Topic
 */
export function isTopic(obj: any): obj is Topic {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.lastUpdated === 'string'
  );
}