import React, { useState } from 'react';
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

const { width } = Dimensions.get('window');

export default function AIScreen({ navigation }: any) {
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);

  const startSimulation = async (scenarioId: string) => {
    setLoading(true);
    try {
      const simulation = await aiService.createSimulation(scenarioId);
      dispatch({ type: 'SET_SIMULATION', payload: simulation });
      navigation.navigate('AISimulation', { scenario: scenarioId });
    } catch (error) {
      Alert.alert('오류', 'AI 시뮬레이션을 시작할 수 없습니다.');
      console.error('AI 시뮬레이션 시작 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const scenarios = aiService.getAvailableScenarios();

  const getScenarioIcon = (scenarioId: string) => {
    const icons: { [key: string]: string } = {
      cafe_order: '☕',
      hair_salon: '💇',
      store_inquiry: '🏪',
      restaurant: '🍽️',
      bank: '🏦',
      phone_reservation: '📞',
      phone_delivery: '🍕',
      phone_appointment: '🏥',
      phone_inquiry: '☎️',
      phone_complaint: '📞',
      phone_job_call: '💼',
    };
    return icons[scenarioId] || '🤖';
  };

  const getScenarioCategory = (scenarioId: string) => {
    const phoneScenarios = ['phone_reservation', 'phone_delivery', 'phone_appointment', 'phone_inquiry', 'phone_complaint', 'phone_job_call'];
    return phoneScenarios.includes(scenarioId) ? 'phone' : 'face-to-face';
  };

  const getDifficultyLevel = (index: number) => {
    if (index <= 2) return '⭐⭐';
    if (index <= 5) return '⭐⭐⭐';
    return '⭐⭐⭐⭐';
  };

  const getCategoryColor = (category: string) => {
    return category === 'phone' ? '#EF4444' : '#10B981';
  };

  const getCategoryName = (category: string) => {
    return category === 'phone' ? '전화 연습' : '대면 연습';
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
              <Text style={styles.title}>AI 소셜 연습 🤖</Text>
              <Text style={styles.subtitle}>
                실제 상황 전에 AI와 함께 대화를 연습해보세요!
              </Text>
            </View>
          </View>

          {/* Benefits Section */}
          <View style={styles.benefitsCard}>
            <View style={styles.benefitsContent}>
              <Text style={styles.benefitsTitle}>AI 연습의 효과 ✨</Text>
              <View style={styles.benefitsList}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>🎯</Text>
                  <Text style={styles.benefitText}>실제 상황에서의 긴장감 완화</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>💬</Text>
                  <Text style={styles.benefitText}>자연스러운 대화 흐름 연습</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>💪</Text>
                  <Text style={styles.benefitText}>자신감 향상과 안전한 실수 경험</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitIcon}>📞</Text>
                  <Text style={styles.benefitText}>전화 공포증 극복 및 의사소통 개선</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Scenarios Section */}
          <View style={styles.scenariosSection}>
            <Text style={styles.sectionTitle}>연습할 상황을 선택하세요 🎭</Text>
            {scenarios.map((scenario, index) => {
              const category = getScenarioCategory(scenario.id);
              return (
                <TouchableOpacity
                  key={scenario.id}
                  style={styles.scenarioCard}
                  onPress={() => startSimulation(scenario.id)}
                  disabled={loading}
                  activeOpacity={0.8}
                >
                  <View style={styles.scenarioContent}>
                    <View style={styles.scenarioHeader}>
                      <View style={styles.scenarioIconContainer}>
                        <Text style={styles.scenarioEmoji}>
                          {getScenarioIcon(scenario.id)}
                        </Text>
                      </View>
                      <View style={styles.scenarioMeta}>
                        <View style={[
                          styles.categoryBadge,
                          { backgroundColor: getCategoryColor(category) + '20' }
                        ]}>
                          <Text style={[
                            styles.categoryText,
                            { color: getCategoryColor(category) }
                          ]}>
                            {getCategoryName(category)}
                          </Text>
                        </View>
                        <Text style={styles.difficultyStars}>
                          {getDifficultyLevel(index)}
                        </Text>
                      </View>
                    </View>
                    
                    <View style={styles.scenarioInfo}>
                      <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                      <Text style={styles.scenarioDescription}>
                        {scenario.description}
                      </Text>
                    </View>
                    
                    <View style={styles.startButtonContainer}>
                      <TouchableOpacity
                        style={styles.startButton}
                        onPress={() => startSimulation(scenario.id)}
                        disabled={loading}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#3B82F6', '#1E40AF']}
                          style={styles.startGradient}
                        >
                          <Text style={styles.startButtonText}>
                            {loading ? '시작 중...' : '연습 시작'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tips Section */}
          <View style={styles.tipsCard}>
            <View style={styles.tipsContent}>
              <Text style={styles.tipsTitle}>💡 연습 팁</Text>
              <View style={styles.tipsList}>
                <Text style={styles.tipText}>
                  • 실제 상황이라고 생각하고 자연스럽게 대화해보세요
                </Text>
                <Text style={styles.tipText}>
                  • 틀려도 괜찮아요! 실수를 통해 배우는 것이 목표입니다
                </Text>
                <Text style={styles.tipText}>
                  • 전화 연습 시 할 말을 미리 정리하고 천천히 말해보세요
                </Text>
                <Text style={styles.tipText}>
                  • 여러 번 반복 연습하면 실제 상황에서 더 자신있게 행동할 수 있어요
                </Text>
              </View>
            </View>
          </View>

          {/* Progress Section */}
          {state.emotionRecords.length > 0 && (
            <View style={styles.progressCard}>
              <View style={styles.progressContent}>
                <Text style={styles.progressTitle}>연습 진행도 🏆</Text>
                <Text style={styles.progressText}>
                  지금까지 {state.emotionRecords.length}번의 연습을 완료했습니다!
                </Text>
                <Text style={styles.progressSubtext}>
                  꾸준한 연습으로 실력이 늘고 있어요. 계속 화이팅! 💪
                </Text>
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
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 22,
  },
  benefitsCard: {
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
  benefitsContent: {
    padding: 20,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  benefitsList: {
    gap: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
    width: 24,
  },
  benefitText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    lineHeight: 22,
  },
  scenariosSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  scenarioCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  scenarioContent: {
    padding: 20,
  },
  scenarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  scenarioIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenarioEmoji: {
    fontSize: 24,
  },
  scenarioMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  difficultyStars: {
    fontSize: 14,
    color: '#F59E0B',
  },
  scenarioInfo: {
    marginBottom: 20,
  },
  scenarioTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 26,
  },
  scenarioDescription: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 21,
  },
  startButtonContainer: {
    alignItems: 'center',
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
  },
  startGradient: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  tipsCard: {
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
  tipsContent: {
    padding: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  tipsList: {
    gap: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  progressCard: {
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
  progressContent: {
    padding: 20,
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 8,
  },
  progressSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 