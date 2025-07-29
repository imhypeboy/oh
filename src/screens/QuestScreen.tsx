import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useAppContext } from '../context/AppContext';
import { Quest, QuestCategory, QuestDifficulty } from '../types';

const { width } = Dimensions.get('window');

export default function QuestScreen({ navigation }: any) {
  const { state, dispatch } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState<QuestCategory | 'all'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<QuestDifficulty | 'all'>('all');

  const categories = [
    { key: 'all', name: '전체', color: '#757575' },
    { key: QuestCategory.NEARBY, name: '집 근처', color: '#4CAF50' },
    { key: QuestCategory.INTERACTION, name: '상호작용', color: '#2196F3' },
    { key: QuestCategory.COURAGE, name: '용기 내기', color: '#FF9800' },
    { key: QuestCategory.SOCIAL, name: '사회성', color: '#E91E63' },
  ];

  const difficulties = [
    { key: 'all', name: '전체', stars: '' },
    { key: QuestDifficulty.EASY, name: '쉬움', stars: '⭐' },
    { key: QuestDifficulty.MEDIUM, name: '보통', stars: '⭐⭐' },
    { key: QuestDifficulty.HARD, name: '어려움', stars: '⭐⭐⭐' },
    { key: QuestDifficulty.EXPERT, name: '최고', stars: '⭐⭐⭐⭐' },
  ];

  const filteredQuests = state.currentQuests.filter(quest => {
    const categoryMatch = selectedCategory === 'all' || quest.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'all' || quest.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const completeQuest = (questId: string) => {
    const quest = state.currentQuests.find(q => q.id === questId);
    if (quest) {
      dispatch({ type: 'COMPLETE_QUEST', payload: questId });
      dispatch({ 
        type: 'UPDATE_USER_EXP', 
        payload: { 
          socialExp: quest.reward.socialExp, 
          courageExp: quest.reward.courageExp 
        }
      });
      
      // 감정 기록 화면으로 이동
      navigation.navigate('EmotionRecord', { questId });
    }
  };

  const getCategoryColor = (category: QuestCategory) => {
    const colors = {
      [QuestCategory.NEARBY]: '#4CAF50',
      [QuestCategory.INTERACTION]: '#2196F3',
      [QuestCategory.COURAGE]: '#FF9800',
      [QuestCategory.SOCIAL]: '#E91E63',
    };
    return colors[category] || '#757575';
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

  const getDifficultyStars = (difficulty: number) => {
    return '⭐'.repeat(difficulty);
  };

  const getTimeRemaining = (quest: Quest) => {
    // 24시간 제한 계산 (실제로는 퀘스트 생성 시간 기준)
    return '23시간 남음'; // 임시
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>퀘스트 목록 🎯</Text>
        <Text style={styles.subtitle}>
          현재 {filteredQuests.length}개의 퀘스트가 있습니다
        </Text>
      </View>

      {/* 카테고리 필터 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.filterChip,
              { 
                backgroundColor: selectedCategory === category.key ? category.color : '#f5f5f5',
                borderColor: category.color,
              }
            ]}
            onPress={() => setSelectedCategory(category.key as any)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedCategory === category.key ? '#fff' : category.color }
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 난이도 필터 */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {difficulties.map((difficulty) => (
          <TouchableOpacity
            key={difficulty.key}
            style={[
              styles.filterChip,
              { 
                backgroundColor: selectedDifficulty === difficulty.key ? '#FF9800' : '#f5f5f5',
                borderColor: '#FF9800',
              }
            ]}
            onPress={() => setSelectedDifficulty(difficulty.key as any)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedDifficulty === difficulty.key ? '#fff' : '#FF9800' }
            ]}>
              {difficulty.stars} {difficulty.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 퀘스트 목록 */}
      <ScrollView 
        style={styles.questList}
        showsVerticalScrollIndicator={false}
      >
        {filteredQuests.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎯</Text>
            <Text style={styles.emptyTitle}>퀘스트가 없습니다</Text>
            <Text style={styles.emptyText}>
              홈 화면에서 새로운 퀘스트를 생성해보세요!
            </Text>
            <TouchableOpacity 
              style={styles.goHomeButton}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.goHomeText}>홈으로 가기</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredQuests.map((quest) => (
            <TouchableOpacity 
              key={quest.id} 
              style={styles.questCard}
              onPress={() => navigation.navigate('QuestDetail', { questId: quest.id })}
            >
              <View style={styles.questHeader}>
                <View style={[
                  styles.categoryBadge, 
                  { backgroundColor: getCategoryColor(quest.category) }
                ]}>
                  <Text style={styles.categoryText}>
                    {getCategoryName(quest.category)}
                  </Text>
                </View>
                <View style={styles.questMeta}>
                  <Text style={styles.difficulty}>
                    {getDifficultyStars(quest.difficulty)}
                  </Text>
                  <Text style={styles.timeRemaining}>
                    ⏰ {getTimeRemaining(quest)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.questTitle}>{quest.title}</Text>
              <Text style={styles.questDescription} numberOfLines={2}>
                {quest.description}
              </Text>
              
              {quest.location && (
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>
                    📍 {quest.location.placeName || quest.location.address}
                  </Text>
                </View>
              )}
              
              <View style={styles.questFooter}>
                <View style={styles.rewardContainer}>
                  <Text style={styles.rewardText}>
                    💪 {quest.reward.courageExp} | 🤝 {quest.reward.socialExp}
                  </Text>
                </View>
                
                <TouchableOpacity 
                  style={styles.completeButton}
                  onPress={(e) => {
                    e.stopPropagation();
                    completeQuest(quest.id);
                  }}
                >
                  <Text style={styles.completeButtonText}>완료</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterContent: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  questList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 140 : 120,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 40,
  },
  goHomeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  goHomeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '500',
  },
  questMeta: {
    alignItems: 'flex-end',
  },
  difficulty: {
    fontSize: 14,
    marginBottom: 4,
  },
  timeRemaining: {
    fontSize: 12,
    color: '#FF5722',
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  questDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  locationContainer: {
    backgroundColor: '#f0f9ff',
    padding: 8,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationText: {
    fontSize: 12,
    color: '#0369a1',
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    flex: 1,
  },
  rewardText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
}); 