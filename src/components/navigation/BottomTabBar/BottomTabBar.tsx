import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated'

interface TabConfig {
  key: string
  label: string
  icon: string
}

interface BottomTabBarProps {
  activeTab: string
  onTabPress: (tabKey: string) => void
  tabs?: TabConfig[]
}

const DEFAULT_TABS: TabConfig[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'earnings', label: 'Earnings', icon: 'wallet-outline' },
  { key: 'orders', label: 'Orders', icon: 'shopping-outline' },
  { key: 'profile', label: 'Profile', icon: 'account-outline' },
]

function TabItem({ tab, isActive, onPress }: { tab: TabConfig; isActive: boolean; onPress: () => void }) {
  const pillAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(isActive ? 120 : 56, { damping: 15, stiffness: 150, mass: 1 }),
      backgroundColor: withTiming(isActive ? '#7C4DFF' : 'transparent', { duration: 200 }),
    }
  })

  const labelAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive ? 1 : 0, { duration: 200 }),
      transform: [{ translateX: withTiming(isActive ? 0 : 10, { duration: 200 }) }],
    }
  })

  const iconColor = isActive ? '#FFFFFF' : '#7B8494'

  return (
    <TouchableOpacity style={styles.tabItem} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={[styles.pill, pillAnimatedStyle]}>
        <MaterialCommunityIcons name={tab.icon as any} size={22} color={iconColor} />
        <Animated.Text style={[styles.label, labelAnimatedStyle]}>
          {tab.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

export function BottomTabBar({
  activeTab,
  onTabPress,
  tabs = DEFAULT_TABS,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TabItem
          key={tab.key}
          tab={tab}
          isActive={tab.key === activeTab}
          onPress={() => onTabPress(tab.key)}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 64,
  },
  pill: {
    height: 48,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 18,
  },
  label: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
})
