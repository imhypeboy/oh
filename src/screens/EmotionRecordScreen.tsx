import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EmotionHeaderCard } from '../components/emotion/EmotionHeaderCard';
import { EmotionGrid } from '../components/emotion/EmotionGrid';
import { AIFeedbackCard } from '../components/emotion/AIFeedbackCard';
import { RewardCard } from '../components/emotion/RewardCard';
import { ActionSection } from '../components/emotion/ActionSection';
import { NextStepsCard } from '../components/emotion/NextStepsCard';
import { useEmotionRecord } from '../hooks/useEmotionRecord';
import { colors } from '../config/theme';

export default function EmotionRecordScreen({ navigation, route }: any) {
  const { questId } = route.params;
  
  const {
    selectedEmotion,
    feedback,
    loading,
    submitted,
    emotions,
    rewardStats,
    nextSteps,
    handleEmotionSelect,
    handleSubmit,
  } = useEmotionRecord();

  const onSubmit = () => {
    handleSubmit(questId, navigation);
  };

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
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollContent}
        >
          <EmotionHeaderCard />

          <EmotionGrid
            emotions={emotions}
            selectedEmotion={selectedEmotion}
            onEmotionSelect={handleEmotionSelect}
            disabled={submitted}
          />

          {selectedEmotion && (
            <AIFeedbackCard
              feedback={feedback}
              loading={loading}
            />
          )}

          {selectedEmotion && !loading && (
            <RewardCard rewardStats={rewardStats} />
          )}

          {selectedEmotion && !loading && (
            <ActionSection
              submitted={submitted}
              onSubmit={onSubmit}
            />
          )}

          {selectedEmotion && !loading && !submitted && (
            <NextStepsCard nextSteps={nextSteps} />
          )}
        </ScrollView>
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
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 140 : 120,
  },
}); 