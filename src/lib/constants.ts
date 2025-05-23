// Application-wide constants

// API Configuration
export const API_CONFIG = {
  DELAY_MS: 800,
  RETRY_ATTEMPTS: 3,
  TIMEOUT_MS: 10000,
} as const;

// Materiality Assessment Constants
export const MATERIALITY_CONSTANTS = {
  IMPACT_SCALE: {
    MIN: 1,
    MAX: 5,
  },
  MATRIX_DIMENSIONS: {
    DEFAULT_WIDTH: 800,
    DEFAULT_HEIGHT: 600,
    MIN_WIDTH: 600,
    MIN_HEIGHT: 400,
  },
  ZOOM_LIMITS: {
    MIN: 0.5,
    MAX: 5,
    STEP: 1.5,
  },
} as const;

// Status and Priority Options
export const STATUS_OPTIONS = {
  TASK: ["not-started", "in-progress", "completed"] as const,
  MATERIALITY: ["draft", "under_review", "approved", "archived"] as const,
  DATA_GAP: ["identified", "in-progress", "resolved"] as const,
} as const;

export const PRIORITY_OPTIONS = {
  GENERAL: ["low", "medium", "high"] as const,
  MATERIALITY: ["low", "medium", "high", "critical"] as const,
} as const;

// Category Colors
export const CATEGORY_COLORS = {
  environmental: "#10b981",
  social: "#3b82f6",
  governance: "#8b5cf6",
  economic: "#f59e0b",
} as const;

// Default Materiality Matrix Configuration
export const DEFAULT_MATRIX_CONFIG = {
  width: 800,
  height: 600,
  margin: { top: 40, right: 40, bottom: 60, left: 60 },
  quadrants: [
    {
      label: "Monitor",
      description: "Low business and stakeholder impact",
      color: "#f3f4f6",
      minX: 0,
      maxX: 2.5,
      minY: 0,
      maxY: 2.5,
    },
    {
      label: "Manage",
      description: "High business impact, low stakeholder impact",
      color: "#fef3c7",
      minX: 2.5,
      maxX: 5,
      minY: 0,
      maxY: 2.5,
    },
    {
      label: "Engage",
      description: "Low business impact, high stakeholder impact",
      color: "#dbeafe",
      minX: 0,
      maxX: 2.5,
      minY: 2.5,
      maxY: 5,
    },
    {
      label: "Prioritize",
      description: "High business and stakeholder impact",
      color: "#dcfce7",
      minX: 2.5,
      maxX: 5,
      minY: 2.5,
      maxY: 5,
    },
  ],
  thresholds: {
    x: 2.5,
    y: 2.5,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: "Network error occurred. Please try again.",
  NOT_FOUND: "Resource not found.",
  VALIDATION: "Invalid data provided.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  SERVER: "Server error occurred. Please try again later.",
  GENERIC: "An unexpected error occurred.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CREATED: "Successfully created.",
  UPDATED: "Successfully updated.",
  DELETED: "Successfully deleted.",
  SAVED: "Successfully saved.",
} as const;

// Loading States
export const LOADING_STATES = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE_MB: 10,
  ALLOWED_TYPES: ["pdf", "xlsx", "xls", "csv", "doc", "docx"],
  MIME_TYPES: {
    pdf: "application/pdf",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    xls: "application/vnd.ms-excel",
    csv: "text/csv",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  },
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;
