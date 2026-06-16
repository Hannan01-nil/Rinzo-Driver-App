import React, { useEffect, useRef, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from "react-native";

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

function TabItem({
  tab,
  isActive,
  onPress,
}: {
  tab: TabConfig;
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleValue = useRef(new Animated.Value(isActive ? 1.15 : 1.0)).current;

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: isActive ? 1.15 : 1.0,
      useNativeDriver: true,
      duration: 120,
      easing: Easing.out(Easing.ease),
    }).start();
  }, [isActive]);

  return (
    <TouchableOpacity
      style={styles.tabItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Animated.View
        style={{
          transform: [{ scale: scaleValue }],
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialCommunityIcons
          name={tab.icon as any}
          size={22}
          color={isActive ? "#FFFFFF" : "#7E8794"}
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

export function BottomTabBar({
  activeTab,
  onTabPress,
  tabs = DEFAULT_TABS,
}: BottomTabBarProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (containerWidth > 0 && activeIndex !== -1) {
      const tabWidth = containerWidth / tabs.length;
      const targetValue = activeIndex * tabWidth;
      Animated.timing(translateX, {
        toValue: targetValue,
        useNativeDriver: true,
        duration: 160,
        easing: Easing.out(Easing.ease),
      }).start();
    }
  }, [activeIndex, containerWidth, tabs.length]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {containerWidth > 0 && activeIndex !== -1 && (
        <Animated.View
          style={[
            styles.activeCircle,
            {
              position: "absolute",
              left: containerWidth / tabs.length / 2 - 21,
              top: 11,
              transform: [{ translateX }],
            },
          ]}
        />
      )}
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
