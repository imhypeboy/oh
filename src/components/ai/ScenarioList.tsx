import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScenarioCard } from './ScenarioCard';
import { colors, typography, spacing } from '../../config/theme';
import { AIScenario } from '../../utils/aiUtils';

interface ScenarioListProps {
  scenarios: AIScenario[];
  loading: boolean;
  onScenarioPress: (scenarioId: string) => void;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ 
  scenarios, 
  loading, 
  onScenarioPress 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>연습할 상황을 선택하세요 🎭</Text>
      {scenarios.map((scenario, index) => (
        <ScenarioCard
          key={scenario.id}
          scenario={scenario}
          index={index}
          loading={loading}
          onPress={onScenarioPress}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    marginHorizontal: spacing.xl,
  },
}); 