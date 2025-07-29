import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { aiService } from '../services/aiService';
import { Emotion } from '../types';
import { 
  getEmotionOptions,
  getDefaultEmotionMessage,
  getRewardStats,
  getNextSteps,
  getSelectedEmotionData,
  createEmotionRecord,
  EmotionOption,
  RewardStat,
  NextStep 
} from '../utils/emotionUtils';

interface UseEmotionRecordReturn {
  // State
  selectedEmotion: Emotion | null;
  feedback: string;
  loading: boolean;
  submitted: boolean;
  
  // Computed values
  emotions: EmotionOption[];
  selectedEmotionData: EmotionOption | undefined;
  rewardStats: RewardStat[];
  nextSteps: NextStep[];
  
  // Actions
  handleEmotionSelect: (emotion: Emotion) => Promise<void>;
  handleSubmit: (questId: string, navigation: any) => void;
}

export const useEmotionRecord = (): UseEmotionRecordReturn => {
  const { dispatch } = useAppContext();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle emotion selection and AI feedback generation
  const handleEmotionSelect = useCallback(async (emotion: Emotion) => {
    if (submitted) return;
    
    setSelectedEmotion(emotion);
    setLoading(true);

    try {
      const aiResponse = await aiService.generateEmotionFeedback(emotion, '퀘스트를 완료했습니다');
      setFeedback(aiResponse);
    } catch (error) {
      console.error('AI 피드백 생성 실패:', error);
      setFeedback(getDefaultEmotionMessage(emotion));
    } finally {
      setLoading(false);
    }
  }, [submitted]);

  // Handle record submission
  const handleSubmit = useCallback((questId: string, navigation: any) => {
    if (!selectedEmotion) {
      Alert.alert('알림', '감정을 선택해주세요.');
      return;
    }

    // 감정 기록 저장
    const emotionRecord = createEmotionRecord(
      questId,
      selectedEmotion,
      feedback,
      emotions
    );

    dispatch({ type: 'RECORD_EMOTION', payload: emotionRecord });
    setSubmitted(true);
    
    // 잠시 후 홈으로 돌아가기
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }, [selectedEmotion, feedback, dispatch]);

  // Computed values
  const emotions = useMemo(() => getEmotionOptions(), []);
  
  const selectedEmotionData = useMemo(() => {
    if (!selectedEmotion) return undefined;
    return getSelectedEmotionData(selectedEmotion, emotions);
  }, [selectedEmotion, emotions]);
  
  const rewardStats = useMemo(() => {
    return getRewardStats(15, 10); // TODO: 실제 퀘스트 보상값 사용
  }, []);
  
  const nextSteps = useMemo(() => getNextSteps(), []);

  return {
    selectedEmotion,
    feedback,
    loading,
    submitted,
    emotions,
    selectedEmotionData,
    rewardStats,
    nextSteps,
    handleEmotionSelect,
    handleSubmit,
  };
}; 