import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Emotion } from '../../types';
import { EmotionOption } from '../../utils/emotionUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface EmotionGridProps {
  emotions: EmotionOption[];
  selectedEmotion: Emotion | null;
  onEmotionSelect: (emotion: Emotion) => void;
  disabled?: boolean;
}

export const EmotionGrid: React.FC<EmotionGridProps> = ({
  emotions,
  selectedEmotion,
  onEmotionSelect,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>지금 기분은? 💭</Text>
      <View style={styles.grid}>
        {emotions.map((emotion) => (
          <TouchableOpacity
            key={emotion.type}
            style={styles.emotionWrapper}
            onPress={() => onEmotionSelect(emotion.type)}
            disabled={disabled}
            activeOpacity={0.8}
          >
            <View style={[
              styles.emotionCard,
              selectedEmotion === emotion.type && styles.emotionCardSelected,
              selectedEmotion === emotion.type && { borderColor: emotion.color }
            ]}>
              <View style={styles.emotionContent}>
                <Text style={styles.emotionEmoji}>
                  {emotion.emoji}
                </Text>
                <Text style={[
                  styles.emotionLabel,
                  selectedEmotion === emotion.type && { color: emotion.color }
                ]}>
                  {emotion.label}
                </Text>
              </View>
              {selectedEmotion === emotion.type && (
                <View style={[styles.selectedIndicator, { backgroundColor: emotion.color }]}>
                  <Text style={styles.selectedIcon}>✓</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emotionWrapper: {
    width: '48%',
    marginBottom: spacing.md,
  },
  emotionCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    minHeight: 100,
    justifyContent: 'center',
    ...dimensions.shadow.small,
  },
  emotionCardSelected: {
    borderWidth: 2,
    ...dimensions.shadow.medium,
  },
  emotionContent: {
    alignItems: 'center',
  },
  emotionEmoji: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  emotionLabel: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.text.primary,
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    color: colors.text.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.bold,
  },
}); 