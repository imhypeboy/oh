import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';

export const CommunityHeaderCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>응원 커뮤니티 💬</Text>
        <Text style={styles.subtitle}>
          익명으로 경험을 나누고 서로 응원해요!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
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
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
}); 