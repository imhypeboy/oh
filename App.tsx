import React, { useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { AppProvider, useAppContext } from './src/context/AppContext';
import { User } from './src/types';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import QuestScreen from './src/screens/QuestScreen';
import AIScreen from './src/screens/AIScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EmotionRecordScreen from './src/screens/EmotionRecordScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width } = Dimensions.get('window');

// 커스텀 탭바 컴포넌트
function CustomTabBar({ state, descriptors, navigation }: any) {
  const getTabIcon = (routeName: string, isFocused: boolean) => {
    const icons = {
      Home: '🏠',
      Quests: '🎯',
      AI: '🤖',
      Community: '💬',
      Profile: '👤',
    };
    return icons[routeName as keyof typeof icons] || '⭐';
  };

  const getTabLabel = (routeName: string) => {
    const labels = {
      Home: '홈',
      Quests: '퀘스트',
      AI: 'AI 연습',
      Community: '커뮤니티',
      Profile: '프로필',
    };
    return labels[routeName as keyof typeof labels] || routeName;
  };

  return (
    <View style={styles.tabBarContainer}>
      {/* 글래스모피즘 배경 */}
      <BlurView intensity={40} style={styles.tabBarBlur}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.3)'
          ]}
          style={styles.tabBarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        {/* 탭 버튼들 */}
        <View style={styles.tabButtonsContainer}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
                activeOpacity={0.7}
              >
                {/* 활성 탭 글로우 효과 */}
                {isFocused && (
                  <View style={styles.activeTabGlow}>
                    <LinearGradient
                      colors={['rgba(59, 130, 246, 0.3)', 'rgba(59, 130, 246, 0.1)']}
                      style={styles.glowGradient}
                    />
                  </View>
                )}
                
                {/* 아이콘 컨테이너 */}
                <View style={[
                  styles.iconContainer,
                  isFocused && styles.iconContainerActive
                ]}>
                  {isFocused && (
                    <BlurView intensity={20} style={styles.iconBlur}>
                      <LinearGradient
                        colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
                        style={styles.iconGradient}
                      />
                    </BlurView>
                  )}
                  <Text style={[
                    styles.tabIcon,
                    { transform: [{ scale: isFocused ? 1.1 : 1 }] }
                  ]}>
                    {getTabIcon(route.name, isFocused)}
                  </Text>
                </View>

                {/* 라벨 */}
                <Text style={[
                  styles.tabLabel,
                  isFocused ? styles.tabLabelActive : styles.tabLabelInactive
                ]}>
                  {getTabLabel(route.name)}
                </Text>

                {/* 활성 인디케이터 도트 */}
                {isFocused && (
                  <View style={styles.activeDot}>
                    <LinearGradient
                      colors={['#3B82F6', '#1E40AF']}
                      style={styles.dotGradient}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </BlurView>

      {/* 하단 인디케이터 라인 */}
      <View style={styles.bottomIndicator}>
        <LinearGradient
          colors={['rgba(59, 130, 246, 0.3)', 'transparent']}
          style={styles.indicatorGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        />
      </View>
    </View>
  );
}

// 탭 네비게이터 컴포넌트
function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Quests" component={QuestScreen} />
      <Tab.Screen name="AI" component={AIScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// 메인 네비게이터 컴포넌트
function AppNavigator() {
  const { state, dispatch } = useAppContext();

  // 초기 사용자 데이터 설정 (임시)
  useEffect(() => {
    if (!state.user) {
      const demoUser: User = {
        id: 'demo_user_1',
        email: 'user@example.com',
        nickname: '용감한 탐험가',
        level: 1,
        socialExp: 25,
        courageExp: 30,
        totalQuests: 8,
        completedQuests: 3,
        achievements: [],
        createdAt: new Date().toISOString(),
      };
      dispatch({ type: 'SET_USER', payload: demoUser });
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen 
          name="EmotionRecord" 
          component={EmotionRecordScreen}
          options={{
            presentation: 'modal',
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 루트 앱 컴포넌트
export default function App() {
  return (
    <AppProvider>
      <StatusBar style="auto" />
      <AppNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
  },
  tabBarBlur: {
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 34 : 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  tabBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabButtonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
    position: 'relative',
  },
  activeTabGlow: {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
  glowGradient: {
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    position: 'relative',
  },
  iconContainerActive: {
    transform: [{ scale: 1.05 }],
  },
  iconBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    overflow: 'hidden',
  },
  iconGradient: {
    flex: 1,
  },
  tabIcon: {
    fontSize: 18,
    zIndex: 1,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 0,
  },
  tabLabelActive: {
    color: '#3B82F6',
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: '#6B7280',
  },
  activeDot: {
    position: 'absolute',
    bottom: 0,
    width: 2,
    height: 2,
    borderRadius: 1,
    overflow: 'hidden',
  },
  dotGradient: {
    flex: 1,
  },
  bottomIndicator: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 34 : 20,
    left: 20,
    right: 20,
    height: 1,
    borderRadius: 0.5,
    overflow: 'hidden',
  },
  indicatorGradient: {
    flex: 1,
  },
});
