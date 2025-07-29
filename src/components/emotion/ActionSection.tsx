import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface ActionSectionProps {
  submitted: boolean;
  onSubmit: () => void;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  submitted,
  onSubmit,
}) => {
  if (submitted) {
    return (
      <View style={styles.container}>
        <View style={styles.completedCard}>
          <View style={styles.completedContent}>
            <Text style={styles.completedIcon}>✨</Text>
            <Text style={styles.completedTitle}>기록이 완료되었어요!</Text>
            <Text style={styles.completedSubtitle}>
              잠시 후 홈 화면으로 돌아갑니다
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={onSubmit}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={styles.submitGradient}
        >
          <Text style={styles.submitButtonText}>기록 완료</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  submitButton: {
    borderRadius: spacing.lg,
    overflow: 'hidden',
    ...dimensions.shadow.medium,
  },
  submitGradient: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
  },
  completedCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.xl,
    alignItems: 'center',
    ...dimensions.shadow.small,
  },
  completedContent: {
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 48,
    marginBottom: spacing.lg,
  },
  completedTitle: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 