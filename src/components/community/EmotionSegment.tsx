import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Emotion } from '../../types';
import { EmotionFilter } from '../../utils/communityUtils';
import { colors, typography, spacing } from '../../config/theme';

interface EmotionSegmentProps {
  emotions: EmotionFilter[];
  selectedFilter: Emotion | 'all';
  slideAnim: Animated.Value;
  onSegmentPress: (emotionType: Emotion | 'all', index: number) => void;
}

export const EmotionSegment: React.FC<EmotionSegmentProps> = ({
  emotions,
  selectedFilter,
  slideAnim,
  onSegmentPress,
}) => {
  // 세그먼트 너비 계산 (전체 너비에서 패딩 제외하고 4등분)
  const segmentWidth = (340 - 8) / 4; // 약 83px
  
  // 디버깅용 로그
  React.useEffect(() => {
    console.log(`📐 Segment width calculated: ${segmentWidth}px`);
    console.log(`📍 Animation positions: [0, ${segmentWidth}, ${segmentWidth * 2}, ${segmentWidth * 3}]`);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {/* iOS 스타일 인디케이터 */}
        <Animated.View 
          style={[
            styles.indicator,
            {
              width: segmentWidth,
              transform: [{
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1, 2, 3],
                  outputRange: [0, segmentWidth, segmentWidth * 2, segmentWidth * 3],
                  extrapolate: 'extend', // clamp 대신 extend 사용
                })
              }]
            }
          ]} 
        />

        {emotions.map((emotion, index) => (
          <TouchableOpacity
            key={emotion.type}
            style={[
              styles.button,
              { width: segmentWidth },
              selectedFilter === emotion.type && styles.buttonActive,
            ]}
            onPress={() => onSegmentPress(emotion.type, index)}
            activeOpacity={0.6}
          >
            <Text style={[
              styles.emoji,
              selectedFilter === emotion.type && styles.emojiActive
            ]}>
              {emotion.emoji}
            </Text>
            <Text style={[
              styles.text,
              selectedFilter === emotion.type && styles.textActive
            ]}>
              {emotion.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
  },
  track: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    padding: 2,
    position: 'relative',
    width: 340,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  indicator: {
    position: 'absolute',
    top: 2,
    left: 2,
    height: 28,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.13,
    shadowRadius: 2.5,
    elevation: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 8,
    height: 32,
  },
  buttonActive: {
    // iOS 스타일에서는 인디케이터로만 표시
  },
  emoji: {
    fontSize: 12,
    marginBottom: 1,
  },
  emojiActive: {
    fontSize: 12,
  },
  text: {
    fontSize: 9,
    color: '#3C3C43',
    fontWeight: typography.weights.medium,
    textAlign: 'center',
    lineHeight: 11,
  },
  textActive: {
    color: '#007AFF',
    fontWeight: typography.weights.semibold,
    fontSize: 9,
  },
}); 