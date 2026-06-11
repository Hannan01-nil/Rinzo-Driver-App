import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { useProfile } from "@/hooks";
import { mockPerformanceData } from "@/data/performanceData";
import { HeaderBackButton } from "@/components/layout/header-back-button";

export function PerformanceScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { profile } = useProfile();
  const firstName = profile?.name ? profile.name.split(" ")[0] : "Rahul";

  const { weeklyStats, chartData } = mockPerformanceData;

  const getIconName = (icon: string) => {
    if (icon === "checkmark-circle") return "checkmark";
    if (icon === "checkmark-done-circle") return "checkmark-done";
    if (icon === "time-outline") return "time";
    return icon;
  };

  const getBarColor = (day: string) => {
    switch (day) {
      case "MON": return "#E5E0F4";
      case "TUE": return "#CEBEE7";
      case "WED": return "#DED2F0";
      case "THU": return "#9675D6";
      case "FRI": return "#A68DE0";
      case "SAT": return "#7851C8";
      case "SUN": return "#6538B5";
      default: return "#E5E0F4";
    }
  };

  // Split weekly stats into 2 rows of 2 cards
  const statsRows = [
    [weeklyStats[0], weeklyStats[1]],
    [weeklyStats[2], weeklyStats[3]],
  ];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Performance</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Weekly Stats</Text>
          <Text style={styles.sectionSubtitle}>
            Update: Last 7 days performance
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {statsRows.map((row, rowIdx) => (
            <View key={`row-${rowIdx}`} style={styles.statsRow}>
              {row.map((item) => (
                <View key={item.id} style={styles.statCard}>
                  <View style={styles.iconCircle}>
                    <Ionicons name={getIconName(item.icon) as any} size={20} color="#8259D2" />
                  </View>
                  <Text style={styles.cardTitle}>{item.label}</Text>
                  <Text style={styles.cardValue}>{item.value}</Text>
                  <View style={styles.statusChip}>
                    <Text style={styles.statusChipText}>{item.status}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Congratulations Banner */}
        <LinearGradient
          colors={["#8259D2", "#6A44B8"]}
          style={styles.bannerContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Background Blobs for Visual Effect */}
          <View style={styles.bannerBlob1} />
          <View style={styles.bannerBlob2} />

          <View style={styles.bannerLeft}>
            <Text style={styles.bannerTitle}>Great Job,{"\n"}{firstName}! 🥳</Text>
            <Text style={styles.bannerSubtitle}>
              You're one of our top performing drivers. Keep it up!
            </Text>
          </View>
          <Image
            source={require("@/assets/images/trophy.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </LinearGradient>

        {/* Efficiency Trend Card */}
        <View style={styles.trendCard}>
          <View style={styles.trendHeader}>
            <Text style={styles.trendTitle}>Efficiency Trend</Text>
            <Ionicons name="trending-up" size={24} color="#081C3A" />
          </View>

          {/* Chart Container (Dashed Box) */}
          <View style={styles.chartContainer}>
            {chartData.map((bar) => (
              <View key={bar.day} style={styles.barWrapper}>
                <View
                  style={[
                    styles.barInner,
                    {
                      height: `${bar.value}%`,
                      backgroundColor: getBarColor(bar.day),
                    },
                  ]}
                />
              </View>
            ))}
          </View>

          {/* Labels Container (Below Dashed Box) */}
          <View style={styles.labelsContainer}>
            {chartData.map((bar) => (
              <View key={bar.day} style={styles.labelWrapper}>
                <Text style={styles.dayLabel}>{bar.day}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FF",
  },
  headerRight: {
    width: 26,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#081C3A",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#081C3A",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6F6B78",
  },
  statsGrid: {
    gap: 12,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F0EDF7",
    padding: 12,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F4EEFF",
    alignItems: "center",
    justifyContent: "center",
  },
  statusChip: {
    height: 26,
    backgroundColor: "#DDF6E4",
    borderRadius: 13,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  statusChipText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#16A34A",
  },
  cardTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    letterSpacing: 1,
    color: "#6F6B78",
    textTransform: "uppercase",
    textAlign: "center",
  },
  cardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: "#8259D2",
    lineHeight: 32,
    textAlign: "center",
  },
  bannerContainer: {
    minHeight: 140,
    borderRadius: 22,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    marginBottom: 16,
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  bannerBlob1: {
    position: "absolute",
    left: -30,
    top: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.09)",
  },
  bannerBlob2: {
    position: "absolute",
    right: 70,
    bottom: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.09)",
  },
  bannerLeft: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 12,
    zIndex: 1,
  },
  bannerTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: "#FFFFFF",
    lineHeight: 32,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
    lineHeight: 20,
    zIndex: 1,
  },
  bannerImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    zIndex: 1,
  },
  trendCard: {
    backgroundColor: "#F0F3FC", // Exact premium light blue-gray
    borderRadius: 24,
    padding: 22,
    marginTop: 20,
    marginBottom: 40,
  },
  trendHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  trendTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 26,
    color: "#081C3A",
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C7BEDA", // Lavender-gray dashed border
    borderStyle: "dashed",
    borderRadius: 16,
    height: 140,
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  barWrapper: {
    flex: 1,
    alignItems: "center",
    height: "100%",
    justifyContent: "flex-end",
  },
  barInner: {
    width: 28, // Matches mockup thick bars
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  labelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    paddingHorizontal: 12, // Align with chart content
  },
  labelWrapper: {
    flex: 1,
    alignItems: "center",
  },
  dayLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#475467",
    textAlign: "center",
  },
});
