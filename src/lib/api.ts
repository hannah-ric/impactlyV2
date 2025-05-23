// Mock API service for ESG data
// This will be replaced with real API calls when backend is ready

import {
  MaterialityItem,
  MaterialityCategory,
  MaterialityStatus,
  MaterialityPriority,
} from "@/types/materiality";
import { APIError, NetworkError, withRetry } from "./errors";
import { API_CONFIG } from "./constants";
import {
  validateMaterialityItem,
  validateTask,
  validateStakeholder,
  validateAssessmentResult,
} from "./validation";

// Types
export interface Topic {
  id: string;
  name: string;
  category: string;
  impactScore?: number;
  financialScore?: number;
  relevance?: number;
  description: string;
  color?: string;
  // Enhanced fields for materiality assessment
  stakeholderImpact?: number;
  businessImpact?: number;
  status?: string;
  priority?: string;
  lastUpdated?: string;
  createdBy?: string;
  tags?: string[];
  notes?: string;
  evidence?: string[];
  relatedItems?: string[];
}

export interface Stakeholder {
  id: string;
  name: string;
  type: "internal" | "external";
  category: string;
  influence: number; // 1-5 scale
  interest: number; // 1-5 scale
  contactInfo?: {
    email?: string;
    phone?: string;
    organization?: string;
  };
  engagementHistory: EngagementRecord[];
  lastEngagement?: Date;
  notes?: string;
}

export interface EngagementRecord {
  id: string;
  stakeholderId: string;
  date: Date;
  type: "survey" | "interview" | "workshop" | "meeting" | "email" | "other";
  topic: string;
  feedback: string;
  priority: number; // 1-5 scale
  actionItems?: string[];
  followUpRequired: boolean;
  followUpDate?: Date;
}

export interface AssessmentResult {
  id: string;
  name: string;
  description: string;
  createdDate: Date;
  lastModified: Date;
  status: "draft" | "in_progress" | "completed" | "archived";
  methodology: string;
  stakeholderGroups: string[];
  materialityItems: MaterialityItem[];
  thresholds: {
    businessImpact: number;
    stakeholderImpact: number;
  };
  metadata: {
    industry: string;
    companySize: string;
    region: string;
    frameworks: string[];
  };
  approvals?: {
    approvedBy: string;
    approvedDate: Date;
    comments?: string;
  }[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  owner: string;
  deadline: Date;
  status: "not-started" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  evidence: string[];
}

export interface ActionPlan {
  id: string;
  topicId: string;
  topicName: string;
  description: string;
  tasks: Task[];
  progress: number;
}

// Mock data
const topics: Topic[] = [
  {
    id: "1",
    name: "Carbon Emissions",
    category: "environmental",
    impactScore: 0.85,
    financialScore: 0.75,
    relevance: 0.9,
    stakeholderImpact: 4.5,
    businessImpact: 4.2,
    status: "approved",
    priority: "high",
    description:
      "Greenhouse gas emissions and carbon footprint reduction strategies",
    color: "#4CAF50",
    lastUpdated: "2024-01-15T10:30:00Z",
    createdBy: "system",
    tags: ["climate", "emissions", "scope1", "scope2"],
    evidence: ["carbon-audit-2023.pdf", "emissions-baseline.xlsx"],
  },
  {
    id: "2",
    name: "Water Management",
    category: "environmental",
    impactScore: 0.7,
    financialScore: 0.6,
    relevance: 0.8,
    stakeholderImpact: 3.8,
    businessImpact: 3.2,
    status: "approved",
    priority: "medium",
    description: "Water usage, conservation efforts, and wastewater management",
    color: "#2196F3",
    lastUpdated: "2024-01-12T14:20:00Z",
    createdBy: "sustainability_team",
    tags: ["water", "conservation", "wastewater"],
    evidence: ["water-usage-report.pdf"],
  },
  {
    id: "3",
    name: "Diversity & Inclusion",
    category: "social",
    impactScore: 0.8,
    financialScore: 0.5,
    relevance: 0.75,
    stakeholderImpact: 4.1,
    businessImpact: 2.8,
    status: "under_review",
    priority: "high",
    description: "Workforce diversity, equity, and inclusion initiatives",
    color: "#9C27B0",
    lastUpdated: "2024-01-10T09:15:00Z",
    createdBy: "hr_team",
    tags: ["diversity", "inclusion", "equity", "workforce"],
    evidence: ["diversity-report-2023.pdf", "inclusion-survey.xlsx"],
  },
  {
    id: "4",
    name: "Board Governance",
    category: "governance",
    impactScore: 0.6,
    financialScore: 0.9,
    relevance: 0.85,
    stakeholderImpact: 3.5,
    businessImpact: 4.8,
    status: "approved",
    priority: "critical",
    description: "Board structure, independence, and oversight practices",
    color: "#FF9800",
    lastUpdated: "2024-01-08T16:45:00Z",
    createdBy: "governance_team",
    tags: ["governance", "board", "oversight", "independence"],
    evidence: ["board-charter.pdf", "governance-policies.pdf"],
  },
  {
    id: "5",
    name: "Data Privacy",
    category: "governance",
    impactScore: 0.75,
    financialScore: 0.8,
    relevance: 0.7,
    stakeholderImpact: 3.9,
    businessImpact: 4.3,
    status: "approved",
    priority: "high",
    description: "Customer data protection and privacy compliance",
    color: "#F44336",
    lastUpdated: "2024-01-05T11:30:00Z",
    createdBy: "legal_team",
    tags: ["privacy", "data", "gdpr", "compliance"],
    evidence: ["privacy-policy.pdf", "gdpr-compliance.xlsx"],
  },
  {
    id: "6",
    name: "Employee Health",
    category: "social",
    impactScore: 0.65,
    financialScore: 0.4,
    relevance: 0.6,
    stakeholderImpact: 3.2,
    businessImpact: 2.1,
    status: "draft",
    priority: "medium",
    description: "Workplace safety and employee wellbeing programs",
    color: "#673AB7",
    lastUpdated: "2024-01-03T13:20:00Z",
    createdBy: "hr_team",
    tags: ["health", "safety", "wellbeing", "workplace"],
    evidence: ["safety-report.pdf"],
  },
  {
    id: "7",
    name: "Waste Management",
    category: "environmental",
    impactScore: 0.5,
    financialScore: 0.3,
    relevance: 0.5,
    stakeholderImpact: 2.8,
    businessImpact: 1.9,
    status: "draft",
    priority: "low",
    description: "Waste reduction, recycling, and circular economy initiatives",
    color: "#8BC34A",
    lastUpdated: "2024-01-01T08:00:00Z",
    createdBy: "operations_team",
    tags: ["waste", "recycling", "circular"],
    evidence: [],
  },
  {
    id: "8",
    name: "Supply Chain",
    category: "social",
    impactScore: 0.4,
    financialScore: 0.7,
    relevance: 0.65,
    stakeholderImpact: 3.1,
    businessImpact: 3.7,
    status: "under_review",
    priority: "medium",
    description: "Responsible sourcing and supply chain management",
    color: "#00BCD4",
    lastUpdated: "2023-12-28T15:45:00Z",
    createdBy: "procurement_team",
    tags: ["supply-chain", "sourcing", "vendors"],
    evidence: ["supplier-assessment.xlsx"],
  },
];

const stakeholders: Stakeholder[] = [
  {
    id: "stakeholder-1",
    name: "Employees",
    type: "internal",
    category: "workforce",
    influence: 4,
    interest: 5,
    engagementHistory: [
      {
        id: "eng-1",
        stakeholderId: "stakeholder-1",
        date: new Date("2024-01-10"),
        type: "survey",
        topic: "Workplace Satisfaction",
        feedback: "High interest in diversity and inclusion initiatives",
        priority: 4,
        actionItems: ["Implement D&I training", "Review promotion processes"],
        followUpRequired: true,
        followUpDate: new Date("2024-02-10"),
      },
    ],
    lastEngagement: new Date("2024-01-10"),
  },
  {
    id: "stakeholder-2",
    name: "Investors",
    type: "external",
    category: "financial",
    influence: 5,
    interest: 4,
    engagementHistory: [
      {
        id: "eng-2",
        stakeholderId: "stakeholder-2",
        date: new Date("2024-01-05"),
        type: "meeting",
        topic: "ESG Performance",
        feedback: "Strong focus on governance and climate risks",
        priority: 5,
        actionItems: ["Quarterly ESG reporting", "Climate risk assessment"],
        followUpRequired: true,
        followUpDate: new Date("2024-04-05"),
      },
    ],
    lastEngagement: new Date("2024-01-05"),
  },
  {
    id: "stakeholder-3",
    name: "Customers",
    type: "external",
    category: "market",
    influence: 4,
    interest: 3,
    engagementHistory: [
      {
        id: "eng-3",
        stakeholderId: "stakeholder-3",
        date: new Date("2023-12-15"),
        type: "survey",
        topic: "Product Sustainability",
        feedback: "Increasing demand for sustainable products",
        priority: 3,
        actionItems: ["Develop sustainable product line"],
        followUpRequired: false,
      },
    ],
    lastEngagement: new Date("2023-12-15"),
  },
];

const assessmentResults: AssessmentResult[] = [
  {
    id: "assessment-1",
    name: "2024 Materiality Assessment",
    description: "Comprehensive materiality assessment for fiscal year 2024",
    createdDate: new Date("2024-01-01"),
    lastModified: new Date("2024-01-15"),
    status: "in_progress",
    methodology: "Double materiality approach with stakeholder engagement",
    stakeholderGroups: ["employees", "investors", "customers", "regulators"],
    materialityItems: [],
    thresholds: {
      businessImpact: 3.0,
      stakeholderImpact: 3.0,
    },
    metadata: {
      industry: "Technology",
      companySize: "Medium",
      region: "North America",
      frameworks: ["GRI", "SASB", "TCFD"],
    },
  },
];

const actionPlans: ActionPlan[] = [
  {
    id: "plan-1",
    topicId: "1",
    topicName: "Carbon Emissions Reduction",
    description:
      "Develop and implement strategies to reduce carbon emissions across operations and supply chain.",
    tasks: [
      {
        id: "task-1",
        title: "Conduct carbon footprint assessment",
        description:
          "Perform a comprehensive assessment of current carbon emissions across all operations.",
        owner: "Jane Smith",
        deadline: new Date(2023, 11, 15),
        status: "completed",
        priority: "high",
        evidence: ["baseline-report.pdf", "emissions-data.xlsx"],
      },
      {
        id: "task-2",
        title: "Develop emissions reduction targets",
        description:
          "Set science-based targets for emissions reduction in line with industry standards.",
        owner: "Michael Chen",
        deadline: new Date(2024, 0, 10),
        status: "in-progress",
        priority: "high",
        evidence: ["draft-targets.pdf"],
      },
      {
        id: "task-3",
        title: "Implement energy efficiency measures",
        description:
          "Identify and implement energy efficiency measures across facilities.",
        owner: "Sarah Johnson",
        deadline: new Date(2024, 2, 20),
        status: "not-started",
        priority: "medium",
        evidence: [],
      },
    ],
    progress: 33,
  },
];

// API functions with artificial delay to simulate network requests
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Enhanced API response wrapper
const apiCall = async <T>(fn: () => Promise<T>): Promise<T> => {
  try {
    return await withRetry(fn, API_CONFIG.RETRY_ATTEMPTS, API_CONFIG.DELAY_MS);
  } catch (error) {
    if (error instanceof Error) {
      throw new APIError(error.message);
    }
    throw new NetworkError();
  }
};

export const api = {
  // Topics API
  getTopics: async (): Promise<Topic[]> => {
    return apiCall(async () => {
      await delay(API_CONFIG.DELAY_MS);
      return [...topics];
    });
  },

  getTopic: async (id: string): Promise<Topic | undefined> => {
    await delay(500);
    return topics.find((topic) => topic.id === id);
  },

  updateTopic: async (id: string, updates: Partial<Topic>): Promise<Topic> => {
    await delay(1000);
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) throw new Error(`Topic with id ${id} not found`);

    const updatedTopic = {
      ...topics[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    topics[index] = updatedTopic;
    return updatedTopic;
  },

  createTopic: async (topic: Omit<Topic, "id">): Promise<Topic> => {
    return apiCall(async () => {
      // Validate input
      validateMaterialityItem(topic);

      await delay(1000);
      const newTopic = {
        ...topic,
        id: `topic-${Date.now()}`,
        lastUpdated: new Date().toISOString(),
        createdBy: "user",
      };
      topics.push(newTopic);
      return newTopic;
    });
  },

  deleteTopic: async (id: string): Promise<void> => {
    await delay(800);
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1) throw new Error(`Topic with id ${id} not found`);
    topics.splice(index, 1);
  },

  // Stakeholders API
  getStakeholders: async (): Promise<Stakeholder[]> => {
    await delay(600);
    return [...stakeholders];
  },

  getStakeholder: async (id: string): Promise<Stakeholder | undefined> => {
    await delay(400);
    return stakeholders.find((stakeholder) => stakeholder.id === id);
  },

  createStakeholder: async (
    stakeholder: Omit<Stakeholder, "id">,
  ): Promise<Stakeholder> => {
    await delay(800);
    const newStakeholder = {
      ...stakeholder,
      id: `stakeholder-${Date.now()}`,
    };
    stakeholders.push(newStakeholder);
    return newStakeholder;
  },

  updateStakeholder: async (
    id: string,
    updates: Partial<Stakeholder>,
  ): Promise<Stakeholder> => {
    await delay(800);
    const index = stakeholders.findIndex(
      (stakeholder) => stakeholder.id === id,
    );
    if (index === -1) throw new Error(`Stakeholder with id ${id} not found`);

    const updatedStakeholder = { ...stakeholders[index], ...updates };
    stakeholders[index] = updatedStakeholder;
    return updatedStakeholder;
  },

  deleteStakeholder: async (id: string): Promise<void> => {
    await delay(600);
    const index = stakeholders.findIndex(
      (stakeholder) => stakeholder.id === id,
    );
    if (index === -1) throw new Error(`Stakeholder with id ${id} not found`);
    stakeholders.splice(index, 1);
  },

  // Engagement API
  createEngagement: async (
    engagement: Omit<EngagementRecord, "id">,
  ): Promise<EngagementRecord> => {
    await delay(700);
    const newEngagement = {
      ...engagement,
      id: `engagement-${Date.now()}`,
    };

    // Add to stakeholder's engagement history
    const stakeholder = stakeholders.find(
      (s) => s.id === engagement.stakeholderId,
    );
    if (stakeholder) {
      stakeholder.engagementHistory.push(newEngagement);
      stakeholder.lastEngagement = engagement.date;
    }

    return newEngagement;
  },

  getEngagements: async (
    stakeholderId?: string,
  ): Promise<EngagementRecord[]> => {
    await delay(500);
    if (stakeholderId) {
      const stakeholder = stakeholders.find((s) => s.id === stakeholderId);
      return stakeholder?.engagementHistory || [];
    }
    return stakeholders.flatMap((s) => s.engagementHistory);
  },

  // Assessment Results API
  getAssessmentResults: async (): Promise<AssessmentResult[]> => {
    await delay(700);
    return [...assessmentResults];
  },

  getAssessmentResult: async (
    id: string,
  ): Promise<AssessmentResult | undefined> => {
    await delay(500);
    return assessmentResults.find((result) => result.id === id);
  },

  createAssessmentResult: async (
    result: Omit<AssessmentResult, "id">,
  ): Promise<AssessmentResult> => {
    await delay(1200);
    const newResult = {
      ...result,
      id: `assessment-${Date.now()}`,
      createdDate: new Date(),
      lastModified: new Date(),
    };
    assessmentResults.push(newResult);
    return newResult;
  },

  updateAssessmentResult: async (
    id: string,
    updates: Partial<AssessmentResult>,
  ): Promise<AssessmentResult> => {
    await delay(1000);
    const index = assessmentResults.findIndex((result) => result.id === id);
    if (index === -1)
      throw new Error(`Assessment result with id ${id} not found`);

    const updatedResult = {
      ...assessmentResults[index],
      ...updates,
      lastModified: new Date(),
    };
    assessmentResults[index] = updatedResult;
    return updatedResult;
  },

  deleteAssessmentResult: async (id: string): Promise<void> => {
    await delay(800);
    const index = assessmentResults.findIndex((result) => result.id === id);
    if (index === -1)
      throw new Error(`Assessment result with id ${id} not found`);
    assessmentResults.splice(index, 1);
  },

  // Materiality Items API (for direct materiality item management)
  getMaterialityItems: async (): Promise<MaterialityItem[]> => {
    await delay(600);
    // Convert topics to materiality items
    return topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      description: topic.description,
      stakeholderImpact: topic.stakeholderImpact || 3,
      businessImpact: topic.businessImpact || 3,
      category: topic.category as MaterialityCategory,
      status: (topic.status as MaterialityStatus) || MaterialityStatus.DRAFT,
      priority:
        (topic.priority as MaterialityPriority) || MaterialityPriority.MEDIUM,
      lastUpdated: topic.lastUpdated ? new Date(topic.lastUpdated) : new Date(),
      createdBy: topic.createdBy || "system",
      tags: topic.tags,
      notes: topic.notes,
      evidence: topic.evidence,
      relatedItems: topic.relatedItems,
    }));
  },

  createMaterialityItem: async (
    item: Omit<MaterialityItem, "id">,
  ): Promise<MaterialityItem> => {
    return apiCall(async () => {
      // Validate input
      validateMaterialityItem(item);

      await delay(800);
      const newItem = {
        ...item,
        id: `item-${Date.now()}`,
        lastUpdated: new Date(),
      };

      // Also create corresponding topic
      const newTopic: Topic = {
        id: newItem.id,
        name: newItem.name,
        description: newItem.description,
        category: newItem.category,
        stakeholderImpact: newItem.stakeholderImpact,
        businessImpact: newItem.businessImpact,
        status: newItem.status,
        priority: newItem.priority,
        lastUpdated: newItem.lastUpdated.toISOString(),
        createdBy: newItem.createdBy,
        tags: newItem.tags,
        notes: newItem.notes,
        evidence: newItem.evidence,
        relatedItems: newItem.relatedItems,
      };
      topics.push(newTopic);

      return newItem;
    });
  },

  updateMaterialityItem: async (
    id: string,
    updates: Partial<MaterialityItem>,
  ): Promise<MaterialityItem> => {
    await delay(800);
    const topicIndex = topics.findIndex((topic) => topic.id === id);
    if (topicIndex === -1)
      throw new Error(`Materiality item with id ${id} not found`);

    const updatedTopic = {
      ...topics[topicIndex],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    topics[topicIndex] = updatedTopic;

    return {
      id: updatedTopic.id,
      name: updatedTopic.name,
      description: updatedTopic.description,
      stakeholderImpact: updatedTopic.stakeholderImpact || 3,
      businessImpact: updatedTopic.businessImpact || 3,
      category: updatedTopic.category as MaterialityCategory,
      status:
        (updatedTopic.status as MaterialityStatus) || MaterialityStatus.DRAFT,
      priority:
        (updatedTopic.priority as MaterialityPriority) ||
        MaterialityPriority.MEDIUM,
      lastUpdated: new Date(updatedTopic.lastUpdated),
      createdBy: updatedTopic.createdBy || "system",
      tags: updatedTopic.tags,
      notes: updatedTopic.notes,
      evidence: updatedTopic.evidence,
      relatedItems: updatedTopic.relatedItems,
    };
  },

  deleteMaterialityItem: async (id: string): Promise<void> => {
    await delay(600);
    const index = topics.findIndex((topic) => topic.id === id);
    if (index === -1)
      throw new Error(`Materiality item with id ${id} not found`);
    topics.splice(index, 1);
  },

  // Action Plans API
  getActionPlans: async (): Promise<ActionPlan[]> => {
    await delay(800);
    return [...actionPlans];
  },

  getActionPlan: async (id: string): Promise<ActionPlan | undefined> => {
    await delay(500);
    return actionPlans.find((plan) => plan.id === id);
  },

  getActionPlanByTopic: async (
    topicId: string,
  ): Promise<ActionPlan | undefined> => {
    await delay(500);
    return actionPlans.find((plan) => plan.topicId === topicId);
  },

  createActionPlan: async (
    plan: Omit<ActionPlan, "id">,
  ): Promise<ActionPlan> => {
    await delay(1000);
    const newPlan = {
      ...plan,
      id: `plan-${Date.now()}`,
    };
    actionPlans.push(newPlan);
    return newPlan;
  },

  updateActionPlan: async (
    id: string,
    updates: Partial<ActionPlan>,
  ): Promise<ActionPlan> => {
    await delay(1000);
    const index = actionPlans.findIndex((plan) => plan.id === id);
    if (index === -1) throw new Error(`Action plan with id ${id} not found`);

    const updatedPlan = { ...actionPlans[index], ...updates };
    actionPlans[index] = updatedPlan;
    return updatedPlan;
  },

  // Tasks API
  createTask: async (planId: string, task: Omit<Task, "id">): Promise<Task> => {
    await delay(800);
    const plan = actionPlans.find((p) => p.id === planId);
    if (!plan) throw new Error(`Action plan with id ${planId} not found`);

    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
    };

    plan.tasks.push(newTask);
    return newTask;
  },

  updateTask: async (
    planId: string,
    taskId: string,
    updates: Partial<Task>,
  ): Promise<Task> => {
    await delay(800);
    const plan = actionPlans.find((p) => p.id === planId);
    if (!plan) throw new Error(`Action plan with id ${planId} not found`);

    const taskIndex = plan.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1)
      throw new Error(`Task with id ${taskId} not found in plan ${planId}`);

    const updatedTask = { ...plan.tasks[taskIndex], ...updates };
    plan.tasks[taskIndex] = updatedTask;

    // Update progress
    const completedTasks = plan.tasks.filter(
      (t) => t.status === "completed",
    ).length;
    plan.progress = Math.round((completedTasks / plan.tasks.length) * 100);

    return updatedTask;
  },

  deleteTask: async (planId: string, taskId: string): Promise<void> => {
    await delay(800);
    const plan = actionPlans.find((p) => p.id === planId);
    if (!plan) throw new Error(`Action plan with id ${planId} not found`);

    const taskIndex = plan.tasks.findIndex((t) => t.id === taskId);
    if (taskIndex === -1)
      throw new Error(`Task with id ${taskId} not found in plan ${planId}`);

    plan.tasks.splice(taskIndex, 1);

    // Update progress
    if (plan.tasks.length > 0) {
      const completedTasks = plan.tasks.filter(
        (t) => t.status === "completed",
      ).length;
      plan.progress = Math.round((completedTasks / plan.tasks.length) * 100);
    } else {
      plan.progress = 0;
    }
  },
};
