import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { StatCard } from '../../utils/homeUtils';

interface StatsGridProps {
  statsCards: StatCard[];
}

export const StatsGrid: React.FC<StatsGridProps> = ({ statsCards }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>나의 성장 기록 📊</Text>
      <View style={styles.grid}>
        {statsCards.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={[
              styles.iconContainer, 
              { backgroundColor: stat.color + '15' }
            ]}>
              <Text style={styles.icon}>{stat.icon}</Text>
            </View>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.unit}>{stat.unit}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
  unit: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  statTitle: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.medium,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 