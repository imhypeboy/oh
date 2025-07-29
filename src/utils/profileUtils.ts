export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface StatCard {
  icon: string;
  value: number | string;
  label: string;
  color?: string;
}

export interface GrowthStat {
  label: string;
  value: string;
}

export interface MenuItem {
  id: string;
  icon: string;
  text: string;
  onPress?: () => void;
}

export interface EncouragementMessage {
  title: string;
  text: string;
}

// 진행바 너비 계산
export const getProgressBarWidth = (current: number, max: number): number => {
  return Math.min((current / max) * 100, 100);
};

// 레벨 계산
export const calculateLevel = (totalExp: number): number => {
  return Math.floor(totalExp / 100) + 1;
};

// 다음 레벨까지 필요한 경험치 계산
export const getExpToNextLevel = (totalExp: number): number => {
  return 100 - (totalExp % 100);
};

// 현재 레벨 내 경험치 계산
export const getCurrentLevelExp = (totalExp: number): number => {
  return totalExp % 100;
};

// 기본 성취 목록
export const getDefaultAchievements = (): Achievement[] => [
  { 
    id: '1', 
    title: '첫 걸음', 
    description: '첫 번째 퀘스트 완료', 
    icon: '🎯', 
    unlocked: true 
  },
  { 
    id: '2', 
    title: '용감한 도전자', 
    description: '용기 카테고리 5개 완료', 
    icon: '💪', 
    unlocked: true 
  },
  { 
    id: '3', 
    title: '전화의 달인', 
    description: '전화 연습 10회 완료', 
    icon: '📞', 
    unlocked: false 
  },
  { 
    id: '4', 
    title: '사교왕', 
    description: '사회성 경험치 100 달성', 
    icon: '👑', 
    unlocked: false 
  },
  { 
    id: '5', 
    title: '완벽주의자', 
    description: '일주일 연속 퀘스트 완료', 
    icon: '⭐', 
    unlocked: false 
  },
  { 
    id: '6', 
    title: '소통의 고수', 
    description: '모든 카테고리 경험', 
    icon: '🌟', 
    unlocked: false 
  },
];

// 통계 카드 생성
export const getStatsCards = (
  courageExp: number = 0,
  socialExp: number = 0,
  completedQuests: number = 0,
  streakDays: number = 3
): StatCard[] => [
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
    icon: '🏆',
    value: completedQuests,
    label: '완료한 퀘스트',
    color: '#10B981',
  },
  {
    icon: '📅',
    value: `${streakDays}일`,
    label: '연속 일수',
    color: '#EF4444',
  },
];

// 성장 통계 생성
export const getGrowthStats = (
  completedQuests: number,
  totalExp: number,
  joinDays: number = 7
): GrowthStat[] => [
  {
    label: '이번 주 완료',
    value: `${completedQuests}개`,
  },
  {
    label: '총 경험치',
    value: `${totalExp} EXP`,
  },
  {
    label: '가입일',
    value: `${joinDays}일 전`,
  },
];

// 설정 메뉴 아이템
export const getSettingsMenuItems = (): MenuItem[] => [
  {
    id: 'notifications',
    icon: '🔔',
    text: '알림 설정',
  },
  {
    id: 'difficulty',
    icon: '🎯',
    text: '퀘스트 난이도 조정',
  },
  {
    id: 'statistics',
    icon: '📊',
    text: '상세 통계 보기',
  },
  {
    id: 'help',
    icon: '❓',
    text: '도움말 및 FAQ',
  },
];

// 격려 메시지 생성
export const getEncouragementMessage = (): EncouragementMessage => {
  const messages: EncouragementMessage[] = [
    {
      title: '🌟 당신은 정말 멋져요!',
      text: '지금까지의 노력과 용기가 정말 대단합니다. 작은 변화가 모여 큰 성장을 만들어내고 있어요. 앞으로도 함께 화이팅해요! 💪'
    },
    {
      title: '💪 꾸준함이 최고의 재능!',
      text: '매일 조금씩이라도 도전하는 당신의 모습이 정말 인상적이에요. 이런 꾸준함이 진정한 변화를 만들어낸답니다!'
    },
    {
      title: '✨ 성장하는 당신이 자랑스러워요!',
      text: '어제보다 더 용감해진 자신을 발견하고 계시겠죠? 이 여정을 함께 할 수 있어서 정말 기뻐요. 계속 응원할게요!'
    }
  ];
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// 사용자 타이틀 생성
export const getUserTitle = (level: number, totalExp: number): string => {
  if (level >= 10) return '소셜 마스터';
  if (level >= 5) return '용감한 모험가';
  if (totalExp >= 50) return '성장하는 탐험가';
  return '소셜 모험가';
};

// 아바타 이모지 생성
export const getAvatarEmoji = (level: number): string => {
  if (level >= 10) return '👑';
  if (level >= 5) return '🌟';
  if (level >= 3) return '💫';
  return '👤';
}; 