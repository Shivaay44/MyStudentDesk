import { LucideIcon } from 'lucide-react';

export type ToolCategory = 
  | 'academic'
  | 'india-exam'
  | 'attendance'
  | 'math'
  | 'productivity'
  | 'utility';

export interface ToolMetadata {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  category: ToolCategory;
  iconName: string;
  badge?: string;
  isIndiaSpecific?: boolean;
  isPopular?: boolean;
  tags: string[];
}

export interface CalculationHistoryItem {
  id: string;
  toolId: string;
  toolName: string;
  timestamp: number;
  inputSummary: string;
  resultSummary: string;
  details?: Record<string, any>;
}

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  description: string;
  iconName: string;
  color: string;
}
