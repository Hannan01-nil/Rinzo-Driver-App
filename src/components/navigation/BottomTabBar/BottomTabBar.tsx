import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Animated, Easing } from "react-native";
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
  const activeProgress = React.useRef(new Animated.Value(isActive ? 1 : 0)).current;

  React.useEffect(() => {
    const anim = Animated.timing(activeProgress, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.out(Easing.ease),
    });
    
    anim.start();

    return () => {
      anim.stop();
    };
  }, [isActive]);

  const activeScale = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 1.0],
  });

  const inactiveScale = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.6],
  });

  const activeOpacity = activeProgress;
  const inactiveOpacity = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const animatedTranslateY = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -5],
  });

  const animatedTextOpacity = activeProgress.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
  });

  const animatedTextTranslateY = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [6, 0],
  });

  return (
    <TouchableOpacity
      style={[styles.tabItem, { flex: 1 }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.tabContentContainer}>
        <Animated.View
          style={{
            transform: [{ translateY: animatedTranslateY }],
            alignItems: "center",
            justifyContent: "center",
            width: 24,
            height: 24,
          }}
        >
          {/* Active Purple Icon (fades in, scales up, size 18) */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: activeOpacity,
                transform: [{ scale: activeScale }],
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={18}
              color="#8259D2"
            />
          </Animated.View>

          {/* Inactive White Icon (fades out, scales down, size 22) */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: inactiveOpacity,
                transform: [{ scale: inactiveScale }],
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <MaterialCommunityIcons
              name={tab.icon as any}
              size={22}
              color="#FFFFFF"
            />
          </Animated.View>
        </Animated.View>
        <Animated.Text
          style={[
            styles.activeText,
            {
              opacity: animatedTextOpacity,
              transform: [{ translateY: animatedTextTranslateY }],
            },
          ]}
          numberOfLines={1}
        >
          {tab.label}
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
}

export function BottomTabBar({
  activeTab,
  onTabPress,
  tabs = DEFAULT_TABS,
}: BottomTabBarProps) {
  const [containerWidth, setContainerWidth] = React.useState(0);
  const activeIndex = tabs.findIndex((tab) => tab.key === activeTab);
  const translateX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    let anim: Animated.CompositeAnimation | null = null;
    if (containerWidth > 0 && activeIndex !== -1) {
      const tabWidth = (containerWidth - 16) / tabs.length;
      const targetValue = activeIndex * tabWidth;
      anim = Animated.timing(translateX, {
        toValue: targetValue,
        useNativeDriver: true,
        duration: 200,
        easing: Easing.out(Easing.ease),
      });
      anim.start();
    }
    return () => {
      if (anim) {
        anim.stop();
      }
    };
  }, [activeIndex, containerWidth, tabs.length]);

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {containerWidth > 0 && activeIndex !== -1 && (
        <Animated.View
          style={[
            styles.activeCapsuleBg,
            {
              left: 8 + ((containerWidth - 16) / tabs.length - 76) / 2,
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
  tabContentContainer: {
    height: 48,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  activeCapsuleBg: {
    position: "absolute",
    height: 48,
    width: 76,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    top: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  activeText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 9.5,
    color: "#8259D2",
    position: "absolute",
    bottom: 2,
    textAlign: "center",
  },
});
