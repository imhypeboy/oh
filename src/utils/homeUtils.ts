import { QuestCategory } from '../types';

export interface PracticeMenu {
  id: string;
  title: string;
  icon: string;
  description: string;
  color: string;
}

export interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
  unit: string;
}

export const getPracticeMenus = (): PracticeMenu[] => [
  { 
    id: 'ai_basic', 
    title: 'AI 기초 연습', 
    icon: '🤖', 
    description: '카페, 미용실 등', 
    color: '#3B82F6' 
  },
  { 
    id: 'ai_phone', 
    title: '전화 연습', 
    icon: '📞', 
    description: '예약, 주문, 문의', 
    color: '#EF4444' 
  },
  { 
    id: 'real_practice', 
    title: '실전 도전', 
    icon: '🎯', 
    description: '오늘의 퀘스트', 
    color: '#10B981' 
  },
  { 
    id: 'community', 
    title: '응원받기', 
    icon: '💬', 
    description: '경험 공유하기', 
    color: '#8B5CF6' 
  },
];

export const getStatsCards = (
  courageExp: number = 0,
  socialExp: number = 0,
  completedQuests: number = 0,
  streakDays: number = 3
): StatCard[] => [
  { 
    title: '용기 레벨', 
    value: courageExp, 
    icon: '💪', 
    color: '#F59E0B', 
    unit: 'EXP' 
  },
  { 
    title: '사회성 레벨', 
    value: socialExp, 
    icon: '🤝', 
    color: '#3B82F6', 
    unit: 'EXP' 
  },
  { 
    title: '완료 퀘스트', 
    value: completedQuests, 
    icon: '🏆', 
    color: '#10B981', 
    unit: '개' 
  },
  { 
    title: '연속 일수', 
    value: streakDays, 
    icon: '🔥', 
    color: '#EF4444', 
    unit: '일' 
  },
];

export const getQuestCategoryName = (category: QuestCategory): string => {
  switch (category) {
    case QuestCategory.NEARBY:
      return '집 근처';
    case QuestCategory.INTERACTION:
      return '상호작용';
    case QuestCategory.COURAGE:
      return '용기 내기';
    case QuestCategory.SOCIAL:
      return '사회성';
    default:
      return '기타';
  }
};

export const getDifficultyStars = (difficulty: number): string => {
  return '✦'.repeat(difficulty);
};

export const getEncouragementMessage = (): { title: string; text: string } => {
  const messages = [
    {
      title: '🌟 오늘도 화이팅!',
      text: '작은 용기도 큰 변화의 시작이에요. 천천히, 꾸준히 함께 성장해요!'
    },
    {
      title: '💪 당신은 충분히 멋져요!',
      text: '매일 조금씩 더 용감해지고 있어요. 오늘 하루도 응원합니다!'
    },
    {
      title: '✨ 새로운 도전, 새로운 나!',
      text: '어제보다 더 성장한 자신을 발견하게 될 거예요. 함께 해봐요!'
    }
  ];
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}; 