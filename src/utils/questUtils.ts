import { QuestCategory, QuestDifficulty } from '../types';
import { colors, gradients } from '../config/theme';

export const getCategoryName = (category: QuestCategory): string => {
  const categoryNames: Record<QuestCategory, string> = {
    [QuestCategory.NEARBY]: '집 근처',
    [QuestCategory.INTERACTION]: '상호작용',
    [QuestCategory.COURAGE]: '용기 내기',
    [QuestCategory.SOCIAL]: '사회성',
  };
  
  return categoryNames[category] || '기타';
};

export const getCategoryColor = (category: QuestCategory): string => {
  const categoryColors: Record<QuestCategory, string> = {
    [QuestCategory.NEARBY]: colors.category.nearby,
    [QuestCategory.INTERACTION]: colors.category.interaction,
    [QuestCategory.COURAGE]: colors.category.courage,
    [QuestCategory.SOCIAL]: colors.category.social,
  };
  
  return categoryColors[category] || colors.category.default;
};

export const getCategoryGradient = (category: QuestCategory): string[] => {
  const categoryGradients: Record<QuestCategory, string[]> = {
    [QuestCategory.NEARBY]: gradients.category.nearby,
    [QuestCategory.INTERACTION]: gradients.category.interaction,
    [QuestCategory.COURAGE]: gradients.category.courage,
    [QuestCategory.SOCIAL]: gradients.category.social,
  };
  
  return categoryGradients[category] || gradients.category.default;
};

export const getCategoryIcon = (category: QuestCategory): string => {
  const categoryIcons: Record<QuestCategory, string> = {
    [QuestCategory.NEARBY]: '🏠',
    [QuestCategory.INTERACTION]: '💬',
    [QuestCategory.COURAGE]: '💪',
    [QuestCategory.SOCIAL]: '👥',
  };
  
  return categoryIcons[category] || '🎯';
};

export const getDifficultyStars = (difficulty: QuestDifficulty): string => {
  const difficultyLevels: Record<QuestDifficulty, number> = {
    [QuestDifficulty.EASY]: 1,
    [QuestDifficulty.MEDIUM]: 2,
    [QuestDifficulty.HARD]: 3,
    [QuestDifficulty.EXPERT]: 4,
  };
  
  const level = difficultyLevels[difficulty] || 1;
  return '⭐'.repeat(level);
};

export const getTimeRemaining = (): string => {
  // TODO: 실제 시간 계산 로직 구현
  return '23시간 남음';
};

export const formatReward = (courageExp: number, socialExp: number): string => {
  return `💪 ${courageExp} | 🤝 ${socialExp}`;
}; 