import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Quest } from '../../types';
import { 
  getCategoryGradient, 
  getTimeRemaining, 
  formatReward 
} from '../../utils/questUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface MainQuestCardProps {
  quest: Quest;
  onPress: (questId: string) => void;
}

export const MainQuestCard: React.FC<MainQuestCardProps> = ({ 
  quest, 
  onPress 
}) => {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => onPress(quest.id)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={getCategoryGradient(quest.category)}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>TODAY'S MAIN</Text>
            </View>
            <Text style={styles.timeText}>⏰ {getTimeRemaining()}</Text>
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
            <View style={styles.action}>
              <Text style={styles.actionText}>시작하기</Text>
              <Text style={styles.arrow}>→</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.card.mainQuest.width,
    height: dimensions.card.mainQuest.height,
    borderRadius: dimensions.borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    marginHorizontal: spacing.md,
    ...dimensions.shadow.large,
  },
  gradient: {
    flex: 1,
    padding: spacing.xl,
    borderRadius: dimensions.borderRadius.xl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.md,
  },
  badgeText: {
    color: colors.text.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
  },
  timeText: {
    fontSize: typography.sizes.base,
    color: colors.text.white,
  },
  title: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.white,
    marginBottom: spacing.sm,
    lineHeight: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  description: {
    fontSize: typography.sizes.lg,
    color: colors.text.white,
    lineHeight: 22,
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reward: {
    fontSize: typography.sizes.xl,
    color: colors.text.white,
    fontWeight: typography.weights.bold,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    marginRight: spacing.xs,
  },
  arrow: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
  },
}); 