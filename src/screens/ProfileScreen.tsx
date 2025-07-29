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
import { ProfileHeaderCard } from '../components/profile/ProfileHeaderCard';
import { LevelProgressCard } from '../components/profile/LevelProgressCard';
import { StatsGrid } from '../components/profile/StatsGrid';
import { AchievementsSection } from '../components/profile/AchievementsSection';
import { GrowthStatsCard } from '../components/profile/GrowthStatsCard';
import { SettingsMenuCard } from '../components/profile/SettingsMenuCard';
import { ProfileEncouragementCard } from '../components/profile/ProfileEncouragementCard';
import { useProfileData } from '../hooks/useProfileData';
import { colors } from '../config/theme';

export default function ProfileScreen({ navigation }: any) {
  const {
    nickname,
    userTitle,
    avatarEmoji,
    currentLevel,
    currentLevelExp,
    expToNextLevel,
    progressPercentage,
    achievements,
    statsCards,
    growthStats,
    settingsMenuItems,
    encouragementMessage,
    handleMenuPress,
  } = useProfileData();

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
          <ProfileHeaderCard
            nickname={nickname}
            userTitle={userTitle}
            avatarEmoji={avatarEmoji}
          />

          <LevelProgressCard
            currentLevel={currentLevel}
            currentLevelExp={currentLevelExp}
            expToNextLevel={expToNextLevel}
            progressPercentage={progressPercentage}
          />

          <StatsGrid statsCards={statsCards} />

          <AchievementsSection achievements={achievements} />

          <GrowthStatsCard growthStats={growthStats} />

          <SettingsMenuCard 
            menuItems={settingsMenuItems}
            onMenuPress={handleMenuPress}
          />

          <ProfileEncouragementCard message={encouragementMessage} />
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