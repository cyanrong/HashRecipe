export interface Recipe {
  id: string;
  title: string;
  calories: number;
  timeMinutes: number;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
  hashCode: string; // The simulated binary hash
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  query: string;
  type: 'TEXT' | 'IMAGE';
  algorithm: Algorithm;
  resultsCount: number;
}

export enum Algorithm {
  DSH = 'DSH',
  CLIP = 'CLIP',
}

export enum ViewState {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
  HISTORY = 'HISTORY',
}

export enum SearchMode {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE',
}

export type Language = 'en' | 'zh';