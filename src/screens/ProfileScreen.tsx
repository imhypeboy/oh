import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

export default function ProfileScreen({ navigation }: any) {
  const { state } = useAppContext();

  const achievements = [
    { id: '1', title: '첫 걸음', description: '첫 번째 퀘스트 완료', icon: '🎯', unlocked: true },
    { id: '2', title: '용감한 도전자', description: '용기 카테고리 5개 완료', icon: '💪', unlocked: true },
    { id: '3', title: '전화의 달인', description: '전화 연습 10회 완료', icon: '📞', unlocked: false },
    { id: '4', title: '사교왕', description: '사회성 경험치 100 달성', icon: '👑', unlocked: false },
    { id: '5', title: '완벽주의자', description: '일주일 연속 퀘스트 완료', icon: '⭐', unlocked: false },
    { id: '6', title: '소통의 고수', description: '모든 카테고리 경험', icon: '🌟', unlocked: false },
  ];

  const getProgressBarWidth = (current: number, max: number) => {
    return Math.min((current / max) * 100, 100);
  };

  const totalExp = (state.user?.socialExp || 0) + (state.user?.courageExp || 0);
  const currentLevel = state.user?.level || 1;
  const progressPercentage = getProgressBarWidth(totalExp % 100, 100);

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
          {/* Header Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.profileContent}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#3B82F6', '#1E40AF']}
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>👤</Text>
                </LinearGradient>
              </View>
              <Text style={styles.nickname}>{state.user?.nickname || '용감한 탐험가'}</Text>
              <Text style={styles.userTitle}>소셜 모험가</Text>
            </View>
          </View>

          {/* Level Progress Card */}
          <View style={styles.levelCard}>
            <View style={styles.levelContent}>
              <View style={styles.levelHeader}>
                <Text style={styles.levelTitle}>레벨 {currentLevel}</Text>
                <Text style={styles.levelSubtitle}>
                  다음 레벨까지 {100 - (totalExp % 100)} EXP
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <LinearGradient
                    colors={['#3B82F6', '#1E40AF']}
                    style={[styles.progressBar, { width: `${progressPercentage}%` }]}
                  />
                </View>
              </View>
              
              <Text style={styles.expText}>{totalExp % 100} / 100 EXP</Text>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>💪</Text>
              <Text style={styles.statValue}>{state.user?.courageExp || 0}</Text>
              <Text style={styles.statLabel}>용기</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🤝</Text>
              <Text style={styles.statValue}>{state.user?.socialExp || 0}</Text>
              <Text style={styles.statLabel}>사회성</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={styles.statValue}>{state.completedQuests.length}</Text>
              <Text style={styles.statLabel}>완료한 퀘스트</Text>
            </View>

            <View style={styles.statCard}>
              <Text style={styles.statIcon}>📅</Text>
              <Text style={styles.statValue}>3일</Text>
              <Text style={styles.statLabel}>연속 일수</Text>
            </View>
          </View>

          {/* Achievements Section */}
          <View style={styles.achievementsCard}>
            <View style={styles.achievementsContent}>
              <Text style={styles.sectionTitle}>성취 및 칭호 🏅</Text>
              <View style={styles.achievementsGrid}>
                {achievements.map((achievement) => (
                  <View key={achievement.id} style={styles.achievementItem}>
                    <View style={[
                      styles.achievementCard,
                      !achievement.unlocked && styles.achievementCardLocked
                    ]}>
                      <Text style={[
                        styles.achievementIcon,
                        !achievement.unlocked && styles.achievementIconLocked
                      ]}>
                        {achievement.unlocked ? achievement.icon : '🔒'}
                      </Text>
                      <Text style={[
                        styles.achievementTitle,
                        !achievement.unlocked && styles.achievementTextLocked
                      ]}>
                        {achievement.title}
                      </Text>
                      <Text style={[
                        styles.achievementDescription,
                        !achievement.unlocked && styles.achievementTextLocked
                      ]}>
                        {achievement.description}
                      </Text>
                      {achievement.unlocked && (
                        <View style={styles.unlockedBadge}>
                          <LinearGradient
                            colors={['#10B981', '#059669']}
                            style={styles.unlockedGradient}
                          >
                            <Text style={styles.unlockedText}>획득</Text>
                          </LinearGradient>
                        </View>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Growth Statistics */}
          <View style={styles.growthCard}>
            <View style={styles.growthContent}>
              <Text style={styles.sectionTitle}>성장 기록 📈</Text>
              <View style={styles.growthStats}>
                <View style={styles.growthStat}>
                  <Text style={styles.growthLabel}>이번 주 완료</Text>
                  <Text style={styles.growthValue}>{state.completedQuests.length}개</Text>
                </View>
                <View style={styles.growthStat}>
                  <Text style={styles.growthLabel}>총 경험치</Text>
                  <Text style={styles.growthValue}>{totalExp} EXP</Text>
                </View>
                <View style={styles.growthStat}>
                  <Text style={styles.growthLabel}>가입일</Text>
                  <Text style={styles.growthValue}>7일 전</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Settings Menu */}
          <View style={styles.settingsCard}>
            <View style={styles.settingsContent}>
              <Text style={styles.sectionTitle}>설정 ⚙️</Text>
              <View style={styles.menuList}>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <Text style={styles.menuIcon}>🔔</Text>
                  <Text style={styles.menuText}>알림 설정</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <Text style={styles.menuIcon}>🎯</Text>
                  <Text style={styles.menuText}>퀘스트 난이도 조정</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <Text style={styles.menuIcon}>📊</Text>
                  <Text style={styles.menuText}>상세 통계 보기</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
                  <Text style={styles.menuIcon}>❓</Text>
                  <Text style={styles.menuText}>도움말 및 FAQ</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Encouragement Message */}
          <View style={styles.encouragementCard}>
            <View style={styles.encouragementContent}>
              <Text style={styles.encouragementTitle}>🌟 당신은 정말 멋져요!</Text>
              <Text style={styles.encouragementText}>
                지금까지의 노력과 용기가 정말 대단합니다. 
                작은 변화가 모여 큰 성장을 만들어내고 있어요.
                앞으로도 함께 화이팅해요! 💪
              </Text>
            </View>
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
    paddingBottom: Platform.OS === 'ios' ? 140 : 120,
  },
  profileCard: {
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
  profileContent: {
    padding: 24,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 32,
  },
  nickname: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  levelCard: {
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
  levelContent: {
    padding: 20,
  },
  levelHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  levelTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  levelSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressBarContainer: {
    marginBottom: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  expText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  achievementsCard: {
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
  achievementsContent: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementItem: {
    width: (width - 60) / 2,
    marginBottom: 12,
  },
  achievementCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  achievementCardLocked: {
    backgroundColor: '#F3F4F6',
    borderColor: '#D1D5DB',
  },
  achievementIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  achievementIconLocked: {
    opacity: 0.5,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDescription: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 15,
    marginBottom: 12,
  },
  achievementTextLocked: {
    color: '#9CA3AF',
  },
  unlockedBadge: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  unlockedGradient: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  unlockedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  growthCard: {
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
  growthContent: {
    padding: 20,
  },
  growthStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  growthStat: {
    alignItems: 'center',
    flex: 1,
  },
  growthLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  growthValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  settingsCard: {
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
  settingsContent: {
    padding: 20,
  },
  menuList: {
    gap: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  menuArrow: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  encouragementCard: {
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
  encouragementContent: {
    padding: 24,
    alignItems: 'center',
  },
  encouragementTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  encouragementText: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
}); 