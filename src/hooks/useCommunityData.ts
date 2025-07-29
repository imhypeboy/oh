import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Animated } from 'react-native';
import { CommunityPost, Emotion } from '../types';
import { 
  getMainEmotions, 
  getAllEmotions, 
  filterPostsByEmotion, 
  getInspirationMessage,
  getMockCommunityPosts,
  EmotionFilter,
  InspirationMessage 
} from '../utils/communityUtils';

interface UseCommunityDataReturn {
  // State
  selectedFilter: Emotion | 'all';
  slideAnim: Animated.Value;
  
  // Computed values
  mainEmotions: EmotionFilter[];
  allEmotions: EmotionFilter[];
  filteredPosts: CommunityPost[];
  inspirationMessage: InspirationMessage;
  communityPosts: CommunityPost[];
  
  // Actions
  handleSegmentPress: (emotionType: Emotion | 'all', index: number) => void;
  toggleLike: (postId: string) => void;
}

export const useCommunityData = (): UseCommunityDataReturn => {
  const [selectedFilter, setSelectedFilter] = useState<Emotion | 'all'>('all');
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(() => getMockCommunityPosts());
  const slideAnim = useRef(new Animated.Value(0)).current;

  // 초기 애니메이션 값 설정 (디버깅용 로그 추가)
  React.useEffect(() => {
    console.log('Community segment initialized with filter:', selectedFilter);
    console.log('Initial slideAnim value:', slideAnim._value);
  }, []);

  // Segment press handler with iOS-style spring animation
  const handleSegmentPress = useCallback((emotionType: Emotion | 'all', index: number) => {
    console.log(`🎯 Segment pressed: ${emotionType}, index: ${index}`);
    console.log(`📊 Current slideAnim value before: ${slideAnim._value}`);
    
    setSelectedFilter(emotionType);
    
    // 간단한 테스트용 애니메이션 (문제 해결용)
    Animated.timing(slideAnim, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start((finished) => {
      console.log(`✅ Animation ${finished ? 'completed' : 'interrupted'} for index: ${index}`);
      console.log(`📊 Final slideAnim value after: ${slideAnim._value}`);
    });
  }, [slideAnim]);

  // Like toggle handler
  const toggleLike = useCallback((postId: string) => {
    setCommunityPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  }, []);

  // Computed values
  const mainEmotions = useMemo(() => getMainEmotions(), []);
  
  const allEmotions = useMemo(() => getAllEmotions(), []);
  
  const filteredPosts = useMemo(() => 
    filterPostsByEmotion(communityPosts, selectedFilter), 
    [communityPosts, selectedFilter]
  );
  
  const inspirationMessage = useMemo(() => getInspirationMessage(), []);

  return {
    selectedFilter,
    slideAnim,
    mainEmotions,
    allEmotions,
    filteredPosts,
    inspirationMessage,
    communityPosts,
    handleSegmentPress,
    toggleLike,
  };
}; 