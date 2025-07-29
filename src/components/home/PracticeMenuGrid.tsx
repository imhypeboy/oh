import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { PracticeMenu } from '../../utils/homeUtils';

interface PracticeMenuGridProps {
  practiceMenus: PracticeMenu[];
  onMenuPress: (menuId: string) => void;
}

export const PracticeMenuGrid: React.FC<PracticeMenuGridProps> = ({ 
  practiceMenus, 
  onMenuPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘 뭘 연습해볼까요? 🎭</Text>
      <View style={styles.grid}>
        {practiceMenus.map((menu) => (
          <TouchableOpacity
            key={menu.id}
            style={styles.menuCard}
            onPress={() => onMenuPress(menu.id)}
            activeOpacity={0.8}
          >
            <View style={[
              styles.iconContainer, 
              { backgroundColor: menu.color + '15' }
            ]}>
              <Text style={styles.icon}>{menu.icon}</Text>
            </View>
            <Text style={styles.menuTitle}>{menu.title}</Text>
            <Text style={styles.menuDescription}>{menu.description}</Text>
            <View style={[styles.indicator, { backgroundColor: menu.color }]} />
          </TouchableOpacity>
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
  menuCard: {
    width: (dimensions.screen.width - 60) / 2,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
    position: 'relative',
    ...dimensions.shadow.small,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 22,
  },
  menuTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  menuDescription: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    lineHeight: 16,
    textAlign: 'center',
  },
  indicator: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
}); 