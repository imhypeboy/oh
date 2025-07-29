import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface ProfileHeaderCardProps {
  nickname: string;
  userTitle: string;
  avatarEmoji: string;
}

export const ProfileHeaderCard: React.FC<ProfileHeaderCardProps> = ({
  nickname,
  userTitle,
  avatarEmoji,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#3B82F6', '#1E40AF']}
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{avatarEmoji}</Text>
          </LinearGradient>
        </View>
        <Text style={styles.nickname}>{nickname}</Text>
        <Text style={styles.userTitle}>{userTitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    ...dimensions.shadow.medium,
  },
  avatarText: {
    fontSize: 32,
    color: colors.text.white,
  },
  nickname: {
    fontSize: typography.sizes['3xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  userTitle: {
    fontSize: typography.sizes.lg,
    color: colors.text.secondary,
    textAlign: 'center',
  },
}); 