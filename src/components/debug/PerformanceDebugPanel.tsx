import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Dimensions,
  Modal,
} from 'react-native';
import { PerformanceMonitor, MemoryMonitor } from '../../utils/performanceMonitor';
import { colors, typography, spacing } from '../../config/theme';

const { width } = Dimensions.get('window');

interface PerformanceDebugPanelProps {
  visible?: boolean;
}

export const PerformanceDebugPanel: React.FC<PerformanceDebugPanelProps> = ({ 
  visible = __DEV__ 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [stats, setStats] = useState(PerformanceMonitor.getPerformanceStats());
  const [refreshKey, setRefreshKey] = useState(0);

  // 5초마다 성능 통계 업데이트
  useEffect(() => {
    if (!__DEV__) return;

    const interval = setInterval(() => {
      setStats(PerformanceMonitor.getPerformanceStats());
      setRefreshKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!__DEV__ || !visible) {
    return null;
  }

  const renderPerformanceStats = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📊 Performance Stats</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.total}</Text>
          <Text style={styles.statLabel}>Measurements</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.average}ms</Text>
          <Text style={styles.statLabel}>Average</Text>
        </View>
      </View>

      {stats.slowest && (
        <View style={styles.slowestItem}>
          <Text style={styles.slowestTitle}>🐌 Slowest Operation:</Text>
          <Text style={styles.slowestText}>
            {stats.slowest.name}
            {stats.slowest.component && ` (${stats.slowest.component})`}
          </Text>
          <Text style={styles.slowestDuration}>{stats.slowest.duration}ms</Text>
        </View>
      )}

      {stats.fastest && (
        <View style={styles.fastestItem}>
          <Text style={styles.fastestTitle}>🚀 Fastest Operation:</Text>
          <Text style={styles.fastestText}>
            {stats.fastest.name}
            {stats.fastest.component && ` (${stats.fastest.component})`}
          </Text>
          <Text style={styles.fastestDuration}>{stats.fastest.duration}ms</Text>
        </View>
      )}
    </View>
  );

  const renderRecentMeasurements = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>📋 Recent Measurements</Text>
      <ScrollView style={styles.recentList} showsVerticalScrollIndicator={false}>
        {stats.recent.length === 0 ? (
          <Text style={styles.emptyText}>No measurements yet</Text>
        ) : (
          stats.recent.reverse().map((item, index) => {
            const emoji = item.duration > 100 ? '🐌' : item.duration > 50 ? '⚡' : '🚀';
            const color = item.duration > 100 ? colors.error : item.duration > 50 ? colors.warning : colors.success;
            
            return (
              <View key={index} style={styles.recentItem}>
                <Text style={styles.recentEmoji}>{emoji}</Text>
                <View style={styles.recentContent}>
                  <Text style={styles.recentName}>
                    {item.name}
                    {item.component && (
                      <Text style={styles.recentComponent}> ({item.component})</Text>
                    )}
                  </Text>
                  <Text style={[styles.recentDuration, { color }]}>
                    {item.duration}ms
                  </Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );

  const renderActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🛠️ Actions</Text>
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.refreshButton]}
          onPress={() => {
            setStats(PerformanceMonitor.getPerformanceStats());
            setRefreshKey(prev => prev + 1);
          }}
        >
          <Text style={styles.actionButtonText}>🔄 Refresh</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.reportButton]}
          onPress={() => PerformanceMonitor.printPerformanceReport()}
        >
          <Text style={styles.actionButtonText}>📝 Print Report</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.clearButton]}
          onPress={() => {
            PerformanceMonitor.clearData();
            setStats(PerformanceMonitor.getPerformanceStats());
          }}
        >
          <Text style={styles.actionButtonText}>🧹 Clear Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => setIsOpen(true)}
      >
        <Text style={styles.floatingButtonText}>📊</Text>
      </TouchableOpacity>

      {/* Performance Panel Modal */}
      <Modal
        visible={isOpen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setIsOpen(false)}
      >
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>🚀 Performance Monitor</Text>
            <TouchableOpacity onPress={() => setIsOpen(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {renderPerformanceStats()}
            {renderRecentMeasurements()}
            {renderActions()}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  floatingButtonText: {
    fontSize: 20,
  },
  modal: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  title: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
  },
  closeButton: {
    fontSize: typography.sizes.xl,
    color: colors.text.secondary,
    padding: spacing.sm,
  },
  content: {
    flex: 1,
  },
  section: {
    margin: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.sizes['2xl'],
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  statLabel: {
    fontSize: typography.sizes.sm,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  slowestItem: {
    backgroundColor: colors.error + '10',
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.sm,
  },
  slowestTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.error,
  },
  slowestText: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  slowestDuration: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.error,
  },
  fastestItem: {
    backgroundColor: colors.success + '10',
    padding: spacing.md,
    borderRadius: spacing.sm,
  },
  fastestTitle: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.semibold,
    color: colors.success,
  },
  fastestText: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  fastestDuration: {
    fontSize: typography.sizes.base,
    fontWeight: typography.weights.bold,
    color: colors.success,
  },
  recentList: {
    maxHeight: 200,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.background.secondary,
  },
  recentEmoji: {
    fontSize: typography.sizes.lg,
    marginRight: spacing.md,
  },
  recentContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentName: {
    fontSize: typography.sizes.sm,
    color: colors.text.primary,
    flex: 1,
  },
  recentComponent: {
    color: colors.text.tertiary,
    fontSize: typography.sizes.xs,
  },
  recentDuration: {
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
  emptyText: {
    textAlign: 'center',
    color: colors.text.secondary,
    fontStyle: 'italic',
    padding: spacing.xl,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    minWidth: 100,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: colors.info,
  },
  reportButton: {
    backgroundColor: colors.warning,
  },
  clearButton: {
    backgroundColor: colors.error,
  },
  actionButtonText: {
    color: colors.text.white,
    fontSize: typography.sizes.sm,
    fontWeight: typography.weights.semibold,
  },
}); 