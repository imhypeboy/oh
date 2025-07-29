import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { EncouragementMessage } from '../../utils/profileUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface ProfileEncouragementCardProps {
  message: EncouragementMessage;
}

export const ProfileEncouragementCard: React.FC<ProfileEncouragementCardProps> = ({ 
  message 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{message.title}</Text>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.xl,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  text: {
    fontSize: typography.sizes.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
  },
}); 