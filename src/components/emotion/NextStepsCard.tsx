import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NextStep } from '../../utils/emotionUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface NextStepsCardProps {
  nextSteps: NextStep[];
}

export const NextStepsCard: React.FC<NextStepsCardProps> = ({ nextSteps }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>다음 단계 제안 🚀</Text>
        <View style={styles.stepsList}>
          {nextSteps.map((step, index) => (
            <View key={index} style={styles.stepItem}>
              <Text style={styles.stepIcon}>{step.icon}</Text>
              <Text style={styles.stepText}>• {step.text}</Text>
            </View>
          ))}
        </View>
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
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  stepsList: {
    gap: spacing.md,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  stepIcon: {
    fontSize: typography.sizes.lg,
    marginRight: spacing.sm,
    width: 24,
    textAlign: 'center',
  },
  stepText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
}); 