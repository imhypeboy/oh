import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';
import { aiService } from '../services/aiService';
import { Emotion } from '../types';

const { width } = Dimensions.get('window');

export default function EmotionRecordScreen({ navigation, route }: any) {
  const { state, dispatch } = useAppContext();
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { questId } = route.params;

  const emotions = [
    { type: Emotion.EXCITED, emoji: '🤩', label: '뿌듯해요', color: '#10B981' },
    { type: Emotion.HAPPY, emoji: '😊', label: '기뻐요', color: '#3B82F6' },
    { type: Emotion.CONFIDENT, emoji: '😎', label: '자신있어요', color: '#8B5CF6' },
    { type: Emotion.NERVOUS, emoji: '😅', label: '떨렸어요', color: '#F59E0B' },
    { type: Emotion.DIFFICULT, emoji: '😤', label: '힘들었어요', color: '#EF4444' },
    { type: Emotion.ANXIOUS, emoji: '😰', label: '불안했어요', color: '#6B7280' },
  ];

  const handleEmotionSelect = async (emotion: Emotion) => {
    if (submitted) return;
    
    setSelectedEmotion(emotion);
    setLoading(true);

    try {
      const aiResponse = await aiService.generateEmotionFeedback(emotion, '퀘스트를 완료했습니다');
      setFeedback(aiResponse);
    } catch (error) {
      console.error('AI 피드백 생성 실패:', error);
      setFeedback(getDefaultMessage(emotion));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultMessage = (emotion: Emotion): string => {
    const messages = {
      [Emotion.EXCITED]: '정말 멋져요! 🎉 이런 뿌듯함이 바로 성장의 증거예요. 특히 전화 통화는 많은 사람들이 어려워하는데, 성공적으로 해내신 것이 대단합니다!',
      [Emotion.HAPPY]: '행복한 마음이 전해져요! 😊 전화 통화를 무사히 마치신 것만으로도 큰 발전이에요. 작은 성공들이 모여 큰 변화를 만들어내고 있어요.',
      [Emotion.CONFIDENT]: '자신감이 느껴져요! 💪 전화 통화에 대한 두려움이 줄어들고 있다는 증거예요. 이런 마음가짐이면 다음 통화는 더 쉬울 거예요.',
      [Emotion.NERVOUS]: '떨리는 마음으로도 해내신 당신이 정말 대단해요! 😊 전화 공포는 누구나 경험하는 자연스러운 감정이에요. 용기 있는 첫 발걸음이었습니다.',
      [Emotion.DIFFICULT]: '힘들었지만 포기하지 않은 당신을 응원해요! 💪 전화 통화는 연습이 필요한 스킬이에요. 오늘의 경험이 다음번을 더 쉽게 만들어줄 거예요.',
      [Emotion.ANXIOUS]: '불안함에도 불구하고 도전한 당신이 훌륭해요! 🌟 전화 통화 전 불안한 마음은 당연해요. 미리 할 말을 정리하고 연습하면 다음엔 더 편할 거예요.',
    };
    return messages[emotion] || '당신의 도전을 응원합니다! 💪';
  };

  const handleSubmit = () => {
    if (!selectedEmotion) {
      Alert.alert('알림', '감정을 선택해주세요.');
      return;
    }

    // 감정 기록 저장
    const emotionRecord = {
      id: Date.now().toString(),
      questId,
      emotion: selectedEmotion,
      content: `퀘스트 완료 후 ${emotions.find(e => e.type === selectedEmotion)?.label} 감정을 느꼈습니다.`,
      feedback,
      timestamp: new Date(),
    };

    dispatch({ type: 'RECORD_EMOTION', payload: emotionRecord });
    setSubmitted(true);
    
    // 잠시 후 홈으로 돌아가기
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  };

  const getSelectedEmotionData = () => {
    return emotions.find(e => e.type === selectedEmotion);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Clean Background */}
      <LinearGradient
        colors={['#F8FAFC', '#F1F5F9', '#E2E8F0']}
        style={styles.backgroundGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header Card */}
          <View style={styles.headerCard}>
            <View style={styles.headerContent}>
              <Text style={styles.title}>퀘스트 완료! 🎉</Text>
              <Text style={styles.subtitle}>
                어떤 기분이신가요? 솔직한 감정을 선택해주세요.
              </Text>
            </View>
          </View>

          {/* Emotions Grid */}
          <View style={styles.emotionsSection}>
            <Text style={styles.sectionTitle}>지금 기분은? 💭</Text>
            <View style={styles.emotionsGrid}>
              {emotions.map((emotion) => (
                <TouchableOpacity
                  key={emotion.type}
                  style={styles.emotionWrapper}
                  onPress={() => handleEmotionSelect(emotion.type)}
                  disabled={submitted}
                  activeOpacity={0.8}
                >
                  <View style={[
                    styles.emotionCard,
                    selectedEmotion === emotion.type && styles.emotionCardSelected,
                    selectedEmotion === emotion.type && { borderColor: emotion.color }
                  ]}>
                    <View style={styles.emotionContent}>
                      <Text style={styles.emotionEmoji}>
                        {emotion.emoji}
                      </Text>
                      <Text style={[
                        styles.emotionLabel,
                        selectedEmotion === emotion.type && { color: emotion.color }
                      ]}>
                        {emotion.label}
                      </Text>
                    </View>
                    {selectedEmotion === emotion.type && (
                      <View style={[styles.selectedIndicator, { backgroundColor: emotion.color }]}>
                        <Text style={styles.selectedIcon}>✓</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* AI Feedback Section */}
          {selectedEmotion && (
            <View style={styles.feedbackCard}>
              <View style={styles.feedbackContent}>
                <View style={styles.feedbackHeader}>
                  <View style={styles.aiAvatar}>
                    <LinearGradient
                      colors={['#3B82F6', '#1E40AF']}
                      style={styles.aiAvatarGradient}
                    >
                      <Text style={styles.aiAvatarText}>🤖</Text>
                    </LinearGradient>
                  </View>
                  <Text style={styles.feedbackTitle}>AI의 응원 메시지</Text>
                </View>
                
                {loading ? (
                  <View style={styles.loadingContainer}>
                    <View style={styles.typingIndicator}>
                      <View style={[styles.dot, styles.dot1]} />
                      <View style={[styles.dot, styles.dot2]} />
                      <View style={[styles.dot, styles.dot3]} />
                    </View>
                    <Text style={styles.loadingText}>메시지를 작성하고 있어요...</Text>
                  </View>
                ) : (
                  <Text style={styles.feedbackText}>{feedback}</Text>
                )}
              </View>
            </View>
          )}

          {/* Reward Section */}
          {selectedEmotion && !loading && (
            <View style={styles.rewardCard}>
              <View style={styles.rewardContent}>
                <Text style={styles.rewardTitle}>획득한 경험치 🎁</Text>
                <View style={styles.rewardStats}>
                  <View style={styles.rewardStat}>
                    <Text style={styles.rewardIcon}>💪</Text>
                    <Text style={styles.rewardValue}>+15</Text>
                    <Text style={styles.rewardLabel}>용기</Text>
                  </View>
                  <View style={styles.rewardStat}>
                    <Text style={styles.rewardIcon}>🤝</Text>
                    <Text style={styles.rewardValue}>+10</Text>
                    <Text style={styles.rewardLabel}>사회성</Text>
                  </View>
                  <View style={styles.rewardStat}>
                    <Text style={styles.rewardIcon}>⭐</Text>
                    <Text style={styles.rewardValue}>+25</Text>
                    <Text style={styles.rewardLabel}>총 EXP</Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Action Buttons */}
          {selectedEmotion && !loading && (
            <View style={styles.actionContainer}>
              {!submitted ? (
                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#3B82F6', '#1E40AF']}
                    style={styles.submitGradient}
                  >
                    <Text style={styles.submitButtonText}>기록 완료</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ) : (
                <View style={styles.completedCard}>
                  <View style={styles.completedContent}>
                    <Text style={styles.completedIcon}>✨</Text>
                    <Text style={styles.completedTitle}>기록이 완료되었어요!</Text>
                    <Text style={styles.completedSubtitle}>
                      잠시 후 홈 화면으로 돌아갑니다
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}

          {/* Next Steps */}
          {selectedEmotion && !loading && !submitted && (
            <View style={styles.nextStepsCard}>
              <View style={styles.nextStepsContent}>
                <Text style={styles.nextStepsTitle}>다음 단계 제안 🚀</Text>
                <View style={styles.nextStepsList}>
                  <Text style={styles.nextStepItem}>
                    • 오늘의 경험을 커뮤니티에 공유해보세요
                  </Text>
                  <Text style={styles.nextStepItem}>
                    • 비슷한 상황에서 AI 연습을 해보세요
                  </Text>
                  <Text style={styles.nextStepItem}>
                    • 내일의 새로운 퀘스트를 확인해보세요
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  emotionsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  emotionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emotionWrapper: {
    width: (width - 60) / 2,
    marginBottom: 16,
  },
  emotionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emotionCardSelected: {
    borderWidth: 2,
  },
  emotionContent: {
    padding: 20,
    alignItems: 'center',
  },
  emotionEmoji: {
    fontSize: 36,
    marginBottom: 12,
  },
  emotionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  feedbackCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  feedbackContent: {
    padding: 20,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  aiAvatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatarText: {
    fontSize: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  typingIndicator: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9CA3AF',
    marginHorizontal: 2,
  },
  dot1: {
    backgroundColor: '#3B82F6',
  },
  dot2: {
    backgroundColor: '#6B7280',
  },
  dot3: {
    backgroundColor: '#9CA3AF',
  },
  loadingText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  feedbackText: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  rewardCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  rewardContent: {
    padding: 20,
  },
  rewardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  rewardStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rewardStat: {
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  rewardValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  rewardLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  actionContainer: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  submitGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  completedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  completedContent: {
    padding: 24,
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  completedSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  nextStepsCard: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextStepsContent: {
    padding: 20,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  nextStepsList: {
    gap: 8,
  },
  nextStepItem: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
}); 