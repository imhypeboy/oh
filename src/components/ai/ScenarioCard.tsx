import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { 
  getScenarioIcon, 
  getScenarioCategory, 
  getDifficultyLevel,
  getCategoryColor,
  getCategoryName,
  AIScenario 
} from '../../utils/aiUtils';

interface ScenarioCardProps {
  scenario: AIScenario;
  index: number;
  loading: boolean;
  onPress: (scenarioId: string) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = React.memo(({ 
  scenario, 
  index, 
  loading, 
  onPress 
}) => {
  const category = getScenarioCategory(scenario.id);
  const categoryColor = getCategoryColor(category);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(scenario.id)}
      disabled={loading}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Text style={styles.emoji}>
              {getScenarioIcon(scenario.id)}
            </Text>
          </View>
          <View style={styles.meta}>
            <View style={[
              styles.categoryBadge,
              { backgroundColor: categoryColor + '20' }
            ]}>
              <Text style={[
                styles.categoryText,
                { color: categoryColor }
              ]}>
                {getCategoryName(category)}
              </Text>
            </View>
            <Text style={styles.difficultyStars}>
              {getDifficultyLevel(index)}
            </Text>
          </View>
        </View>
        
        <View style={styles.info}>
          <Text style={styles.title}>{scenario.title}</Text>
          <Text style={styles.description}>
            {scenario.description}
          </Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onPress(scenario.id)}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>
                {loading ? '시작 중...' : '연습 시작'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

ScenarioCard.displayName = 'ScenarioCard';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.background.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 28,
  },
  meta: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  categoryBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.md,
  },
  categoryText: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  difficultyStars: {
    fontSize: typography.sizes.base,
    color: colors.warning,
  },
  info: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    lineHeight: 26,
  },
  description: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    lineHeight: 22,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    borderRadius: spacing.md,
    overflow: 'hidden',
    minWidth: 120,
  },
  gradient: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.text.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
}); 