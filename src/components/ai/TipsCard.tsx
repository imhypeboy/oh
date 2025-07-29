import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface TipsCardProps {
  tips: string[];
}

export const TipsCard: React.FC<TipsCardProps> = ({ tips }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>💡 연습 팁</Text>
        <View style={styles.tipsList}>
          {tips.map((tip, index) => (
            <Text key={index} style={styles.tipText}>
              • {tip}
            </Text>
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
  tipsList: {
    gap: spacing.md,
  },
  tipText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    lineHeight: 22,
    paddingLeft: spacing.sm,
  },
}); 