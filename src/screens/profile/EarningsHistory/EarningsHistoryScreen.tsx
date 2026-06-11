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
import { HeaderBackButton } from "@/components/layout/header-back-button";

type Period = "Week" | "Month" | "Year";

const PERIODS: Period[] = ["Week", "Month", "Year"];
const TOTAL_EARNINGS = 15800;

const TRANSACTIONS = [
  {
    id: "1",
    order: "Order #1234",
    date: "24 Apr, 10:30 AM",
    amount: 50,
    status: "Delivered",
  },
  {
    id: "2",
    order: "Order #1235",
    date: "24 Apr, 11:00 AM",
    amount: 75,
    status: "Delivered",
  },
  {
    id: "3",
    order: "Order #1236",
    date: "23 Apr, 2:15 PM",
    amount: 60,
    status: "Delivered",
  },
  {
    id: "4",
    order: "Order #1237",
    date: "23 Apr, 4:45 PM",
    amount: 45,
    status: "Delivered",
  },
];

export function EarningsHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Month");
  const [monthIndex, setMonthIndex] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.navigate("profile")} />
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
                onPress={() => setSelectedPeriod(period)}
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
          <Text style={styles.monthText}>April 2024</Text>
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
            ₹{TOTAL_EARNINGS.toLocaleString("en-IN")}
          </Text>
          <View style={styles.growthPill}>
            <Ionicons name="trending-up" size={12} color="#16A34A" />
            <Text style={styles.growthText}>+12% vs Mar 2024</Text>
          </View>
        </View>

        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction History</Text>
            <Text style={styles.transactionCount}>
              {TRANSACTIONS.length} Transactions
            </Text>
          </View>
          <View style={styles.titleDivider} />

          {TRANSACTIONS.map((tx) => (
            <View key={tx.id} style={styles.transactionRow}>
              <View style={styles.txIconWrap}>
                <Image
                  source={require("@/assets/images/DriverAppImages/order_icon.png")}
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
          <TouchableOpacity style={styles.viewAllRow} activeOpacity={0.7}>
            <Text style={styles.viewAllText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={["#8259D2", "#6A44B8"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bonusBanner}
        >
          <Text style={styles.bonusTitle}>Weekly Bonus Active</Text>
          <Text style={styles.bonusDesc}>
            Complete 10 more deliveries{"\n"}to unlock ₹500 extra.
          </Text>
          <TouchableOpacity style={styles.bonusBtn} activeOpacity={0.8}>
            <Text style={styles.bonusBtnText}>Track Bonus</Text>
          </TouchableOpacity>
        </LinearGradient>
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
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FF",
  },
  headerRight: {
    width: 38,
  },
  headerTitle: {
    flex: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  segmentedControl: {
    flexDirection: "row",
    height: 36,
    backgroundColor: "#EDE4FF",
    borderRadius: 10,
    padding: 3,
  },
  segmentTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentTextActive: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FFFFFF",
  },
  segmentTextInactive: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6F6B7D",
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
    gap: 93,
    marginRight: 20,
  },
  navArrow: {
    width: 22,
    height: 28,
    borderRadius: 17,
    backgroundColor: "#EDE4FF",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#0F1E37",
    minWidth: 140,
    textAlign: "center",
    lineHeight: 28,
  },
  earningsSection: {
    alignItems: "center",
    marginTop: 16,
  },
  earningsLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#6F6B7D",
    letterSpacing: 2,
    marginBottom: 2,
  },
  earningsAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 44,
    color: "#0F1E37",
  },
  growthPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7E6",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 4,
    height: 28,
    marginTop: 2,
  },
  growthText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#0b913c",
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginTop: 16,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 4,
  },
  transactionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#0F1E37",
  },
  transactionCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6F6B7D",
  },
  titleDivider: {
    width: 370,
    height: 1,
    backgroundColor: "#bdb9d2",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: -16,
    marginRight: -16,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
  },
  txIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginLeft: -2,
  },
  txIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
    borderRadius: 12,
    marginLeft: 12,
  },
  txInfo: {
    flex: 1,
    flexDirection: "column",
  },
  txOrder: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 21,
    color: "#0F1E37",
  },
  txDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6F6B7D",
    marginTop: -7,
  },
  txRight: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 21,
    color: "#000000",
  },
  txStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6F6B7D",
    marginTop: -7,
  },
  viewAllRow: {
    alignItems: "center",
    justifyContent: "center",
    height: 56,
  },
  viewDivider: {
    width: 370,
    height: 1,
    backgroundColor: "#bdb9d2",
    marginTop: 4,
    marginBottom: 4,
    marginLeft: -16,
    marginRight: -16,
  },
  viewAllText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 21,
    color: "#000000",
    marginTop: 16,
  },
  bonusBanner: {
    marginTop: 16,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  bonusTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#FFFFFF",
  },
  bonusDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 22,
    marginTop: 6,
  },
  bonusBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    marginTop: 14,
  },
  bonusBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#8259D2",
  },
});
