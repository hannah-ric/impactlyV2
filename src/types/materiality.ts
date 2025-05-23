// src/types/materiality.ts

export enum MaterialityCategory {
  ENVIRONMENTAL = 'environmental',
  SOCIAL = 'social',
  GOVERNANCE = 'governance',
  ECONOMIC = 'economic'
}

export enum MaterialityStatus {
  DRAFT = 'draft',
  UNDER_REVIEW = 'under_review',
  APPROVED = 'approved',
  ARCHIVED = 'archived'
}

export enum MaterialityPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface MaterialityItem {
  id: string;
  name: string;
  description: string;
  stakeholderImpact: number; // 1-5 scale
  businessImpact: number; // 1-5 scale
  category: MaterialityCategory;
  status: MaterialityStatus;
  priority: MaterialityPriority;
  lastUpdated: Date;
  createdBy: string;
  tags?: string[];
  notes?: string;
  evidence?: string[];
  relatedItems?: string[];
}

export interface MaterialityMatrixQuadrant {
  label: string;
  description: string;
  color: string;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface MaterialityThreshold {
  x: number;
  y: number;
  label: string;
}

export interface MaterialityMatrixConfig {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  quadrants: MaterialityMatrixQuadrant[];
  thresholds: {
    x: number;
    y: number;
  };
}

export interface MaterialityFilter {
  categories?: MaterialityCategory[];
  statuses?: MaterialityStatus[];
  priorities?: MaterialityPriority[];
  searchTerm?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}