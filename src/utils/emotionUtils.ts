import { Emotion } from '../types';

export interface EmotionOption {
  type: Emotion;
  emoji: string;
  label: string;
  color: string;
}

export interface RewardStat {
  icon: string;
  value: number;
  label: string;
  color: string;
}

export interface NextStep {
  text: string;
  icon?: string;
}

// 감정 옵션 목록
export const getEmotionOptions = (): EmotionOption[] => [
  { type: Emotion.EXCITED, emoji: '🤩', label: '뿌듯해요', color: '#10B981' },
  { type: Emotion.HAPPY, emoji: '😊', label: '기뻐요', color: '#3B82F6' },
  { type: Emotion.CONFIDENT, emoji: '😎', label: '자신있어요', color: '#8B5CF6' },
  { type: Emotion.NERVOUS, emoji: '😅', label: '떨렸어요', color: '#F59E0B' },
  { type: Emotion.DIFFICULT, emoji: '😤', label: '힘들었어요', color: '#EF4444' },
  { type: Emotion.ANXIOUS, emoji: '😰', label: '불안했어요', color: '#6B7280' },
];

// 감정별 기본 메시지
export const getDefaultEmotionMessage = (emotion: Emotion): string => {
  const messages: Record<Emotion, string> = {
    [Emotion.EXCITED]: '정말 멋져요! 🎉 이런 뿌듯함이 바로 성장의 증거예요. 특히 전화 통화는 많은 사람들이 어려워하는데, 성공적으로 해내신 것이 대단합니다!',
    [Emotion.HAPPY]: '행복한 마음이 전해져요! 😊 전화 통화를 무사히 마치신 것만으로도 큰 발전이에요. 작은 성공들이 모여 큰 변화를 만들어내고 있어요.',
    [Emotion.CONFIDENT]: '자신감이 느껴져요! 💪 전화 통화에 대한 두려움이 줄어들고 있다는 증거예요. 이런 마음가짐이면 다음 통화는 더 쉬울 거예요.',
    [Emotion.NERVOUS]: '떨리는 마음으로도 해내신 당신이 정말 대단해요! 😊 전화 공포는 누구나 경험하는 자연스러운 감정이에요. 용기 있는 첫 발걸음이었습니다.',
    [Emotion.DIFFICULT]: '힘들었지만 포기하지 않은 당신을 응원해요! 💪 전화 통화는 연습이 필요한 스킬이에요. 오늘의 경험이 다음번을 더 쉽게 만들어줄 거예요.',
    [Emotion.ANXIOUS]: '불안함에도 불구하고 도전한 당신이 훌륭해요! 🌟 전화 통화 전 불안한 마음은 당연해요. 미리 할 말을 정리하고 연습하면 다음엔 더 편할 거예요.',
  };
  return messages[emotion] || '당신의 도전을 응원합니다! 💪';
};

// 리워드 통계 생성
export const getRewardStats = (courageExp: number = 15, socialExp: number = 10): RewardStat[] => [
  {
    icon: '💪',
    value: courageExp,
    label: '용기',
    color: '#F59E0B',
  },
  {
    icon: '🤝',
    value: socialExp,
    label: '사회성',
    color: '#3B82F6',
  },
  {
    icon: '⭐',
    value: courageExp + socialExp,
    label: '총 EXP',
    color: '#10B981',
  },
];

// 다음 단계 제안
export const getNextSteps = (): NextStep[] => [
  {
    text: '오늘의 경험을 커뮤니티에 공유해보세요',
    icon: '💬',
  },
  {
    text: '비슷한 상황에서 AI 연습을 해보세요',
    icon: '🤖',
  },
  {
    text: '내일의 새로운 퀘스트를 확인해보세요',
    icon: '🎯',
  },
];

// 선택된 감정 데이터 조회
export const getSelectedEmotionData = (
  emotion: Emotion, 
  emotions: EmotionOption[]
): EmotionOption | undefined => {
  return emotions.find(e => e.type === emotion);
};

// 감정 기록 생성
export const createEmotionRecord = (
  questId: string,
  emotion: Emotion,
  feedback: string,
  emotions: EmotionOption[]
) => {
  const emotionData = getSelectedEmotionData(emotion, emotions);
  
  return {
    id: Date.now().toString(),
    questId,
    emotion,
    content: `퀘스트 완료 후 ${emotionData?.label} 감정을 느꼈습니다.`,
    feedback,
    timestamp: new Date(),
  };
};

// 타이핑 애니메이션용 도트 스타일 생성
export const getTypingDotStyle = (index: number) => {
  const baseDelay = index * 200;
  return {
    animationDelay: `${baseDelay}ms`,
  };
}; 