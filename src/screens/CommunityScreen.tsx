import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { CommunityHeaderCard } from '../components/community/CommunityHeaderCard';
import { EmotionSegment } from '../components/community/EmotionSegment';
import { PostsList } from '../components/community/PostsList';
import { useCommunityData } from '../hooks/useCommunityData';
import { colors } from '../config/theme';

export default function CommunityScreen({ navigation }: any) {
  const {
    selectedFilter,
    slideAnim,
    mainEmotions,
    filteredPosts,
    inspirationMessage,
    handleSegmentPress,
    toggleLike,
  } = useCommunityData();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9', '#E2E8F0']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <CommunityHeaderCard />

        <EmotionSegment
          emotions={mainEmotions}
          selectedFilter={selectedFilter}
          slideAnim={slideAnim}
          onSegmentPress={handleSegmentPress}
        />

        <PostsList
          posts={filteredPosts}
          inspirationMessage={inspirationMessage}
          onLikePress={toggleLike}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
}); 