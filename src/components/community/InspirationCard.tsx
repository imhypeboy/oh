import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { InspirationMessage } from '../../utils/communityUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface InspirationCardProps {
  message: InspirationMessage;
}

export const InspirationCard: React.FC<InspirationCardProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message.title}</Text>
      <Text style={styles.text}>{message.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...dimensions.shadow.small,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  text: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 