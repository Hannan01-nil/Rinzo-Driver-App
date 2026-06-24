import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { TabConfig, BottomTabBarProps } from "./types";

const DEFAULT_TABS: TabConfig[] = [
  { key: "home", icon: "clipboard-text-outline", label: "Tasks" },
  { key: "orders", icon: "calendar-outline", label: "Schedule" },
  { key: "earnings", icon: "chart-bar", label: "Performance" },
  { key: "profile", icon: "account-outline", label: "Profile" },
];

function TabItem({
  tab,
  isActive,
  onPress,
}: {
  tab: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.tabItem, { flex: 1 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {isActive ? (
        <View style={styles.activeCapsule}>
          <MaterialCommunityIcons
            name={tab.icon as any}
            size={18}
            color="#8259D2"
          />
          <Text style={styles.activeText} numberOfLines={1} adjustsFontSizeToFit>
            {tab.label}
          </Text>
        </View>
      ) : (
        <View style={styles.inactiveContainer}>
          <MaterialCommunityIcons
            name={tab.icon as any}
            size={22}
            color="#FFFFFF"
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

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
          <TabItem
            key={tab.key}
            tab={tab}
            isActive={isActive}
            onPress={() => onTabPress(tab.key)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 28,
    height: 64,
    backgroundColor: "#8259D2",
    borderRadius: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  tabItem: {
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCapsule: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: 76,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    paddingHorizontal: 4,
  },
  activeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9.5,
    color: "#8259D2",
    marginTop: 1,
    textAlign: "center",
  },
  inactiveContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
  },
});
