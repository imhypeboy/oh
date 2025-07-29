import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const colors = {
  // Primary colors
  primary: '#3B82F6',
  secondary: '#6B7280',
  
  // Text colors
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#999999',
    white: '#FFFFFF',
  },
  
  // Background colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
    card: '#FFFFFF',
  },
  
  // Category colors
  category: {
    nearby: '#4CAF50',
    interaction: '#2196F3',
    courage: '#FF9800',
    social: '#E91E63',
    default: '#9C27B0',
  },
  
  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const typography = {
  sizes: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 20,
    '3xl': 24,
    '4xl': 28,
    '5xl': 32,
  },
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
} as const;

export const dimensions = {
  screen: {
    width: screenWidth,
    height: screenHeight,
  },
  card: {
    mainQuest: {
      width: screenWidth * 0.85,
      height: screenWidth * 0.7,
    },
    category: {
      width: screenWidth * 0.4,
      height: screenWidth * 0.4,
    },
    quest: {
      width: screenWidth * 0.9,
      height: screenWidth * 0.3,
    },
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    '2xl': 24,
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
  },
} as const;

export const gradients = {
  category: {
    nearby: ['#4CAF50', '#66BB6A'],
    interaction: ['#2196F3', '#42A5F5'],
    courage: ['#FF9800', '#FFB74D'],
    social: ['#E91E63', '#F06292'],
    default: ['#9C27B0', '#BA68C8'],
  },
} as const; 