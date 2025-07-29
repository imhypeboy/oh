import { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { questService } from '../services/questService';
import { locationService } from '../services/locationService';
import { Quest } from '../types';
import { getPracticeMenus, getStatsCards, StatCard, PracticeMenu } from '../utils/homeUtils';

interface UseHomeDataReturn {
  // State
  todayQuests: Quest[];
  loading: boolean;
  
  // Computed values
  statsCards: StatCard[];
  practiceMenus: PracticeMenu[];
  
  // Actions
  loadTodayQuests: () => Promise<void>;
  completeQuest: (questId: string) => void;
  handleMenuPress: (menuId: string, navigation: any) => void;
}

export const useHomeData = (): UseHomeDataReturn => {
  const { state, dispatch } = useAppContext();
  const [todayQuests, setTodayQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTodayQuests = useCallback(async () => {
    if (!state.user) return;
    
    setLoading(true);
    try {
      const currentLocation = await locationService.getCurrentLocation();
      const quests = await questService.generateDailyQuests(
        state.user.level,
        currentLocation || undefined
      );
      
      setTodayQuests(quests);
      dispatch({ type: 'SET_CURRENT_QUESTS', payload: quests });
    } catch (error) {
      console.error('퀘스트 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [state.user, dispatch]);

  const completeQuest = useCallback((questId: string) => {
    const quest = todayQuests.find(q => q.id === questId);
    if (quest) {
      dispatch({ type: 'COMPLETE_QUEST', payload: questId });
      dispatch({ 
        type: 'UPDATE_USER_EXP', 
        payload: { 
          socialExp: quest.reward.socialExp, 
          courageExp: quest.reward.courageExp 
        }
      });
      // 감정 기록 화면으로 이동은 컴포넌트에서 처리
    }
  }, [todayQuests, dispatch]);

  const handleMenuPress = useCallback((menuId: string, navigation: any) => {
    switch (menuId) {
      case 'ai_basic':
      case 'ai_phone':
        navigation.navigate('AI');
        break;
      case 'real_practice':
        navigation.navigate('Quests');
        break;
      case 'community':
        navigation.navigate('Community');
        break;
    }
  }, []);

  // Load quests on user change
  useEffect(() => {
    loadTodayQuests();
  }, [loadTodayQuests]);

  // Computed values
  const statsCards = getStatsCards(
    state.user?.courageExp || 0,
    state.user?.socialExp || 0,
    state.completedQuests.length,
    3 // TODO: 실제 연속 일수 계산 로직 구현
  );

  const practiceMenus = getPracticeMenus();

  return {
    todayQuests,
    loading,
    statsCards,
    practiceMenus,
    loadTodayQuests,
    completeQuest,
    handleMenuPress,
  };
}; 