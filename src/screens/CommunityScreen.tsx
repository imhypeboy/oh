import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';
import { Emotion, QuestCategory } from '../types';

const { width } = Dimensions.get('window');

export default function CommunityScreen({ navigation }: any) {
  const { state } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState<'all' | Emotion>('all');

  // 임시 커뮤니티 데이터 (실제로는 Supabase에서 가져옴)
  const communityPosts = [
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

  const emotions = [
    { type: 'all' as const, emoji: '🌟', label: '전체' },
    { type: Emotion.EXCITED, emoji: '🤩', label: '뿌듯해요' },
    { type: Emotion.HAPPY, emoji: '😊', label: '기뻐요' },
    { type: Emotion.CONFIDENT, emoji: '😎', label: '자신있어요' },
    { type: Emotion.NERVOUS, emoji: '😅', label: '떨려요' },
    { type: Emotion.DIFFICULT, emoji: '😤', label: '힘들어요' },
    { type: Emotion.ANXIOUS, emoji: '😰', label: '불안해요' },
  ];

  const filteredPosts = communityPosts.filter(post => 
    selectedFilter === 'all' || post.emotion === selectedFilter
  );

  const getEmotionColor = (emotion: Emotion) => {
    const colors = {
      [Emotion.EXCITED]: '#F59E0B',
      [Emotion.HAPPY]: '#10B981',
      [Emotion.CONFIDENT]: '#3B82F6',
      [Emotion.NERVOUS]: '#EF4444',
      [Emotion.DIFFICULT]: '#8B5CF6',
      [Emotion.ANXIOUS]: '#6B7280',
    };
    return colors[emotion] || '#6B7280';
  };

  const getCategoryName = (category: QuestCategory) => {
    const names = {
      [QuestCategory.NEARBY]: '집 근처',
      [QuestCategory.INTERACTION]: '상호작용',
      [QuestCategory.COURAGE]: '용기 내기',
      [QuestCategory.SOCIAL]: '사회성',
    };
    return names[category] || category;
  };

  const getCategoryColor = (category: QuestCategory) => {
    const colors = {
      [QuestCategory.NEARBY]: '#3B82F6',
      [QuestCategory.INTERACTION]: '#10B981',
      [QuestCategory.COURAGE]: '#F59E0B',
      [QuestCategory.SOCIAL]: '#8B5CF6',
    };
    return colors[category] || '#6B7280';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Clean Background */}
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9', '#E2E8F0']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>응원 커뮤니티 💬</Text>
            <Text style={styles.subtitle}>
              익명으로 경험을 나누고 서로 응원해요!
            </Text>
          </View>
        </View>

        {/* Emotion Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {emotions.map((emotion) => (
            <TouchableOpacity
              key={emotion.type}
              style={[
                styles.filterChip,
                selectedFilter === emotion.type && styles.filterChipSelected
              ]}
              onPress={() => setSelectedFilter(emotion.type)}
              activeOpacity={0.7}
            >
              <Text style={styles.filterEmoji}>{emotion.emoji}</Text>
              <Text style={[
                styles.filterText,
                selectedFilter === emotion.type && styles.filterTextSelected
              ]}>
                {emotion.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts List */}
        <ScrollView 
          style={styles.postsList}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.postsContent}
        >
          {filteredPosts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>💬</Text>
              <Text style={styles.emptyTitle}>아직 게시글이 없어요</Text>
              <Text style={styles.emptyText}>
                첫 번째로 경험을 공유해보시는 건 어떨까요?
              </Text>
            </View>
          ) : (
            filteredPosts.map((post) => (
              <View key={post.id} style={styles.postCard}>
                <View style={styles.postContent}>
                  <View style={styles.postHeader}>
                    <View style={styles.postMeta}>
                      <View style={[
                        styles.emotionBadge,
                        { backgroundColor: getEmotionColor(post.emotion) }
                      ]}>
                        <Text style={styles.emotionText}>
                          {emotions.find(e => e.type === post.emotion)?.emoji}
                        </Text>
                      </View>
                      
                      <View style={[
                        styles.categoryBadge,
                        { backgroundColor: getCategoryColor(post.questCategory) + '20' }
                      ]}>
                        <Text style={[
                          styles.categoryText,
                          { color: getCategoryColor(post.questCategory) }
                        ]}>
                          {getCategoryName(post.questCategory)}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.timestamp}>{post.timestamp}</Text>
                  </View>

                  <Text style={styles.postText}>{post.content}</Text>

                  <View style={styles.postFooter}>
                    <TouchableOpacity style={styles.likeButton} activeOpacity={0.7}>
                      <Text style={[
                        styles.likeIcon,
                        { color: post.isLiked ? '#EF4444' : '#9CA3AF' }
                      ]}>
                        ❤️
                      </Text>
                      <Text style={styles.likeCount}>{post.likes}</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.anonymousBadge}>
                      <Text style={styles.anonymousText}>익명</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}

          {/* Inspiration Message */}
          <View style={styles.inspirationCard}>
            <Text style={styles.inspirationTitle}>🌟 함께라서 힘이 나요!</Text>
            <Text style={styles.inspirationText}>
              여러분의 작은 용기가 누군가에게는 큰 힘이 됩니다.
              오늘도 한 걸음씩 나아가는 모든 분들을 응원해요! 💪
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  headerCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  filterContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterChipSelected: {
    backgroundColor: '#3B82F6',
  },
  filterEmoji: {
    fontSize: 16,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  filterTextSelected: {
    color: '#FFFFFF',
  },
  postsList: {
    flex: 1,
  },
  postsContent: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 140 : 120,
  },
  emptyContainer: {
    padding: 60,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  postCard: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  postContent: {
    padding: 20,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emotionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emotionText: {
    fontSize: 16,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  postText: {
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
    marginBottom: 16,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  likeIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  likeCount: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  anonymousBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  anonymousText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  inspirationCard: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inspirationTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  inspirationText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
}); 