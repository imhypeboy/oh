// 사용자 타입
export interface User {
  id: string;
  email: string;
  nickname: string;
  level: number;
  socialExp: number;
  courageExp: number;
  totalQuests: number;
  completedQuests: number;
  achievements: Achievement[];
  createdAt: string;
}

// 퀘스트 타입
export interface Quest {
  id: string;
  title: string;
  description: string;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  location?: Location;
  reward: QuestReward;
  isCompleted: boolean;
  completedAt?: string;
  timeLimit?: number; // 분 단위
}

export enum QuestCategory {
  NEARBY = 'nearby', // 집 근처
  INTERACTION = 'interaction', // 상호작용
  COURAGE = 'courage', // 용기 내기
  SOCIAL = 'social', // 사회성
}

export enum QuestDifficulty {
  EASY = 1,
  MEDIUM = 2,
  HARD = 3,
  EXPERT = 4,
}

export interface QuestReward {
  socialExp: number;
  courageExp: number;
  achievement?: Achievement;
}

// 위치 타입
export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  placeName?: string;
  category?: string;
}

// 성취/칭호 타입
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  rarity: AchievementRarity;
}

export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

// AI 시뮬레이션 타입
export interface AISimulation {
  id: string;
  scenario: string;
  character: string; // 카페 직원, 미용사 등
  messages: ChatMessage[];
  isCompleted: boolean;
  feedback?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

// 감정 기록 타입
export interface EmotionRecord {
  id: string;
  questId: string;
  emotion: Emotion;
  note?: string;
  timestamp: string;
  aiFeedback?: string;
}

export enum Emotion {
  EXCITED = 'excited', // 뿌듯해요
  NERVOUS = 'nervous', // 떨려요
  HAPPY = 'happy', // 기뻐요
  DIFFICULT = 'difficult', // 힘들어요
  CONFIDENT = 'confident', // 자신있어요
  ANXIOUS = 'anxious', // 불안해요
}

// 커뮤니티 타입
export interface CommunityPost {
  id: string;
  content: string;
  emotion: Emotion;
  questCategory: QuestCategory;
  likes: number;
  isLiked: boolean;
  timestamp: string;
  isAnonymous: boolean;
}

// 네비게이션 타입
export type RootStackParamList = {
  Main: undefined;
  QuestDetail: { questId: string };
  AISimulation: { scenario: string };
  EmotionRecord: { questId: string };
  Profile: undefined;
  Community: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Quests: undefined;
  AI: undefined;
  Community: undefined;
  Profile: undefined;
}; 