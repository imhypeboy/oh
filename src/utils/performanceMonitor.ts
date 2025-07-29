import React from 'react';
import { Platform } from 'react-native';

// Performance 측정 유틸리티
export class PerformanceMonitor {
  private static startTimes: Map<string, number> = new Map();
  private static performanceData: Array<{
    name: string;
    duration: number;
    timestamp: number;
    component?: string;
  }> = [];

  // 성능 측정 시작
  static startMeasure(name: string, component?: string): void {
    if (__DEV__) {
      const startTime = Date.now();
      this.startTimes.set(name, startTime);
      
      if (Platform.OS === 'ios' || Platform.OS === 'android') {
        console.log(`🚀 [Performance] Started measuring: ${name}${component ? ` (${component})` : ''}`);
      }
    }
  }

  // 성능 측정 종료
  static endMeasure(name: string, component?: string): number | null {
    if (__DEV__) {
      const startTime = this.startTimes.get(name);
      if (!startTime) {
        console.warn(`⚠️ [Performance] No start time found for: ${name}`);
        return null;
      }

      const endTime = Date.now();
      const duration = endTime - startTime;
      
      // 성능 데이터 저장
      this.performanceData.push({
        name,
        duration,
        timestamp: endTime,
        component,
      });

      // 콘솔에 결과 출력
      const message = `⏱️ [Performance] ${name}${component ? ` (${component})` : ''}: ${duration}ms`;
      
      if (duration > 100) {
        console.warn(`🐌 [SLOW] ${message}`);
      } else if (duration > 50) {
        console.log(`⚡ [OK] ${message}`);
      } else {
        console.log(`🚀 [FAST] ${message}`);
      }

      // 메모리에서 제거
      this.startTimes.delete(name);
      
      return duration;
    }
    return null;
  }

  // 성능 통계 조회
  static getPerformanceStats(): {
    total: number;
    average: number;
    slowest: { name: string; duration: number; component?: string } | null;
    fastest: { name: string; duration: number; component?: string } | null;
    recent: Array<{ name: string; duration: number; component?: string }>;
  } {
    if (!__DEV__ || this.performanceData.length === 0) {
      return {
        total: 0,
        average: 0,
        slowest: null,
        fastest: null,
        recent: [],
      };
    }

    const durations = this.performanceData.map(d => d.duration);
    const total = this.performanceData.length;
    const average = durations.reduce((a, b) => a + b, 0) / total;
    
    const slowest = this.performanceData.reduce((prev, current) => 
      prev.duration > current.duration ? prev : current
    );
    
    const fastest = this.performanceData.reduce((prev, current) => 
      prev.duration < current.duration ? prev : current
    );

    const recent = this.performanceData.slice(-10);

    return {
      total,
      average: Math.round(average * 100) / 100,
      slowest,
      fastest,
      recent,
    };
  }

  // 성능 리포트 출력
  static printPerformanceReport(): void {
    if (__DEV__) {
      const stats = this.getPerformanceStats();
      
      console.log('\n📊 ===== PERFORMANCE REPORT =====');
      console.log(`📈 Total measurements: ${stats.total}`);
      console.log(`⏱️ Average duration: ${stats.average}ms`);
      
      if (stats.slowest) {
        console.log(`🐌 Slowest: ${stats.slowest.name}${stats.slowest.component ? ` (${stats.slowest.component})` : ''} - ${stats.slowest.duration}ms`);
      }
      
      if (stats.fastest) {
        console.log(`🚀 Fastest: ${stats.fastest.name}${stats.fastest.component ? ` (${stats.fastest.component})` : ''} - ${stats.fastest.duration}ms`);
      }
      
      console.log('\n📋 Recent measurements:');
      stats.recent.forEach(item => {
        const emoji = item.duration > 100 ? '🐌' : item.duration > 50 ? '⚡' : '🚀';
        console.log(`  ${emoji} ${item.name}${item.component ? ` (${item.component})` : ''}: ${item.duration}ms`);
      });
      console.log('================================\n');
    }
  }

  // 성능 데이터 클리어
  static clearData(): void {
    if (__DEV__) {
      this.performanceData = [];
      this.startTimes.clear();
      console.log('🧹 [Performance] Data cleared');
    }
  }
}

// HOC for component performance measurement
export function withPerformanceMonitoring<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name || 'Component';
  
  const PerformanceWrappedComponent = (props: T) => {
    React.useEffect(() => {
      PerformanceMonitor.startMeasure(`${displayName}-mount`, displayName);
      
      return () => {
        PerformanceMonitor.endMeasure(`${displayName}-mount`, displayName);
      };
    }, []);

    return React.createElement(WrappedComponent, props);
  };

  PerformanceWrappedComponent.displayName = `withPerformanceMonitoring(${displayName})`;
  
  return PerformanceWrappedComponent;
}

// Hook for measuring custom operations
export function usePerformanceMeasure() {
  const startMeasure = React.useCallback((name: string, component?: string) => {
    PerformanceMonitor.startMeasure(name, component);
  }, []);

  const endMeasure = React.useCallback((name: string, component?: string) => {
    return PerformanceMonitor.endMeasure(name, component);
  }, []);

  return { startMeasure, endMeasure };
}

// Memory usage monitoring (for development)
export class MemoryMonitor {
  private static memoryData: Array<{
    timestamp: number;
    jsHeapSizeUsed?: number;
    jsHeapSizeTotal?: number;
  }> = [];

  static startMonitoring(): void {
    if (__DEV__) {
      const interval = setInterval(() => {
        this.recordMemoryUsage();
      }, 5000); // 5초마다 기록

      // 10분 후 자동 정리
      setTimeout(() => {
        clearInterval(interval);
      }, 600000);
    }
  }

  private static recordMemoryUsage(): void {
    if (__DEV__) {
      // React Native에서는 performance.memory가 없으므로 기본적인 정보만 기록
      this.memoryData.push({
        timestamp: Date.now(),
        jsHeapSizeUsed: 0, // TODO: React Native 메모리 API 사용
        jsHeapSizeTotal: 0,
      });

      // 최대 100개 데이터만 유지
      if (this.memoryData.length > 100) {
        this.memoryData = this.memoryData.slice(-100);
      }
    }
  }

  static getMemoryStats() {
    return this.memoryData.slice(-10);
  }
}

export default PerformanceMonitor; 