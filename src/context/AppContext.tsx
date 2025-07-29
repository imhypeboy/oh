import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Quest, AISimulation, EmotionRecord } from '../types';

interface AppState {
  user: User | null;
  currentQuests: Quest[];
  completedQuests: Quest[];
  currentSimulation: AISimulation | null;
  emotionRecords: EmotionRecord[];
  isLoading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_CURRENT_QUESTS'; payload: Quest[] }
  | { type: 'ADD_QUEST'; payload: Quest }
  | { type: 'COMPLETE_QUEST'; payload: string }
  | { type: 'SET_SIMULATION'; payload: AISimulation | null }
  | { type: 'ADD_EMOTION_RECORD'; payload: EmotionRecord }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'UPDATE_USER_EXP'; payload: { socialExp?: number; courageExp?: number } };

const initialState: AppState = {
  user: null,
  currentQuests: [],
  completedQuests: [],
  currentSimulation: null,
  emotionRecords: [],
  isLoading: false,
  error: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CURRENT_QUESTS':
      return { ...state, currentQuests: action.payload };
    case 'ADD_QUEST':
      return { ...state, currentQuests: [...state.currentQuests, action.payload] };
    case 'COMPLETE_QUEST':
      const questToComplete = state.currentQuests.find(q => q.id === action.payload);
      if (questToComplete) {
        const updatedQuest = { ...questToComplete, isCompleted: true, completedAt: new Date().toISOString() };
        return {
          ...state,
          currentQuests: state.currentQuests.filter(q => q.id !== action.payload),
          completedQuests: [...state.completedQuests, updatedQuest],
        };
      }
      return state;
    case 'SET_SIMULATION':
      return { ...state, currentSimulation: action.payload };
    case 'ADD_EMOTION_RECORD':
      return { ...state, emotionRecords: [...state.emotionRecords, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'UPDATE_USER_EXP':
      if (state.user) {
        const updatedUser = {
          ...state.user,
          socialExp: state.user.socialExp + (action.payload.socialExp || 0),
          courageExp: state.user.courageExp + (action.payload.courageExp || 0),
        };
        // 레벨업 계산
        const totalExp = updatedUser.socialExp + updatedUser.courageExp;
        const newLevel = Math.floor(totalExp / 100) + 1;
        updatedUser.level = newLevel;
        
        return { ...state, user: updatedUser };
      }
      return state;
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
} 