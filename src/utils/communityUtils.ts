import { Emotion, QuestCategory, CommunityPost } from '../types';

export interface EmotionFilter {
  type: Emotion | 'all';
  emoji: string;
  label: string;
}

export interface InspirationMessage {
  title: string;
  text: string;
}

// 감정 색상 매핑
export const getEmotionColor = (emotion: Emotion): string => {
  const colors: Record<Emotion, string> = {
    [Emotion.EXCITED]: '#F59E0B',
    [Emotion.HAPPY]: '#10B981',
    [Emotion.CONFIDENT]: '#3B82F6',
    [Emotion.NERVOUS]: '#EF4444',
    [Emotion.DIFFICULT]: '#8B5CF6',
    [Emotion.ANXIOUS]: '#6B7280',
  };
  return colors[emotion] || '#6B7280';
};

// 카테고리 이름 매핑
export const getCategoryName = (category: QuestCategory): string => {
  const names: Record<QuestCategory, string> = {
    [QuestCategory.NEARBY]: '집 근처',
    [QuestCategory.INTERACTION]: '상호작용',
    [QuestCategory.COURAGE]: '용기 내기',
    [QuestCategory.SOCIAL]: '사회성',
  };
  return names[category] || category;
};

// 카테고리 색상 매핑
export const getCategoryColor = (category: QuestCategory): string => {
  const colors: Record<QuestCategory, string> = {
    [QuestCategory.NEARBY]: '#3B82F6',
    [QuestCategory.INTERACTION]: '#10B981',
    [QuestCategory.COURAGE]: '#F59E0B',
    [QuestCategory.SOCIAL]: '#8B5CF6',
  };
  return colors[category] || '#6B7280';
};

// 주요 감정 필터 (세그먼트용)
export const getMainEmotions = (): EmotionFilter[] => [
  { type: 'all', emoji: '🌟', label: '전체' },
  { type: Emotion.EXCITED, emoji: '🤩', label: '뿌듯해요' },
  { type: Emotion.HAPPY, emoji: '😊', label: '기뻐요' },
  { type: Emotion.CONFIDENT, emoji: '😎', label: '자신있어요' },
];

// 모든 감정 필터
export const getAllEmotions = (): EmotionFilter[] => [
  { type: 'all', emoji: '🌟', label: '전체' },
  { type: Emotion.EXCITED, emoji: '🤩', label: '뿌듯해요' },
  { type: Emotion.HAPPY, emoji: '😊', label: '기뻐요' },
  { type: Emotion.CONFIDENT, emoji: '😎', label: '자신있어요' },
  { type: Emotion.NERVOUS, emoji: '😅', label: '떨려요' },
  { type: Emotion.DIFFICULT, emoji: '😤', label: '힘들어요' },
  { type: Emotion.ANXIOUS, emoji: '😰', label: '불안해요' },
];

// 감정 이모지 조회
export const getEmotionEmoji = (emotion: Emotion): string => {
  const allEmotions = getAllEmotions();
  return allEmotions.find(e => e.type === emotion)?.emoji || '😊';
};

// 포스트 필터링
export const filterPostsByEmotion = (
  posts: CommunityPost[], 
  filter: Emotion | 'all'
): CommunityPost[] => {
  if (filter === 'all') return posts;
  return posts.filter(post => post.emotion === filter);
};

// 격려 메시지 생성
export const getInspirationMessage = (): InspirationMessage => {
  const messages: InspirationMessage[] = [
    {
      title: '🌟 함께라서 힘이 나요!',
      text: '여러분의 작은 용기가 누군가에게는 큰 힘이 됩니다. 오늘도 한 걸음씩 나아가는 모든 분들을 응원해요! 💪'
    },
    {
      title: '💪 모든 시작은 용기에서!',
      text: '작은 도전이라도 소중합니다. 여러분의 경험이 다른 누군가에게 희망의 메시지가 되고 있어요!'
    },
    {
      title: '✨ 우리는 혼자가 아니에요!',
      text: '비슷한 고민을 가진 사람들이 이렇게 많아요. 서로 응원하며 함께 성장해나가요!'
    }
  ];
  
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
};

// 세그먼트 애니메이션 계산
export const calculateSegmentPosition = (index: number): number => {
  // 4개 세그먼트 기준으로 위치 계산
  const segmentWidth = 87; // 각 세그먼트 너비
  return index * segmentWidth;
};

// 임시 커뮤니티 데이터 (실제로는 Supabase에서 가져올 예정)
export const getMockCommunityPosts = (): CommunityPost[] => [
  {
    id: '1',
    content: '첫 번째 카페 주문 성공! 떨렸지만 해냈어요 😊',
    emotion: Emotion.NERVOUS,
    questCategory: QuestCategory.NEARBY,
    likes: 12,
    isLiked: false,
    timestamp: '2시간 전',
    isAnonymous: true,
  },
  {
    id: '2',
    content: '미용실에서 헤어스타일 요청 드디어 성공! 생각보다 직원분이 친절하셨어요',
    emotion: Emotion.EXCITED,
    questCategory: QuestCategory.COURAGE,
    likes: 8,
    isLiked: true,
    timestamp: '4시간 전',
    isAnonymous: true,
  },
  {
    id: '3',
    content: '은행 업무 처음 혼자 해봤는데 생각보다 어렵지 않았어요! 다음엔 더 자신있게 할 수 있을 것 같아요',
    emotion: Emotion.CONFIDENT,
    questCategory: QuestCategory.INTERACTION,
    likes: 15,
    isLiked: false,
    timestamp: '6시간 전',
    isAnonymous: true,
  },
  {
    id: '4',
    content: '혼밥 도전했는데 처음엔 어색했지만 괜찮았어요. 다른 분들도 한번 시도해보세요!',
    emotion: Emotion.HAPPY,
    questCategory: QuestCategory.COURAGE,
    likes: 20,
    isLiked: true,
    timestamp: '1일 전',
    isAnonymous: true,
  },
  {
    id: '5',
    content: '전화로 식당 예약 처음 해봤어요! 생각보다 간단했네요. 할 말을 미리 정리하고 연습한 게 도움됐어요',
    emotion: Emotion.EXCITED,
    questCategory: QuestCategory.COURAGE,
    likes: 18,
    isLiked: false,
    timestamp: '1일 전',
    isAnonymous: true,
  },
]; 