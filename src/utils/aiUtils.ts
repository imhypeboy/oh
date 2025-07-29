export interface AIScenario {
  id: string;
  title: string;
  description: string;
}

export interface BenefitItem {
  icon: string;
  text: string;
}

export const getScenarioIcon = (scenarioId: string): string => {
  const icons: Record<string, string> = {
    cafe_order: '☕',
    hair_salon: '💇',
    store_inquiry: '🏪',
    restaurant: '🍽️',
    bank: '🏦',
    phone_reservation: '📞',
    phone_delivery: '🍕',
    phone_appointment: '🏥',
    phone_inquiry: '☎️',
    phone_complaint: '📞',
    phone_job_call: '💼',
  };
  return icons[scenarioId] || '🤖';
};

export const getScenarioCategory = (scenarioId: string): 'phone' | 'face-to-face' => {
  const phoneScenarios = [
    'phone_reservation',
    'phone_delivery', 
    'phone_appointment',
    'phone_inquiry',
    'phone_complaint',
    'phone_job_call'
  ];
  return phoneScenarios.includes(scenarioId) ? 'phone' : 'face-to-face';
};

export const getDifficultyLevel = (index: number): string => {
  if (index <= 2) return '⭐⭐';
  if (index <= 5) return '⭐⭐⭐';
  return '⭐⭐⭐⭐';
};

export const getCategoryColor = (category: 'phone' | 'face-to-face'): string => {
  return category === 'phone' ? '#EF4444' : '#10B981';
};

export const getCategoryName = (category: 'phone' | 'face-to-face'): string => {
  return category === 'phone' ? '전화 연습' : '대면 연습';
};

export const getBenefitItems = (): BenefitItem[] => [
  {
    icon: '🎯',
    text: '실제 상황에서의 긴장감 완화'
  },
  {
    icon: '💬',
    text: '자연스러운 대화 흐름 연습'
  },
  {
    icon: '💪',
    text: '자신감 향상과 안전한 실수 경험'
  },
  {
    icon: '📞',
    text: '전화 공포증 극복 및 의사소통 개선'
  }
];

export const getPracticeTips = (): string[] => [
  '실제 상황이라고 생각하고 자연스럽게 대화해보세요',
  '틀려도 괜찮아요! 실수를 통해 배우는 것이 목표입니다',
  '전화 연습 시 할 말을 미리 정리하고 천천히 말해보세요',
  '여러 번 반복 연습하면 실제 상황에서 더 자신있게 행동할 수 있어요'
];

export const getProgressMessage = (practiceCount: number): { 
  title: string; 
  text: string; 
  subtext: string; 
} => {
  if (practiceCount === 0) {
    return {
      title: '연습을 시작해보세요! 🌟',
      text: '첫 번째 AI 연습을 시작해보세요!',
      subtext: '작은 시작이 큰 변화의 첫걸음이에요.'
    };
  }
  
  if (practiceCount < 5) {
    return {
      title: '좋은 시작이에요! 🎯',
      text: `지금까지 ${practiceCount}번의 연습을 완료했습니다!`,
      subtext: '꾸준한 연습으로 실력이 늘고 있어요. 계속 화이팅! 💪'
    };
  }
  
  return {
    title: '연습 고수가 되어가고 있어요! 🏆',
    text: `지금까지 ${practiceCount}번의 연습을 완료했습니다!`,
    subtext: '이제 실제 상황에서도 자신있게 행동할 수 있을 거예요! ✨'
  };
}; 