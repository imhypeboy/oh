import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface AIFeedbackCardProps {
  feedback: string;
  loading: boolean;
}

export const AIFeedbackCard: React.FC<AIFeedbackCardProps> = ({
  feedback,
  loading,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.aiAvatar}>
            <LinearGradient
              colors={['#3B82F6', '#1E40AF']}
              style={styles.aiAvatarGradient}
            >
              <Text style={styles.aiAvatarText}>🤖</Text>
            </LinearGradient>
          </View>
          <Text style={styles.title}>AI의 응원 메시지</Text>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <View style={styles.typingIndicator}>
              <View style={[styles.dot, styles.dot1]} />
              <View style={[styles.dot, styles.dot2]} />
              <View style={[styles.dot, styles.dot3]} />
            </View>
            <Text style={styles.loadingText}>메시지를 작성하고 있어요...</Text>
          </View>
        ) : (
          <Text style={styles.feedbackText}>{feedback}</Text>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  aiAvatar: {
    marginRight: spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
  },
  aiAvatarGradient: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatarText: {
    fontSize: typography.sizes.xl,
  },
  title: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    flex: 1,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginHorizontal: 2,
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },
  loadingText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontStyle: 'italic',
  },
  feedbackText: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    lineHeight: 24,
  },
}); 