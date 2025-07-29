import { useMemo, useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { 
  getDefaultAchievements,
  getStatsCards,
  getGrowthStats,
  getSettingsMenuItems,
  getEncouragementMessage,
  getUserTitle,
  getAvatarEmoji,
  calculateLevel,
  getExpToNextLevel,
  getCurrentLevelExp,
  getProgressBarWidth,
  Achievement,
  StatCard,
  GrowthStat,
  MenuItem,
  EncouragementMessage 
} from '../utils/profileUtils';

interface UseProfileDataReturn {
  // User info
  nickname: string;
  userTitle: string;
  avatarEmoji: string;
  
  // Level & EXP
  currentLevel: number;
  totalExp: number;
  currentLevelExp: number;
  expToNextLevel: number;
  progressPercentage: number;
  
  // Data arrays
  achievements: Achievement[];
  statsCards: StatCard[];
  growthStats: GrowthStat[];
  settingsMenuItems: MenuItem[];
  encouragementMessage: EncouragementMessage;
  
  // Actions
  handleMenuPress: (menuId: string) => void;
}

export const useProfileData = (): UseProfileDataReturn => {
  const { state } = useAppContext();

  // Calculate experience and level
  const totalExp = useMemo(() => {
    return (state.user?.socialExp || 0) + (state.user?.courageExp || 0);
  }, [state.user?.socialExp, state.user?.courageExp]);

  const currentLevel = useMemo(() => {
    return calculateLevel(totalExp);
  }, [totalExp]);

  const currentLevelExp = useMemo(() => {
    return getCurrentLevelExp(totalExp);
  }, [totalExp]);

  const expToNextLevel = useMemo(() => {
    return getExpToNextLevel(totalExp);
  }, [totalExp]);

  const progressPercentage = useMemo(() => {
    return getProgressBarWidth(currentLevelExp, 100);
  }, [currentLevelExp]);

  // User info
  const nickname = useMemo(() => {
    return state.user?.nickname || '용감한 탐험가';
  }, [state.user?.nickname]);

  const userTitle = useMemo(() => {
    return getUserTitle(currentLevel, totalExp);
  }, [currentLevel, totalExp]);

  const avatarEmoji = useMemo(() => {
    return getAvatarEmoji(currentLevel);
  }, [currentLevel]);

  // Data arrays
  const achievements = useMemo(() => {
    return getDefaultAchievements();
  }, []);

  const statsCards = useMemo(() => {
    return getStatsCards(
      state.user?.courageExp || 0,
      state.user?.socialExp || 0,
      state.completedQuests.length,
      3 // TODO: 실제 연속 일수 계산 로직 구현
    );
  }, [state.user?.courageExp, state.user?.socialExp, state.completedQuests.length]);

  const growthStats = useMemo(() => {
    return getGrowthStats(
      state.completedQuests.length,
      totalExp,
      7 // TODO: 실제 가입일 계산 로직 구현
    );
  }, [state.completedQuests.length, totalExp]);

  const settingsMenuItems = useMemo(() => {
    return getSettingsMenuItems();
  }, []);

  const encouragementMessage = useMemo(() => {
    return getEncouragementMessage();
  }, []);

  // Actions
  const handleMenuPress = useCallback((menuId: string) => {
    // TODO: 실제 메뉴 액션 구현
    console.log(`메뉴 선택: ${menuId}`);
    
    switch (menuId) {
      case 'notifications':
        // 알림 설정 화면으로 이동
        break;
      case 'difficulty':
        // 난이도 조정 화면으로 이동
        break;
      case 'statistics':
        // 통계 화면으로 이동
        break;
      case 'help':
        // 도움말 화면으로 이동
        break;
      default:
        break;
    }
  }, []);

  return {
    nickname,
    userTitle,
    avatarEmoji,
    currentLevel,
    totalExp,
    currentLevelExp,
    expToNextLevel,
    progressPercentage,
    achievements,
    statsCards,
    growthStats,
    settingsMenuItems,
    encouragementMessage,
    handleMenuPress,
  };
}; 