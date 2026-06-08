export interface TabConfig {
  key: string
  label: string
  icon: string
}

export interface BottomTabBarProps {
  activeTab: string
  onTabPress: (tabKey: string) => void
  tabs?: TabConfig[]
}
