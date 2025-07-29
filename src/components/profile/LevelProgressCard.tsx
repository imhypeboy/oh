import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface LevelProgressCardProps {
  currentLevel: number;
  currentLevelExp: number;
  expToNextLevel: number;
  progressPercentage: number;
}

export const LevelProgressCard: React.FC<LevelProgressCardProps> = ({
  currentLevel,
  currentLevelExp,
  expToNextLevel,
  progressPercentage,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>레벨 {currentLevel}</Text>
          <Text style={styles.subtitle}>
            다음 레벨까지 {expToNextLevel} EXP
          </Text>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              style={[styles.progressBar, { width: `${progressPercentage}%` }]}
            />
          </View>
        </View>
        
        <Text style={styles.expText}>{currentLevelExp} / 100 EXP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
  },
  progressContainer: {
    marginBottom: spacing.md,
  },
  progressBackground: {
    height: 12,
    backgroundColor: colors.background.secondary,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  expText: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: typography.weights.semibold,
  },
}); 