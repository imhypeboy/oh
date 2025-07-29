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
import { AIHeaderCard } from '../components/ai/AIHeaderCard';
import { BenefitsCard } from '../components/ai/BenefitsCard';
import { ScenarioList } from '../components/ai/ScenarioList';
import { TipsCard } from '../components/ai/TipsCard';
import { ProgressCard } from '../components/ai/ProgressCard';
import { useAIData } from '../hooks/useAIData';
import { colors } from '../config/theme';

export default function AIScreen({ navigation }: any) {
  const {
    loading,
    scenarios,
    benefitItems,
    practiceTips,
    progressData,
    showProgress,
    startSimulation,
  } = useAIData();

  const handleScenarioPress = (scenarioId: string) => {
    startSimulation(scenarioId, navigation);
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
          <AIHeaderCard />

          <BenefitsCard benefitItems={benefitItems} />

          <ScenarioList 
            scenarios={scenarios}
            loading={loading}
            onScenarioPress={handleScenarioPress}
          />

          <TipsCard tips={practiceTips} />

          <ProgressCard 
            title={progressData.title}
            text={progressData.text}
            subtext={progressData.subtext}
            show={showProgress}
          />
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