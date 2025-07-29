import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Quest } from '../../types';
import { 
  getCategoryName, 
  getCategoryColor, 
  getDifficultyStars,
  formatReward 
} from '../../utils/questUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface QuestCardProps {
  quest: Quest;
  onPress: (questId: string) => void;
  onComplete: (questId: string) => void;
}

export const QuestCard: React.FC<QuestCardProps> = React.memo(({ 
  quest, 
  onPress, 
  onComplete 
}) => {
  const handleCompletePress = (e: any) => {
    e.stopPropagation();
    onComplete(quest.id);
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(quest.id)}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[
            styles.categoryBadge,
            { backgroundColor: getCategoryColor(quest.category) }
          ]}>
            <Text style={styles.categoryText}>
              {getCategoryName(quest.category)}
            </Text>
          </View>
          <Text style={styles.difficulty}>
            {getDifficultyStars(quest.difficulty)}
          </Text>
        </View>
        
        <Text style={styles.title} numberOfLines={2}>
          {quest.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {quest.description}
        </Text>
        
        <View style={styles.footer}>
          <Text style={styles.reward}>
            {formatReward(quest.reward.courageExp, quest.reward.socialExp)}
          </Text>
          <TouchableOpacity 
            style={styles.completeButton}
            onPress={handleCompletePress}
            activeOpacity={0.8}
          >
            <Text style={styles.completeButtonText}>완료</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

QuestCard.displayName = 'QuestCard';

const styles = StyleSheet.create({
  container: {
    width: dimensions.card.quest.width,
    height: dimensions.card.quest.height,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    ...dimensions.shadow.small,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.md,
  },
  categoryText: {
    color: colors.text.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  difficulty: {
    fontSize: typography.sizes.base,
    color: colors.warning,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reward: {
    fontSize: typography.sizes.lg,
    color: colors.warning,
    fontWeight: typography.weights.bold,
  },
  completeButton: {
    backgroundColor: colors.category.social,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.sm,
  },
  completeButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
}); 