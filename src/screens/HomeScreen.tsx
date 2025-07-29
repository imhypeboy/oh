import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useAppContext } from '../context/AppContext';
import { questService } from '../services/questService';
import { locationService } from '../services/locationService';
import { Quest, QuestCategory } from '../types';

const { width, height } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { state, dispatch } = useAppContext();
  const [todayQuests, setTodayQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTodayQuests();
  }, [state.user]);

  const loadTodayQuests = async () => {
    if (!state.user) return;
    
    setLoading(true);
    try {
      const currentLocation = await locationService.getCurrentLocation();
      const quests = await questService.generateDailyQuests(
        state.user.level,
        currentLocation || undefined
      );
      
      setTodayQuests(quests);
      dispatch({ type: 'SET_CURRENT_QUESTS', payload: quests });
    } catch (error) {
      console.error('퀘스트 로드 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeQuest = (questId: string) => {
    const quest = todayQuests.find(q => q.id === questId);
    if (quest) {
      dispatch({ type: 'COMPLETE_QUEST', payload: questId });
      dispatch({ 
        type: 'UPDATE_USER_EXP', 
        payload: { 
          socialExp: quest.reward.socialExp, 
          courageExp: quest.reward.courageExp 
        }
      });
      navigation.navigate('EmotionRecord', { questId });
    }
  };

  const practiceMenus = [
    { id: 'ai_basic', title: 'AI 기초 연습', icon: '🤖', description: '카페, 미용실 등', color: '#3B82F6' },
    { id: 'ai_phone', title: '전화 연습', icon: '📞', description: '예약, 주문, 문의', color: '#EF4444' },
    { id: 'real_practice', title: '실전 도전', icon: '🎯', description: '오늘의 퀘스트', color: '#10B981' },
    { id: 'community', title: '응원받기', icon: '💬', description: '경험 공유하기', color: '#8B5CF6' },
  ];

  const statsCards = [
    { title: '용기 레벨', value: state.user?.courageExp || 0, icon: '💪', color: '#F59E0B', unit: 'EXP' },
    { title: '사회성 레벨', value: state.user?.socialExp || 0, icon: '🤝', color: '#3B82F6', unit: 'EXP' },
    { title: '완료 퀘스트', value: state.completedQuests.length, icon: '🏆', color: '#10B981', unit: '개' },
    { title: '연속 일수', value: 3, icon: '🔥', color: '#EF4444', unit: '일' },
  ];

  const handleMenuPress = (menuId: string) => {
    switch (menuId) {
      case 'ai_basic':
      case 'ai_phone':
        navigation.navigate('AI');
        break;
      case 'real_practice':
        navigation.navigate('Quests');
        break;
      case 'community':
        navigation.navigate('Community');
        break;
    }
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
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* 헤더 영역 */}
          <View style={styles.headerSection}>
            <View style={styles.greetingContainer}>
              <Text style={styles.greeting}>✨ 좋은 하루예요</Text>
              <Text style={styles.userName}>{state.user?.nickname || '용감한 탐험가'}님</Text>
            </View>
            <View style={styles.levelBadge}>
              <LinearGradient
                colors={['#3B82F6', '#1E40AF']}
                style={styles.levelGradient}
              >
                <Text style={styles.levelText}>Lv.{state.user?.level || 1}</Text>
              </LinearGradient>
            </View>
          </View>

          {/* 통계 카드 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>나의 성장 기록 📊</Text>
            <View style={styles.statsGrid}>
              {statsCards.map((stat, index) => (
                <View key={index} style={styles.statCard}>
                  <View style={[styles.statIconContainer, { backgroundColor: stat.color + '15' }]}>
                    <Text style={styles.statIcon}>{stat.icon}</Text>
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statUnit}>{stat.unit}</Text>
                  <Text style={styles.statTitle}>{stat.title}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* 연습 메뉴 섹션 */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>오늘 뭘 연습해볼까요? 🎭</Text>
            <View style={styles.menuGrid}>
              {practiceMenus.map((menu) => (
                <TouchableOpacity
                  key={menu.id}
                  style={styles.menuCard}
                  onPress={() => handleMenuPress(menu.id)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.menuIconContainer, { backgroundColor: menu.color + '15' }]}>
                    <Text style={styles.menuIcon}>{menu.icon}</Text>
                  </View>
                  <Text style={styles.menuTitle}>{menu.title}</Text>
                  <Text style={styles.menuDescription}>{menu.description}</Text>
                  <View style={[styles.menuIndicator, { backgroundColor: menu.color }]} />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* 오늘의 퀘스트 섹션 */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>오늘의 도전 🎯</Text>
              <TouchableOpacity 
                onPress={loadTodayQuests} 
                style={styles.refreshButton}
                activeOpacity={0.7}
              >
                <Text style={styles.refreshText}>새로고침</Text>
              </TouchableOpacity>
            </View>

            {loading ? (
              <View style={styles.loadingCard}>
                <Text style={styles.loadingText}>✨ 맞춤 퀘스트 생성 중...</Text>
              </View>
            ) : todayQuests.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyIcon}>🌟</Text>
                <Text style={styles.emptyText}>새로운 모험이 기다리고 있어요!</Text>
              </View>
            ) : (
              <View style={styles.questCards}>
                {todayQuests.slice(0, 2).map((quest, index) => (
                  <View key={quest.id} style={styles.questCard}>
                    <View style={styles.questHeader}>
                      <View style={styles.questCategory}>
                        <Text style={styles.questCategoryText}>
                          {quest.category === QuestCategory.NEARBY ? '집 근처' :
                           quest.category === QuestCategory.INTERACTION ? '상호작용' :
                           quest.category === QuestCategory.COURAGE ? '용기 내기' : '사회성'}
                        </Text>
                      </View>
                      <Text style={styles.questDifficulty}>
                        {'✦'.repeat(quest.difficulty)}
                      </Text>
                    </View>
                    
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                    
                    <View style={styles.questFooter}>
                      <View style={styles.rewardContainer}>
                        <Text style={styles.rewardText}>
                          💪 {quest.reward.courageExp} · 🤝 {quest.reward.socialExp}
                        </Text>
                      </View>
                      
                      <TouchableOpacity 
                        style={styles.completeButton}
                        onPress={() => completeQuest(quest.id)}
                        activeOpacity={0.8}
                      >
                        <LinearGradient
                          colors={['#3B82F6', '#1E40AF']}
                          style={styles.completeGradient}
                        >
                          <Text style={styles.completeButtonText}>완료</Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
                
                {todayQuests.length > 2 && (
                  <TouchableOpacity 
                    style={styles.moreQuestsCard}
                    onPress={() => navigation.navigate('Quests')}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.moreQuestsText}>
                      +{todayQuests.length - 2}개 더 보기
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>

          {/* 격려 메시지 */}
          <View style={styles.encouragementCard}>
            <Text style={styles.encouragementTitle}>🌟 오늘도 화이팅!</Text>
            <Text style={styles.encouragementText}>
              작은 용기가 모여 큰 변화를 만들어냅니다
            </Text>
          </View>
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
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  levelBadge: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  levelGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  refreshButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  refreshText: {
    color: '#374151',
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 20,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  statUnit: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  menuCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuIcon: {
    fontSize: 22,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  menuIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  questCards: {
    gap: 12,
  },
  questCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questCategory: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  questCategoryText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
  },
  questDifficulty: {
    fontSize: 14,
    color: '#F59E0B',
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
    lineHeight: 22,
  },
  questDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 16,
  },
  questFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardContainer: {
    flex: 1,
  },
  rewardText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  completeButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  completeGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  completeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  moreQuestsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  moreQuestsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  loadingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  encouragementCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  encouragementTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  encouragementText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
}); 