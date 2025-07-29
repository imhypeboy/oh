import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { getEncouragementMessage } from '../../utils/homeUtils';

export const EncouragementCard: React.FC = () => {
  const { title, text } = getEncouragementMessage();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginTop: spacing['2xl'],
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
    lineHeight: 20,
  },
}); 