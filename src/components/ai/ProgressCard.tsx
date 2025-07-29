import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface ProgressCardProps {
  title: string;
  text: string;
  subtext: string;
  show: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  text, 
  subtext, 
  show 
}) => {
  if (!show) return null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.subtext}>{subtext}</Text>
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
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  text: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtext: {
    fontSize: typography.sizes.base,
    color: colors.text.tertiary,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 