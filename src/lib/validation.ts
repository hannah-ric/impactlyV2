// Validation utilities

import { ValidationError } from "./errors";
import { FILE_UPLOAD } from "./constants";

// Generic validation functions
export const isRequired = (value: any, fieldName: string): void => {
  if (value === null || value === undefined || value === "") {
    throw new ValidationError(`${fieldName} is required`, fieldName);
  }
};

export const isEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidRange = (
  value: number,
  min: number,
  max: number,
  fieldName: string,
): void => {
  if (value < min || value > max) {
    throw new ValidationError(
      `${fieldName} must be between ${min} and ${max}`,
      fieldName,
    );
  }
};

export const isValidLength = (
  value: string,
  minLength: number,
  maxLength: number,
  fieldName: string,
): void => {
  if (value.length < minLength || value.length > maxLength) {
    throw new ValidationError(
      `${fieldName} must be between ${minLength} and ${maxLength} characters`,
      fieldName,
    );
  }
};

// Materiality-specific validation
export const validateMaterialityItem = (item: any): void => {
  isRequired(item.name, "Name");
  isRequired(item.description, "Description");

  if (item.name) {
    isValidLength(item.name, 1, 100, "Name");
  }

  if (item.description) {
    isValidLength(item.description, 1, 500, "Description");
  }

  if (item.stakeholderImpact !== undefined) {
    isValidRange(item.stakeholderImpact, 1, 5, "Stakeholder Impact");
  }

  if (item.businessImpact !== undefined) {
    isValidRange(item.businessImpact, 1, 5, "Business Impact");
  }
};

// Task validation
export const validateTask = (task: any): void => {
  isRequired(task.title, "Title");
  isRequired(task.owner, "Owner");
  isRequired(task.deadline, "Deadline");

  if (task.title) {
    isValidLength(task.title, 1, 200, "Title");
  }

  if (task.description) {
    isValidLength(task.description, 0, 1000, "Description");
  }

  if (task.deadline && new Date(task.deadline) < new Date()) {
    throw new ValidationError("Deadline cannot be in the past", "deadline");
  }
};

// File validation
export const validateFile = (file: File): void => {
  // Check file size
  const maxSizeBytes = FILE_UPLOAD.MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    throw new ValidationError(
      `File size must be less than ${FILE_UPLOAD.MAX_SIZE_MB}MB`,
      "file",
    );
  }

  // Check file type
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  if (
    !fileExtension ||
    !FILE_UPLOAD.ALLOWED_TYPES.includes(fileExtension as any)
  ) {
    throw new ValidationError(
      `File type not allowed. Allowed types: ${FILE_UPLOAD.ALLOWED_TYPES.join(", ")}`,
      "file",
    );
  }
};

// Stakeholder validation
export const validateStakeholder = (stakeholder: any): void => {
  isRequired(stakeholder.name, "Name");
  isRequired(stakeholder.type, "Type");
  isRequired(stakeholder.category, "Category");

  if (stakeholder.influence !== undefined) {
    isValidRange(stakeholder.influence, 1, 5, "Influence");
  }

  if (stakeholder.interest !== undefined) {
    isValidRange(stakeholder.interest, 1, 5, "Interest");
  }

  if (
    stakeholder.contactInfo?.email &&
    !isEmail(stakeholder.contactInfo.email)
  ) {
    throw new ValidationError("Invalid email format", "email");
  }
};

// Assessment result validation
export const validateAssessmentResult = (result: any): void => {
  isRequired(result.name, "Name");
  isRequired(result.methodology, "Methodology");

  if (result.name) {
    isValidLength(result.name, 1, 200, "Name");
  }

  if (result.description) {
    isValidLength(result.description, 0, 1000, "Description");
  }

  if (result.thresholds) {
    if (result.thresholds.businessImpact !== undefined) {
      isValidRange(
        result.thresholds.businessImpact,
        1,
        5,
        "Business Impact Threshold",
      );
    }
    if (result.thresholds.stakeholderImpact !== undefined) {
      isValidRange(
        result.thresholds.stakeholderImpact,
        1,
        5,
        "Stakeholder Impact Threshold",
      );
    }
  }
};

// Sanitization functions
export const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>"'&]/g, "");
};

export const sanitizeNumber = (num: any): number | null => {
  const parsed = parseFloat(num);
  return isNaN(parsed) ? null : parsed;
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};
