import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Quest } from '../../types';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { getQuestCategoryName, getDifficultyStars } from '../../utils/homeUtils';

interface TodayQuestSectionProps {
  todayQuests: Quest[];
  loading: boolean;
  onRefresh: () => void;
  onCompleteQuest: (questId: string) => void;
  onViewMore: () => void;
}

export const TodayQuestSection: React.FC<TodayQuestSectionProps> = ({
  todayQuests,
  loading,
  onRefresh,
  onCompleteQuest,
  onViewMore,
}) => {
  const renderLoadingCard = () => (
    <View style={styles.loadingCard}>
      <Text style={styles.loadingText}>✨ 맞춤 퀘스트 생성 중...</Text>
    </View>
  );

  const renderEmptyCard = () => (
    <View style={styles.emptyCard}>
      <Text style={styles.emptyIcon}>🌟</Text>
      <Text style={styles.emptyText}>새로운 모험이 기다리고 있어요!</Text>
    </View>
  );

  const renderQuestCard = (quest: Quest) => (
    <View key={quest.id} style={styles.questCard}>
      <View style={styles.questHeader}>
        <View style={styles.questCategory}>
          <Text style={styles.questCategoryText}>
            {getQuestCategoryName(quest.category)}
          </Text>
        </View>
        <Text style={styles.questDifficulty}>
          {getDifficultyStars(quest.difficulty)}
        </Text>
      </View>
      
      <Text style={styles.questTitle}>{quest.title}</Text>
      <Text style={styles.questDescription}>{quest.description}</Text>
      
      <View style={styles.questFooter}>
        <View style={styles.rewardContainer}>
          <Text style={styles.rewardText}>
            💪 {quest.reward.courageExp} · 🤝 {quest.reward.socialExp}
          </Text>
        </View>
        
        <TouchableOpacity 
          style={styles.completeButton}
          onPress={() => onCompleteQuest(quest.id)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={styles.completeGradient}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMoreQuestsCard = () => (
    <TouchableOpacity 
      style={styles.moreQuestsCard}
      onPress={onViewMore}
      activeOpacity={0.8}
    >
      <Text style={styles.moreQuestsText}>
        +{todayQuests.length - 2}개 더 보기
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 도전 🎯</Text>
        <TouchableOpacity 
          onPress={onRefresh} 
          style={styles.refreshButton}
          activeOpacity={0.7}
        >
          <Text style={styles.refreshText}>새로고침</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        renderLoadingCard()
      ) : todayQuests.length === 0 ? (
        renderEmptyCard()
      ) : (
        <View style={styles.questCards}>
          {todayQuests.slice(0, 2).map(renderQuestCard)}
          {todayQuests.length > 2 && renderMoreQuestsCard()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  refreshButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.sm,
  },
  refreshText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
  },
  loadingCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    ...dimensions.shadow.small,
  },
  loadingText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.medium,
  },
  emptyCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing['2xl'],
    alignItems: 'center',
    ...dimensions.shadow.small,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: spacing.md,
  },
  emptyText: {
    color: colors.text.secondary,
    fontSize: typography.sizes.base,
    textAlign: 'center',
    lineHeight: 20,
  },
  questCards: {
    gap: spacing.md,
  },
  questCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    ...dimensions.shadow.small,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  questCategory: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  questCategoryText: {
    fontSize: typography.sizes.xs,
    color: colors.text.secondary,
    fontWeight: typography.weights.semibold,
  },
  questDifficulty: {
    fontSize: typography.sizes.base,
    color: colors.warning,
  },
  questTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
  questDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: spacing.lg,
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
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: typography.weights.semibold,
  },
  completeButton: {
    borderRadius: spacing.md,
    overflow: 'hidden',
  },
  completeGradient: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  completeButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
  moreQuestsCard: {
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  moreQuestsText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontWeight: typography.weights.semibold,
  },
}); 