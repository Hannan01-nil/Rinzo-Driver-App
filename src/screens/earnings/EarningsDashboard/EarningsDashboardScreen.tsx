import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

// Hardcoded values from the UI mockup to ensure an exact match
const TODAY_EARNINGS = 650;
const WEEK_EARNINGS = "4,250";
const MONTH_EARNINGS = "15,800";
const AVAILABLE_WITHDRAW = "2,350";

const CHART_DATA = [
  { day: "M", height: 35, active: false },
  { day: "T", height: 50, active: false },
  { day: "W", height: 85, active: true, value: "820" },
  { day: "T", height: 45, active: false },
  { day: "F", height: 55, active: false },
  { day: "S", height: 30, active: false },
  { day: "S", height: 40, active: false },
];

const TRANSACTIONS = [
  { id: "1", order: "Order #1234", date: "Today, 2:45 PM", amount: "+₹50" },
  { id: "2", order: "Order #1234", date: "Today, 2:45 PM", amount: "+₹50" },
  { id: "3", order: "Order #1234", date: "Today, 2:45 PM", amount: "+₹50" },
];

export function EarningsDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top, 16), paddingBottom: 110 }, // Reduced bottom padding since button is inline
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Today's Earnings Card */}
        <LinearGradient
          colors={["#845EF7", "#6A40DF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.todayCard}
        >
          {/* Concentric Circle Shapes Layer (refined single circle right overlay) */}
          <View style={styles.circleOverlay} />

          <View style={styles.todayCardHeader}>
            <View>
              <Text style={styles.todayLabel}>Today's Earnings</Text>
              <Text style={styles.todayAmount}>₹{TODAY_EARNINGS}</Text>
            </View>
          </View>

          <View style={styles.todayCardFooter}>
            <View style={styles.deliveriesContainer}>
              <Text style={styles.todayDeliveries}>8 Deliveries</Text>
              <Text style={styles.todayDeliveriesSub}>Completed</Text>
            </View>
            <View style={styles.trendPill}>
              <Ionicons name="trending-up" size={14} color="#FFFFFF" style={styles.trendIcon} />
              <View style={styles.trendTextContainer}>
                <Text style={styles.trendText}>+₹120 vs</Text>
                <Text style={styles.trendText}>Yesterday</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* Weekly & Monthly Small Cards */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statAccentBar} />
            <View style={styles.statCardContent}>
              <Text style={styles.statLabel}>This Week</Text>
              <Text style={styles.statAmount}>₹{WEEK_EARNINGS}</Text>
            </View>
          </View>

          <View style={styles.statCard}>
            <View style={styles.statAccentBar} />
            <View style={styles.statCardContent}>
              <Text style={styles.statLabel}>This Month</Text>
              <Text style={styles.statAmount}>₹{MONTH_EARNINGS}</Text>
            </View>
          </View>
        </View>

        {/* Available to Withdraw Card */}
        <View style={styles.withdrawCard}>
          <View style={styles.withdrawInfo}>
            <Text style={styles.withdrawLabel}>Available to Withdraw</Text>
            <Text style={styles.withdrawAmount}>₹{AVAILABLE_WITHDRAW}</Text>
          </View>
          <TouchableOpacity
            style={styles.withdrawBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("withdraw")}
          >
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Last 7 Days Earnings */}
        <View style={styles.chartCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.chartTitle}>Last 7 days Earnnings</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("last-7-days")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Bar Chart */}
          <View style={styles.chartContainer}>
            {CHART_DATA.map((item, idx) => (
              <View key={idx} style={styles.chartCol}>
                <View style={styles.barTrack}>
                  {item.active && (
                    <View style={styles.tooltipContainer}>
                      <View style={styles.tooltipBubble}>
                        <Text style={styles.tooltipText}>{item.value}</Text>
                      </View>
                      <View style={styles.tooltipTriangle} />
                    </View>
                  )}
                  <View
                    style={[
                      styles.chartBar,
                      { height: `${item.height}%` },
                      item.active ? styles.chartBarActive : styles.chartBarNormal,
                    ]}
                  />
                </View>
                <Text style={styles.dayLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Earnings Breakdown */}
        <View style={styles.breakdownContainer}>
          <Text style={styles.breakdownTitle}>Earnings Breakdown</Text>
          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Base Earnings</Text>
            <Text style={styles.breakdownVal}>₹500</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Tips</Text>
            <Text style={styles.breakdownVal}>₹100</Text>
          </View>
          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={[styles.breakdownLabel, styles.purpleText]}>Bonus</Text>
            <Text style={[styles.breakdownVal, styles.purpleText, styles.boldText]}>50</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("earnings-history")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {TRANSACTIONS.map((tx, idx) => (
            <View key={idx} style={styles.txCard}>
              <View style={styles.txIconContainer}>
                <MaterialCommunityIcons
                  name="washing-machine"
                  size={20}
                  color="#FFFFFF"
                />
              </View>
              <View style={styles.txDetails}>
                <Text style={styles.txOrder}>{tx.order}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <Text style={styles.txAmount}>{tx.amount}</Text>
            </View>
          ))}
        </View>

        {/* Withdraw Action Button (moved inside the ScrollView flow) */}
        <TouchableOpacity
          style={styles.inlineWithdrawBtn}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("withdraw")}
        >
          <LinearGradient
            colors={["#845EF7", "#7048E8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.stickyBtnGradient}
          >
            <MaterialCommunityIcons name="wallet-outline" size={22} color="#FFFFFF" style={styles.walletIcon} />
            <Text style={styles.stickyBtnText}>Withdraw  {AVAILABLE_WITHDRAW}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  // Today's Earnings Card
  todayCard: {
    borderRadius: 24,
    padding: 20,
    marginTop: 8,
    position: "relative",
    overflow: "hidden",
    shadowColor: "#845EF7",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  circleOverlay: {
    position: "absolute",
    right: -40,
    top: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255, 255, 255, 0.09)",
  },
  todayLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
  },
  todayAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 48,
    color: "#FFFFFF",
    marginTop: 4,
  },
  todayCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  todayCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  deliveriesContainer: {
    flexDirection: "column",
  },
  todayDeliveries: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 18,
  },
  todayDeliveriesSub: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.95)",
    lineHeight: 18,
  },
  trendPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  trendIcon: {
    marginRight: 6,
  },
  trendTextContainer: {
    flexDirection: "column",
  },
  trendText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
    lineHeight: 12,
  },
  // Weekly & Monthly summary row
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  statCard: {
    width: (width - 52) / 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  statAccentBar: {
    width: 4,
    backgroundColor: "#845EF7",
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  statCardContent: {
    padding: 14,
    flex: 1,
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#85859B",
  },
  statAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#10213A",
    marginTop: 6,
  },
  // Available to Withdraw card
  withdrawCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 18,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  withdrawInfo: {
    flex: 1,
  },
  withdrawLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#85859B",
  },
  withdrawAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#845EF7",
    marginTop: 4,
  },
  withdrawBtn: {
    backgroundColor: "#845EF7",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 9,
    shadowColor: "#845EF7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  withdrawBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#FFFFFF",
  },
  // Last 7 days Earnings card
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  chartTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#10213A",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAllText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#845EF7",
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 150,
    paddingTop: 30, // Spacing for tooltip bubble
    paddingHorizontal: 4,
  },
  chartCol: {
    alignItems: "center",
    flex: 1,
  },
  barTrack: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    position: "relative",
  },
  chartBar: {
    width: 12,
    borderRadius: 6,
  },
  chartBarNormal: {
    backgroundColor: "#E2E8F0",
  },
  chartBarActive: {
    backgroundColor: "#1E293B",
  },
  dayLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#85859B",
    marginTop: 8,
  },
  tooltipContainer: {
    position: "absolute",
    bottom: "90%",
    alignItems: "center",
    zIndex: 10,
  },
  tooltipBubble: {
    backgroundColor: "#1E293B",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tooltipText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
  },
  tooltipTriangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "#1E293B",
    marginTop: -1,
  },
  // Earnings Breakdown
  breakdownContainer: {
    marginTop: 24,
  },
  breakdownTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#10213A",
    marginBottom: 12,
  },
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
  breakdownVal: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#10213A",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFEFF4",
  },
  purpleText: {
    color: "#845EF7",
  },
  boldText: {
    fontFamily: "Poppins_700Bold",
  },
  // Recent Transactions
  transactionsSection: {
    marginTop: 28,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#10213A",
  },
  txCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 2,
  },
  txIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#845EF7",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  txDetails: {
    flex: 1,
  },
  txOrder: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#10213A",
  },
  txDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#85859B",
    marginTop: 2,
  },
  txAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#10213A",
  },
  // Inline Withdraw Button (in ScrollView flow)
  inlineWithdrawBtn: {
    borderRadius: 16,
    overflow: "hidden",
    marginTop: 24,
    marginBottom: 10,
    shadowColor: "#845EF7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  stickyBtnGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  walletIcon: {
    marginRight: 8,
  },
  stickyBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
