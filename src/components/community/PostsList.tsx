import React from 'react';
import { ScrollView, StyleSheet, Platform } from 'react-native';
import { CommunityPost } from '../../types';
import { PostCard } from './PostCard';
import { EmptyState } from './EmptyState';
import { InspirationCard } from './InspirationCard';
import { InspirationMessage } from '../../utils/communityUtils';

interface PostsListProps {
  posts: CommunityPost[];
  inspirationMessage: InspirationMessage;
  onLikePress: (postId: string) => void;
}

export const PostsList: React.FC<PostsListProps> = ({
  posts,
  inspirationMessage,
  onLikePress,
}) => {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}
    >
      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikePress={onLikePress}
          />
        ))
      )}

      <InspirationCard message={inspirationMessage} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: Platform.OS === 'ios' ? 140 : 120,
  },
}); 