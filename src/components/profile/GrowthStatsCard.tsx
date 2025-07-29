import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GrowthStat } from '../../utils/profileUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface GrowthStatsCardProps {
  growthStats: GrowthStat[];
}

export const GrowthStatsCard: React.FC<GrowthStatsCardProps> = ({ 
  growthStats 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>성장 기록 📈</Text>
        <View style={styles.statsContainer}>
          {growthStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Text style={styles.label}>{stat.label}</Text>
              <Text style={styles.value}>{stat.value}</Text>
            </View>
          ))}
        </View>
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
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  label: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  value: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
  },
}); 