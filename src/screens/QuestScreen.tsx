import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  FlatList,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainQuestCard } from '../components/quest/MainQuestCard';
import { CategoryGrid } from '../components/quest/CategoryGrid';
import { QuestCard } from '../components/quest/QuestCard';
import { useQuests } from '../hooks/useQuests';
import { getCategoryName } from '../utils/questUtils';
import { colors, typography, spacing, dimensions } from '../config/theme';
import { RootStackParamList } from '../types';

type QuestScreenProps = NativeStackScreenProps<RootStackParamList, 'Quest'>;

export default function QuestScreen({ navigation }: QuestScreenProps) {
  const {
    selectedCategory,
    setSelectedCategory,
    filteredQuests,
    mainQuests,
    categoryQuests,
    completeQuest,
  } = useQuests();

  const handleQuestPress = (questId: string) => {
    // TODO: QuestDetail 화면 구현 후 연결
    navigation.navigate('QuestDetail', { questId });
  };

  const handleMainQuestPress = (questId: string) => {
    handleQuestPress(questId);
  };

  const handleCategoryPress = (category: any) => {
    setSelectedCategory(category);
  };

  const renderMainQuestCard = ({ item }: { item: any }) => (
    <MainQuestCard quest={item} onPress={handleMainQuestPress} />
  );

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🎯</Text>
      <Text style={styles.emptyTitle}>퀘스트가 없습니다</Text>
      <Text style={styles.emptyText}>
        홈 화면에서 새로운 퀘스트를 생성해보세요!
      </Text>
      <TouchableOpacity 
        style={styles.goHomeButton}
        onPress={() => navigation.navigate('Home')}
        activeOpacity={0.8}
      >
        <Text style={styles.goHomeText}>홈으로 가기</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>퀘스트 카드 🎯</Text>
          <Text style={styles.subtitle}>
            오늘의 모험을 시작해보세요
          </Text>
        </View>

        {/* Main Quest Cards */}
        {mainQuests.length > 0 && (
          <FlatList
            data={mainQuests}
            renderItem={renderMainQuestCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.mainQuestList}
            snapToInterval={dimensions.card.mainQuest.width + 20}
            decelerationRate="fast"
            pagingEnabled={false}
          />
        )}

        {/* Category Grid */}
        <CategoryGrid 
          categories={categoryQuests}
          onCategoryPress={handleCategoryPress}
        />

        {/* Quest List for Selected Category */}
        {selectedCategory !== 'all' && (
          <View style={styles.questListSection}>
            <Text style={styles.questListTitle}>
              {getCategoryName(selectedCategory)} 퀘스트
            </Text>
            {filteredQuests.slice(0, 6).map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onPress={handleQuestPress}
                onComplete={completeQuest}
              />
            ))}
          </View>
        )}

        {/* Empty State */}
        {filteredQuests.length === 0 && <EmptyState />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: typography.sizes['4xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
  },
  mainQuestList: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  questListSection: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  questListTitle: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    paddingHorizontal: spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: spacing['2xl'],
  },
  goHomeButton: {
    backgroundColor: colors.category.social,
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.md,
    borderRadius: spacing['2xl'],
  },
  goHomeText: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
}); 