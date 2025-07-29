import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, dimensions } from '../../config/theme';
import { BenefitItem } from '../../utils/aiUtils';

interface BenefitsCardProps {
  benefitItems: BenefitItem[];
}

export const BenefitsCard: React.FC<BenefitsCardProps> = ({ benefitItems }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AI 연습의 효과 ✨</Text>
        <View style={styles.benefitsList}>
          {benefitItems.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>{benefit.icon}</Text>
              <Text style={styles.benefitText}>{benefit.text}</Text>
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
  benefitsList: {
    gap: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  benefitIcon: {
    fontSize: typography.sizes.xl,
    marginRight: spacing.md,
    width: 32,
    textAlign: 'center',
  },
  benefitText: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    flex: 1,
    lineHeight: 22,
  },
}); 