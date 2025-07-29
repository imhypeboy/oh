import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommunityPost } from '../../types';
import { 
  getEmotionColor, 
  getCategoryName, 
  getCategoryColor,
  getEmotionEmoji 
} from '../../utils/communityUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface PostCardProps {
  post: CommunityPost;
  onLikePress: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = React.memo(({ 
  post, 
  onLikePress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.meta}>
            <View style={[
              styles.emotionBadge,
              { backgroundColor: getEmotionColor(post.emotion) }
            ]}>
              <Text style={styles.emotionText}>
                {getEmotionEmoji(post.emotion)}
              </Text>
            </View>
            
            <View style={[
              styles.categoryBadge,
              { backgroundColor: getCategoryColor(post.questCategory) + '20' }
            ]}>
              <Text style={[
                styles.categoryText,
                { color: getCategoryColor(post.questCategory) }
              ]}>
                {getCategoryName(post.questCategory)}
              </Text>
            </View>
          </View>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
        </View>

        <Text style={styles.text}>{post.content}</Text>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.likeButton} 
            onPress={() => onLikePress(post.id)}
            activeOpacity={0.7}
          >
            <Text style={[
              styles.likeIcon,
              { color: post.isLiked ? '#EF4444' : '#9CA3AF' }
            ]}>
              ❤️
            </Text>
            <Text style={styles.likeCount}>{post.likes}</Text>
          </TouchableOpacity>
          
          <View style={styles.anonymousBadge}>
            <Text style={styles.anonymousText}>익명</Text>
          </View>
        </View>
      </View>
    </View>
  );
});

PostCard.displayName = 'PostCard';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  emotionBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emotionText: {
    fontSize: typography.sizes.sm,
    color: colors.text.white,
  },
  categoryBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  categoryText: {
    fontSize: typography.sizes.xs,
    fontWeight: typography.weights.semibold,
  },
  timestamp: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
  },
  text: {
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.sm,
  },
  likeIcon: {
    fontSize: typography.sizes.base,
    marginRight: spacing.xs,
  },
  likeCount: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    fontWeight: typography.weights.medium,
  },
  anonymousBadge: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
  },
  anonymousText: {
    fontSize: typography.sizes.xs,
    color: colors.text.tertiary,
    fontWeight: typography.weights.medium,
  },
}); 