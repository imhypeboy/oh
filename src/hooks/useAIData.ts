import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { aiService } from '../services/aiService';
import { 
  getBenefitItems, 
  getPracticeTips, 
  getProgressMessage,
  BenefitItem 
} from '../utils/aiUtils';

interface UseAIDataReturn {
  // State
  loading: boolean;
  
  // Computed values
  scenarios: any[]; // TODO: 타입 정의 개선
  benefitItems: BenefitItem[];
  practiceTips: string[];
  progressData: {
    title: string;
    text: string;
    subtext: string;
  };
  showProgress: boolean;
  
  // Actions
  startSimulation: (scenarioId: string, navigation: any) => Promise<void>;
}

export const useAIData = (): UseAIDataReturn => {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const startSimulation = useCallback(async (scenarioId: string, navigation: any) => {
    setLoading(true);
    try {
      const simulation = await aiService.createSimulation(scenarioId);
      dispatch({ type: 'SET_SIMULATION', payload: simulation });
      navigation.navigate('AISimulation', { scenario: scenarioId });
    } catch (error) {
      Alert.alert('오류', 'AI 시뮬레이션을 시작할 수 없습니다.');
      console.error('AI 시뮬레이션 시작 실패:', error);
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // Computed values
  const scenarios = useMemo(() => {
    return aiService.getAvailableScenarios();
  }, []);

  const benefitItems = useMemo(() => {
    return getBenefitItems();
  }, []);

  const practiceTips = useMemo(() => {
    return getPracticeTips();
  }, []);

  const progressData = useMemo(() => {
    const practiceCount = state.emotionRecords.length;
    return getProgressMessage(practiceCount);
  }, [state.emotionRecords.length]);

  const showProgress = useMemo(() => {
    return state.emotionRecords.length > 0;
  }, [state.emotionRecords.length]);

  return {
    loading,
    scenarios,
    benefitItems,
    practiceTips,
    progressData,
    showProgress,
    startSimulation,
  };
}; 