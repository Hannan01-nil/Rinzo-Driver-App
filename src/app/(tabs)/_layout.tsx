import { Tabs } from 'expo-router'
import { BottomTabBar } from '@/components/navigation/BottomTabBar'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index]
        return (
          <BottomTabBar
            activeTab={activeRoute.name}
            onTabPress={(key) => props.navigation.navigate(key as never)}
          />
        )
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home' }} />
      <Tabs.Screen name="orders" options={{ title: 'Orders' }} />
      <Tabs.Screen name="earnings" options={{ title: 'Earnings' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  )
}
