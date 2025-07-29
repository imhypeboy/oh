import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing } from '../../config/theme';

interface HeaderSectionProps {
  userName?: string;
  userLevel?: number;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({ 
  userName = '용감한 탐험가', 
  userLevel = 1 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>✨ 좋은 하루예요</Text>
        <Text style={styles.userName}>{userName}님</Text>
      </View>
      <View style={styles.levelBadge}>
        <LinearGradient
          colors={['#3B82F6', '#1E40AF']}
          style={styles.levelGradient}
        >
          <Text style={styles.levelText}>Lv.{userLevel}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
    marginBottom: spacing.xs,
  },
  userName: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  levelBadge: {
    borderRadius: spacing.lg,
    overflow: 'hidden',
  },
  levelGradient: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  levelText: {
    color: colors.text.white,
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
  },
}); 