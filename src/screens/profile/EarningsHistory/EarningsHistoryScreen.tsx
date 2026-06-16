import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";


import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale, moderateScale } from "@/utils/responsive";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import OrderIcon from "@/assets/images/DriverAppImages/order_icon.png";
import EarningsCardBg from "@/assets/images/earnings_history_card_bg.png";

type Period = "Week" | "Month" | "Year";

const PERIODS: Period[] = ["Week", "Month", "Year"];

const WEEK_INITIAL_TRANSACTIONS = [
  {
    id: "w1",
    order: "Order #1234",
    date: "Today, 10:30 AM",
    amount: 50,
    status: "Delivered",
  },
  {
    id: "w2",
    order: "Order #1235",
    date: "Yesterday, 11:00 AM",
    amount: 75,
    status: "Delivered",
  },
];

const WEEK_EXTRA_TRANSACTIONS = [
  {
    id: "w3",
    order: "Order #1236",
    date: "14 Apr, 2:15 PM",
    amount: 60,
    status: "Delivered",
  },
  {
    id: "w4",
    order: "Order #1237",
    date: "13 Apr, 4:45 PM",
    amount: 45,
    status: "Delivered",
  },
];

const MONTH_INITIAL_TRANSACTIONS = [
  {
    id: "m1",
    order: "Order #1234",
    date: "24 Apr, 10:30 AM",
    amount: 50,
    status: "Delivered",
  },
  {
    id: "m2",
    order: "Order #1235",
    date: "24 Apr, 11:00 AM",
    amount: 75,
    status: "Delivered",
  },
  {
    id: "m3",
    order: "Order #1236",
    date: "23 Apr, 2:15 PM",
    amount: 60,
    status: "Delivered",
  },
  {
    id: "m4",
    order: "Order #1237",
    date: "23 Apr, 4:45 PM",
    amount: 45,
    status: "Delivered",
  },
];

const MONTH_EXTRA_TRANSACTIONS = [
  {
    id: "m5",
    order: "Order #1238",
    date: "22 Apr, 9:15 AM",
    amount: 55,
    status: "Delivered",
  },
  {
    id: "m6",
    order: "Order #1239",
    date: "22 Apr, 1:30 PM",
    amount: 80,
    status: "Delivered",
  },
  {
    id: "m7",
    order: "Order #1240",
    date: "21 Apr, 11:45 AM",
    amount: 40,
    status: "Delivered",
  },
  {
    id: "m8",
    order: "Order #1241",
    date: "21 Apr, 3:00 PM",
    amount: 65,
    status: "Delivered",
  },
  {
    id: "m9",
    order: "Order #1242",
    date: "20 Apr, 10:00 AM",
    amount: 70,
    status: "Delivered",
  },
  {
    id: "m10",
    order: "Order #1243",
    date: "20 Apr, 5:30 PM",
    amount: 50,
    status: "Delivered",
  },
];

const YEAR_INITIAL_TRANSACTIONS = [
  {
    id: "y1",
    order: "Order #1234",
    date: "24 Apr, 10:30 AM",
    amount: 50,
    status: "Delivered",
  },
  {
    id: "y2",
    order: "Order #1102",
    date: "15 Mar, 11:00 AM",
    amount: 90,
    status: "Delivered",
  },
  {
    id: "y3",
    order: "Order #1045",
    date: "22 Feb, 2:15 PM",
    amount: 120,
    status: "Delivered",
  },
  {
    id: "y4",
    order: "Order #0981",
    date: "10 Jan, 4:45 PM",
    amount: 85,
    status: "Delivered",
  },
];

const YEAR_EXTRA_TRANSACTIONS = [
  {
    id: "y5",
    order: "Order #0920",
    date: "20 Dec 2023, 9:15 AM",
    amount: 110,
    status: "Delivered",
  },
  {
    id: "y6",
    order: "Order #0845",
    date: "05 Nov 2023, 1:30 PM",
    amount: 95,
    status: "Delivered",
  },
  {
    id: "y7",
    order: "Order #0762",
    date: "18 Oct 2023, 11:45 AM",
    amount: 130,
    status: "Delivered",
  },
];

const PERIOD_DETAILS = {
  Week: {
    navText: "14 Apr - 20 Apr 2024",
    total: 1250,
    growthText: "+8% vs Last Week",
    initialTx: WEEK_INITIAL_TRANSACTIONS,
    extraTx: WEEK_EXTRA_TRANSACTIONS,
  },
  Month: {
    navText: "April 2024",
    total: 15800,
    growthText: "+12% vs Mar 2024",
    initialTx: MONTH_INITIAL_TRANSACTIONS,
    extraTx: MONTH_EXTRA_TRANSACTIONS,
  },
  Year: {
    navText: "Year 2024",
    total: 195000,
    growthText: "+15% vs Year 2023",
    initialTx: YEAR_INITIAL_TRANSACTIONS,
    extraTx: YEAR_EXTRA_TRANSACTIONS,
  },
};

export function EarningsHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Month");
  const [monthIndex, setMonthIndex] = useState(0);
  const [hasLoadedAll, setHasLoadedAll] = useState(false);

  const activeDetails = PERIOD_DETAILS[selectedPeriod];

  const handlePeriodChange = (period: Period) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSelectedPeriod(period);
    setHasLoadedAll(false);
  };

  const handleViewAll = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setHasLoadedAll((prev) => !prev);
  };

  const currentTransactions = hasLoadedAll
    ? [...activeDetails.initialTx, ...activeDetails.extraTx]
    : activeDetails.initialTx;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Earnings History</Text>
        <View style={styles.headerRight} />
      </View>
      <View style={styles.headerDivider} />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.segmentedControl}>
          {PERIODS.map((period) => {
            const isActive = period === selectedPeriod;
            return (
              <TouchableOpacity
                key={period}
                style={styles.segmentTab}
                activeOpacity={0.8}
                onPress={() => handlePeriodChange(period)}
              >
                {isActive ? (
                  <LinearGradient
                    colors={["#8259D2", "#8259D2"]}
                    style={styles.segmentGradient}
                  >
                    <Text style={styles.segmentTextActive}>{period}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.segmentTextInactive}>{period}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.monthNav}>
          <TouchableOpacity
            style={styles.navArrow}
            activeOpacity={0.7}
            onPress={() => setMonthIndex((p) => p - 1)}
          >
            <Ionicons name="chevron-back" size={16} color="#783fec" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{activeDetails.navText}</Text>
          <TouchableOpacity
            style={styles.navArrow}
            activeOpacity={0.7}
            onPress={() => setMonthIndex((p) => p + 1)}
          >
            <Ionicons name="chevron-forward" size={16} color="#783fec" />
          </TouchableOpacity>
        </View>

        <View style={styles.earningsSection}>
          <Text style={styles.earningsLabel}>TOTAL EARNINGS</Text>
          <Text style={styles.earningsAmount}>
            ₹{activeDetails.total.toLocaleString("en-IN")}
          </Text>
          <View style={styles.growthPill}>
            <Ionicons name="trending-up" size={12} color="#16A34A" />
            <Text style={styles.growthText}>{activeDetails.growthText}</Text>
          </View>
        </View>

        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction History</Text>
            <Text style={styles.transactionCount}>
              {currentTransactions.length} Transactions
            </Text>
          </View>
          <View style={styles.titleDivider} />

          {currentTransactions.map((tx) => (
            <View key={tx.id} style={styles.transactionRow}>
              <View style={styles.txIconWrap}>
                <Image
                  source={OrderIcon}
                  style={styles.txIcon}
                />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txOrder}>{tx.order}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={styles.txAmount}>+₹{tx.amount}</Text>
                <Text style={styles.txStatus}>{tx.status}</Text>
              </View>
            </View>
          ))}

          <View style={styles.viewDivider} />
          <TouchableOpacity
            style={styles.viewAllRow}
            activeOpacity={0.7}
            onPress={handleViewAll}
          >
            <Text style={styles.viewAllText}>
              {hasLoadedAll ? "Show Less" : "View All Transactions"}
            </Text>
          </TouchableOpacity>
        </View>

        <ImageBackground
          source={EarningsCardBg}
          style={styles.bonusBanner}
          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(130, 89, 210, 0.95)", "rgba(106, 68, 184, 0.6)", "rgba(106, 68, 184, 0.05)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <View>
            <Text style={styles.bonusTitle}>Weekly Bonus Active</Text>
            <Text style={styles.bonusDesc}>
              Complete 10 more deliveries to unlock ₹500 extra.
            </Text>
            <TouchableOpacity style={styles.bonusBtn} activeOpacity={0.8}>
              <Text style={styles.bonusBtnText}>Track Bonus</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
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
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(48),
    paddingHorizontal: scale(16),
    backgroundColor: "#F8F9FF",
  },
  headerRight: {
    width: scale(38),
  },
  headerTitle: {
    flex: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(18),
    color: "#1F2A5A",
    textAlign: "center",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(120),
  },
  segmentedControl: {
    flexDirection: "row",
    height: verticalScale(36),
    backgroundColor: "#EDE4FF",
    borderRadius: moderateScale(10),
    padding: scale(3),
  },
  segmentTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentGradient: {
    width: "100%",
    height: "100%",
    borderRadius: moderateScale(11),
    alignItems: "center",
    justifyContent: "center",
  },
  segmentTextActive: {
    fontFamily: "Poppins_500Medium",
    fontSize: moderateScale(13),
    color: "#FFFFFF",
  },
  segmentTextInactive: {
    fontFamily: "Poppins_500Medium",
    fontSize: moderateScale(13),
    color: "#6F6B7D",
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(26),
  },
  navArrow: {
    width: scale(36),
    height: scale(36),
    borderRadius: scale(18),
    backgroundColor: "#EDE4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(18),
    color: "#0F1E37",
    minWidth: scale(140),
    textAlign: "center",
    lineHeight: moderateScale(24),
  },
  earningsSection: {
    alignItems: "center",
    marginTop: verticalScale(16),
  },
  earningsLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: moderateScale(11),
    color: "#6F6B7D",
    letterSpacing: 2,
    marginBottom: verticalScale(2),
  },
  earningsAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: moderateScale(36),
    color: "#0F1E37",
  },
  growthPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7E6",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(5),
    borderRadius: moderateScale(14),
    gap: scale(4),
    height: verticalScale(28),
    marginTop: verticalScale(2),
  },
  growthText: {
    fontFamily: "Poppins_500Medium",
    fontSize: moderateScale(12),
    color: "#0b913c",
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(8),
    marginTop: verticalScale(16),
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: moderateScale(8),
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    paddingVertical: verticalScale(16),
    paddingHorizontal: scale(16),
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    marginTop: verticalScale(4),
  },
  transactionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(16),
    color: "#0F1E37",
  },
  transactionCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(12),
    color: "#6F6B7D",
  },
  titleDivider: {
    height: 1,
    backgroundColor: "#bdb9d2",
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4),
    marginLeft: scale(-16),
    marginRight: scale(-16),
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: verticalScale(14),
  },
  txIconWrap: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(16),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(16),
    marginLeft: scale(-2),
  },
  txIcon: {
    width: scale(40),
    height: scale(40),
    resizeMode: "contain",
    borderRadius: scale(12),
    marginLeft: scale(12),
  },
  txInfo: {
    flex: 1,
    flexDirection: "column",
  },
  txOrder: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(16),
    color: "#0F1E37",
  },
  txDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(12),
    color: "#6F6B7D",
    marginTop: verticalScale(-4),
  },
  txRight: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(16),
    color: "#000000",
  },
  txStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(12),
    color: "#6F6B7D",
    marginTop: verticalScale(-4),
  },
  viewAllRow: {
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(48),
  },
  viewDivider: {
    height: 1,
    backgroundColor: "#bdb9d2",
    marginTop: verticalScale(4),
    marginBottom: verticalScale(4),
    marginLeft: scale(-16),
    marginRight: scale(-16),
  },
  viewAllText: {
    fontFamily: "Poppins_500Medium",
    fontSize: moderateScale(16),
    color: "#000000",
    marginTop: verticalScale(12),
  },
  bonusBanner: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(20),
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(20),
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: moderateScale(8),
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    overflow: "hidden",
  },
  bonusTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(20),
    color: "#FFFFFF",
  },
  bonusDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: moderateScale(13),
    color: "rgba(255,255,255,0.9)",
    lineHeight: moderateScale(20),
    marginTop: verticalScale(6),
    marginRight: moderateScale(40),
  },
  bonusBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(10),
    height: verticalScale(40),
    paddingHorizontal: scale(20),
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: verticalScale(14),
  },
  bonusBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: moderateScale(13),
    color: "#8259D2",
  },
});
