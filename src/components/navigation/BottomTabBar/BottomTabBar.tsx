import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface TabConfig {
  key: string;
  icon: string;
}

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tabKey: string) => void;
  tabs?: TabConfig[];
}

const DEFAULT_TABS: TabConfig[] = [
  { key: "home", icon: "home" },
  { key: "earnings", icon: "wallet-outline" },
  { key: "orders", icon: "shopping-outline" },
  { key: "profile", icon: "account-outline" },
];

export function BottomTabBar({
  activeTab,
  onTabPress,
  tabs = DEFAULT_TABS,
}: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)}
            activeOpacity={0.7}
          >
            {isActive ? (
              <View style={styles.activeCircle}>
                <MaterialCommunityIcons
                  name={tab.icon as any}
                  size={22}
                  color="#FFFFFF"
                />
              </View>
            ) : (
              <MaterialCommunityIcons
                name={tab.icon as any}
                size={22}
                color="#7E8794"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 30,
    right: 30,
    bottom: 28,
    height: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 64,
  },
  activeCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#8259D2",
    alignItems: "center",
    justifyContent: "center",
  },
});
