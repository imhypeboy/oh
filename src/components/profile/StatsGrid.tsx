import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatCard } from '../../utils/profileUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface StatsGridProps {
  statsCards: StatCard[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ statsCards }) => {
  return (
    <View style={styles.container}>
      {statsCards.map((stat, index) => (
        <View key={index} style={styles.statCard}>
          <View style={[
            styles.iconContainer,
            { backgroundColor: (stat.color || colors.primary) + '15' }
          ]}>
            <Text style={styles.icon}>{stat.icon}</Text>
          </View>
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: (dimensions.screen.width - 60) / 2,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    ...dimensions.shadow.small,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  value: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: typography.weights.medium,
  },
}); 