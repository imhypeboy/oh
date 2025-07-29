import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MenuItem } from '../../utils/profileUtils';
import { colors, typography, spacing, dimensions } from '../../config/theme';

interface SettingsMenuCardProps {
  menuItems: MenuItem[];
  onMenuPress: (menuId: string) => void;
}

export const SettingsMenuCard: React.FC<SettingsMenuCardProps> = ({ 
  menuItems, 
  onMenuPress 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>설정 ⚙️</Text>
        <View style={styles.menuList}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id}
              style={styles.menuItem} 
              onPress={() => onMenuPress(item.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuText}>{item.text}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: colors.background.card,
    borderRadius: spacing.lg,
    ...dimensions.shadow.small,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  menuList: {
    gap: spacing.xs,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: spacing.sm,
    backgroundColor: colors.background.secondary,
  },
  menuIcon: {
    fontSize: typography.sizes.xl,
    marginRight: spacing.md,
    width: 24,
    textAlign: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: typography.sizes.base,
    color: colors.text.primary,
    fontWeight: typography.weights.medium,
  },
  menuArrow: {
    fontSize: typography.sizes.xl,
    color: colors.text.tertiary,
    fontWeight: typography.weights.bold,
  },
}); 