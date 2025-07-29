import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { QuestCategory } from '../../types';
import { 
  getCategoryName, 
  getCategoryColor, 
  getCategoryIcon 
} from '../../utils/questUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface CategoryData {
  category: QuestCategory;
  count: number;
  quests: any[];
}

interface CategoryGridProps {
  categories: CategoryData[];
  onCategoryPress: (category: QuestCategory) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ 
  categories, 
  onCategoryPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>카테고리별 퀘스트</Text>
      <View style={styles.grid}>
        {categories.map(({ category, count }) => (
          <TouchableOpacity 
            key={category}
            style={styles.categoryCard}
            onPress={() => onCategoryPress(category)}
            activeOpacity={0.7}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: getCategoryColor(category) + '20' }
            ]}>
              <Text style={styles.icon}>
                {getCategoryIcon(category)}
              </Text>
            </View>
            <Text style={styles.categoryName}>
              {getCategoryName(category)}
            </Text>
            <Text style={styles.categoryCount}>
              {count}개
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryCard: {
    width: dimensions.card.category.width,
    height: dimensions.card.category.height,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    marginVertical: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
    ...dimensions.shadow.small,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  icon: {
    fontSize: 30,
  },
  categoryName: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  categoryCount: {
    fontSize: typography.sizes.sm,
    color: colors.text.tertiary,
  },
}); 