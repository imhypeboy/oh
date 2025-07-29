import { useState, useMemo, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { Quest, QuestCategory } from '../types';

interface UseQuestsReturn {
  // State
  selectedCategory: QuestCategory | 'all';
  setSelectedCategory: (category: QuestCategory | 'all') => void;
  
  // Computed values
  filteredQuests: Quest[];
  mainQuests: Quest[];
  categoryQuests: Array<{
    category: QuestCategory;
    count: number;
    quests: Quest[];
  }>;
  
  // Actions
  completeQuest: (questId: string) => void;
}

export const useQuests = (): UseQuestsReturn => {
  const { state, dispatch } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | 'all'>('all');

  const filteredQuests = useMemo(() => {
    return state.currentQuests.filter(quest => 
      selectedCategory === 'all' || quest.category === selectedCategory
    );
  }, [state.currentQuests, selectedCategory]);

  const mainQuests = useMemo(() => {
    return state.currentQuests.slice(0, 5);
  }, [state.currentQuests]);

  const categoryQuests = useMemo(() => {
    return Object.values(QuestCategory).map(category => {
      const questsInCategory = state.currentQuests.filter(q => q.category === category);
      return {
        category,
        count: questsInCategory.length,
        quests: questsInCategory.slice(0, 3),
      };
    });
  }, [state.currentQuests]);

  const completeQuest = useCallback((questId: string) => {
    const quest = state.currentQuests.find(q => q.id === questId);
    if (quest) {
      dispatch({ type: 'COMPLETE_QUEST', payload: questId });
      dispatch({ 
        type: 'UPDATE_USER_EXP', 
        payload: { 
          courageExp: quest.reward.courageExp,
          socialExp: quest.reward.socialExp 
        }
      });
    }
  }, [state.currentQuests, dispatch]);

  return {
    selectedCategory,
    setSelectedCategory,
    filteredQuests,
    mainQuests,
    categoryQuests,
    completeQuest,
  };
}; 