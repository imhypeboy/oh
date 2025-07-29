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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderSection } from '../components/home/HeaderSection';
import { StatsGrid } from '../components/home/StatsGrid';
import { PracticeMenuGrid } from '../components/home/PracticeMenuGrid';
import { TodayQuestSection } from '../components/home/TodayQuestSection';
import { EncouragementCard } from '../components/home/EncouragementCard';
import { useHomeData } from '../hooks/useHomeData';
import { colors, spacing } from '../config/theme';
import { RootStackParamList } from '../types';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const {
    todayQuests,
    loading,
    statsCards,
    practiceMenus,
    loadTodayQuests,
    completeQuest,
    handleMenuPress,
  } = useHomeData();

  const handleCompleteQuest = (questId: string) => {
    completeQuest(questId);
    navigation.navigate('EmotionRecord', { questId });
  };

  const handleViewMore = () => {
    navigation.navigate('Quests');
  };

  const handleMenuPressWithNavigation = (menuId: string) => {
    handleMenuPress(menuId, navigation);
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
          <HeaderSection 
            userName="용감한 탐험가" // TODO: 실제 사용자명 연결
            userLevel={1} // TODO: 실제 사용자 레벨 연결
          />

          <StatsGrid statsCards={statsCards} />

          <PracticeMenuGrid 
            practiceMenus={practiceMenus}
            onMenuPress={handleMenuPressWithNavigation}
          />

          <TodayQuestSection
            todayQuests={todayQuests}
            loading={loading}
            onRefresh={loadTodayQuests}
            onCompleteQuest={handleCompleteQuest}
            onViewMore={handleViewMore}
          />

          <EncouragementCard />
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
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === 'ios' ? 120 : 100,
  },
}); 