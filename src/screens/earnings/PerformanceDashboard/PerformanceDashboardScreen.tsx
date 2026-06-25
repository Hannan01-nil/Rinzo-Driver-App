import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import { mockPerformanceDashboardData } from "@/data/performance";
import { SalarySummaryCard } from "@/components/common/SalarySummaryCard";

const { width: screenWidth } = Dimensions.get("window");
const cardWidth = (screenWidth - 40 - 12) / 2; // Horizontal padding (20px left, 20px right) and 12px gap

interface StatCardProps {
  label: string;
  value: string;
  subLabel?: string;
  iconName: string;
  iconType: "ionicons" | "material";
  index: number;
}

function PerformanceStatCard({
  label,
  value,
  subLabel,
  iconName,
  iconType,
  index,
}: StatCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400).delay(150 + index * 60)}
      style={styles.statCard}
    >
      <Text style={styles.statCardLabel}>{label}</Text>
      <View style={styles.statCardBottom}>
        <View style={styles.statValueContainer}>
          <Text style={styles.statCardValue}>{value}</Text>
          {subLabel && <Text style={styles.statCardSubLabel}>{subLabel}</Text>}
        </View>
        <View style={styles.statIconContainer}>
          {iconType === "ionicons" ? (
            <Ionicons name={iconName as any} size={22} color="#1F1F1F" />
          ) : (
            <MaterialCommunityIcons name={iconName as any} size={22} color="#1F1F1F" />
          )}
        </View>
      </View>
    </Animated.View>
  );
}

interface QuickActionRowProps {
  title: string;
  subtitle: string;
  iconName: string;
  onPress: () => void;
}

function QuickActionRow({ title, subtitle, iconName, onPress }: QuickActionRowProps) {
  return (
    <TouchableOpacity
      style={styles.quickActionRow}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.quickActionLeft}>
        <View style={styles.quickActionIconContainer}>
          <MaterialCommunityIcons name={iconName as any} size={22} color="#8259D2" />
        </View>
        <View style={styles.quickActionTextContainer}>
          <Text style={styles.quickActionTitle}>{title}</Text>
          <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
    </TouchableOpacity>
  );
}

export function PerformanceDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const data = mockPerformanceDashboardData;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Performance</Text>
        <TouchableOpacity style={styles.headerIconContainer} activeOpacity={0.7}>
          <Ionicons name="information-circle-outline" size={24} color="#1F1F1F" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 }, // Ensures list content scrolls above bottom tab bar cleanly
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Salary Summary Card */}
        <SalarySummaryCard
          month={data.salarySummary.month}
          label={data.salarySummary.amountLabel}
          value={data.salarySummary.value}
          paymentStatus={data.salarySummary.paymentStatus}
          iconName="calendar-outline"
        />

        {/* Overview Section Header */}
        <Animated.View entering={FadeInUp.duration(400).delay(100)}>
          <Text style={styles.sectionTitle}>Overview</Text>
        </Animated.View>

        {/* Overview Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <PerformanceStatCard {...data.overviewStats[0]} index={0} />
            <PerformanceStatCard {...data.overviewStats[1]} index={1} />
          </View>
          <View style={styles.gridRow}>
            <PerformanceStatCard {...data.overviewStats[2]} index={2} />
            <PerformanceStatCard {...data.overviewStats[3]} index={3} />
          </View>
          <View style={styles.gridRow}>
            <PerformanceStatCard {...data.overviewStats[4]} index={4} />
            <PerformanceStatCard {...data.overviewStats[5]} index={5} />
          </View>
        </View>

        {/* Incentive Card */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(500)}
          style={styles.incentiveCard}
        >
          <View style={styles.incentiveTextContainer}>
            <Text style={styles.incentiveLabel}>{data.incentive.label}</Text>
            <Text style={styles.incentiveValue}>{data.incentive.value}</Text>
          </View>
          <Ionicons name={data.incentive.iconName as any} size={24} color="#8259D2" />
        </Animated.View>

        {/* Quick Actions Section Header */}
        <Animated.View entering={FadeInUp.duration(400).delay(550)}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </Animated.View>

        {/* Quick Actions Container */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(600)}
          style={styles.quickActionsContainer}
        >
          <QuickActionRow
            {...data.quickActions[0]}
            onPress={() => navigation.navigate(data.quickActions[0].route)}
          />
          <View style={styles.rowSeparator} />
          <QuickActionRow
            {...data.quickActions[1]}
            onPress={() => navigation.navigate(data.quickActions[1].route)}
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: "#FFFFFF",
  },
  headerSpacer: {
    width: 24,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F1F1F",
  },
  headerIconContainer: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  salaryCard: {
    height: 124,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  salaryCardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  salaryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  salaryCardMonth: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 14,
  },
  salaryCardLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 2,
    lineHeight: 16,
  },
  salaryCardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 36,
    color: "#FFFFFF",
    lineHeight: 40,
    marginVertical: 4,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  badgeIcon: {
    marginRight: 4,
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#FFFFFF",
  },
  topRightIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginTop: 24,
    marginHorizontal: 20,
  },
  gridContainer: {
    marginHorizontal: 20,
    marginTop: 12,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  statCard: {
    width: cardWidth,
    height: 92,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 14,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statCardLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 16,
  },
  statCardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  statValueContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  statCardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#1F1F1F",
    lineHeight: 22,
  },
  statCardSubLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    color: "#8E8E93",
    marginTop: 2,
    lineHeight: 12,
  },
  statIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  incentiveCard: {
    height: 72,
    borderRadius: 16,
    backgroundColor: "#F7F3FF",
    marginHorizontal: 20,
    marginTop: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incentiveTextContainer: {
    flexDirection: "column",
  },
  incentiveLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8259D2",
    lineHeight: 16,
  },
  incentiveValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#8259D2",
    marginTop: 2,
    lineHeight: 24,
  },
  quickActionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    marginHorizontal: 20,
    marginTop: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  quickActionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  quickActionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#F7F3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  quickActionTextContainer: {
    flex: 1,
  },
  quickActionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#1F1F1F",
    lineHeight: 18,
  },
  quickActionSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 2,
    lineHeight: 16,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: "#F2F2F7",
    marginHorizontal: 16,
  },
});
