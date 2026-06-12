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

const { height: screenHeight } = Dimensions.get("window");

// Mockup data values to match the screenshot exactly
const CHART_DATA = [
  { day: "Mon", amount: "₹420", val: 420, max: 880 },
  { day: "Tue", amount: "₹500", val: 500, max: 880 },
  { day: "Wed", amount: "₹200", val: 200, max: 880 },
  { day: "Thu", amount: "₹450", val: 450, max: 880 },
  { day: "Fri", amount: "₹720", val: 720, max: 880 },
  { day: "Sat", amount: "₹880", val: 880, max: 880 },
  { day: "Sun", amount: "₹650", val: 650, max: 880 },
];

const TOTAL_EARNINGS = "4,250";
const DELIVERIES_COUNT = "32 Deliveries";

const BREAKDOWN_DATA = [
  { label: "Base Earnings", value: "₹3,300" },
  { label: "Tips", value: "₹700" },
  { label: "Bonuses", value: "₹250" },
];

export function Last7DaysScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          >
            <Ionicons name="chevron-back" size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">
          Last 7 Days Earnings
        </Text>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Custom Bar Chart */}
        <View style={styles.chartContainer}>
          {CHART_DATA.map((item, idx) => {
            const barHeightPercentage = (item.val / item.max) * 100;
            return (
              <View key={idx} style={styles.chartCol}>
                <Text style={styles.chartValue}>{item.amount}</Text>
                <View style={styles.barTrack}>
                  <View
                    style={[
                      styles.chartBar,
                      { height: `${barHeightPercentage}%` },
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            );
          })}
        </View>

        {/* Total Earnings Card */}
        <View style={styles.card}>
          <Text style={styles.totalLabel}>Total Earnings</Text>
          <Text style={styles.totalAmount}>₹{TOTAL_EARNINGS}</Text>
          <View style={styles.badgeContainer}>
            <View style={styles.deliveriesBadge}>
              <MaterialCommunityIcons
                name="shopping-outline"
                size={14}
                color="#85859B"
                style={styles.badgeIcon}
              />
              <Text style={styles.deliveriesBadgeText}>{DELIVERIES_COUNT}</Text>
            </View>
          </View>
        </View>

        {/* Earnings Breakdown Card */}
        <View style={styles.card}>
          {BREAKDOWN_DATA.map((item, idx) => (
            <View key={idx}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>{item.label}</Text>
                <Text style={styles.breakdownValue}>{item.value}</Text>
              </View>
              {idx < BREAKDOWN_DATA.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: "#F8F9FC",
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#10213A",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 180, // Tab bar overlay offset
  },
  // Custom Bar Chart
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 200,
    paddingBottom: 8,
    marginTop: 16,
    marginBottom: 20,
  },
  chartCol: {
    alignItems: "center",
    flex: 1,
    height: "100%",
    justifyContent: "flex-end",
  },
  chartValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#10213A",
    marginBottom: 6,
  },
  barTrack: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  chartBar: {
    width: 14,
    backgroundColor: "#845EF7", // Purple color matching mockup
    borderRadius: 7, // Rounded pill shape at top and bottom
  },
  dayLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#85859B",
    marginTop: 8,
  },
  // Total Earnings Card
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  totalLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#85859B",
  },
  totalAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 32,
    color: "#10213A",
    marginTop: 6,
  },
  badgeContainer: {
    flexDirection: "row",
    marginTop: 12,
  },
  deliveriesBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F3F9", // Light gray background
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeIcon: {
    marginRight: 6,
  },
  deliveriesBadgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#85859B",
  },
  // Breakdown row
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  breakdownLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#85859B",
  },
  breakdownValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#10213A",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F3F9",
  },
});
