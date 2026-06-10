import { useState } from "react";
import {
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
  {
    id: "5",
    order: "Order #1238",
    date: "22 Apr, 9:00 AM",
    amount: 80,
    status: "Delivered",
  },
];

export function EarningsDashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("Month");
  const [monthIndex, setMonthIndex] = useState(0);
  const [yearIndex, setYearIndex] = useState(0);

  const currentPeriod = selectedPeriod;

  return (
    <SafeAreaView style={styles.safe}>
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
            <Ionicons name="chevron-back" size={20} color="#8259D2" />
          </TouchableOpacity>
          <Text style={styles.monthText}>April 2024</Text>
          <TouchableOpacity
            style={styles.navArrow}
            activeOpacity={0.7}
            onPress={() => setMonthIndex((p) => p + 1)}
          >
            <Ionicons name="chevron-forward" size={20} color="#8259D2" />
          </TouchableOpacity>
        </View>

        <View style={styles.earningsSection}>
          <Text style={styles.earningsLabel}>TOTAL EARNINGS</Text>
          <Text style={styles.earningsAmount}>₹{TOTAL_EARNINGS.toLocaleString("en-IN")}</Text>
          <View style={styles.growthPill}>
            <Ionicons name="trending-up" size={14} color="#16A34A" />
            <Text style={styles.growthText}>+12% vs Mar 2024</Text>
          </View>
        </View>

        <View style={styles.transactionCard}>
          <View style={styles.transactionHeader}>
            <Text style={styles.transactionTitle}>Transaction History</Text>
            <Text style={styles.transactionCount}>{TRANSACTIONS.length} Transactions</Text>
          </View>
          <View style={styles.transactionDivider} />

          {TRANSACTIONS.map((tx, index) => (
            <TouchableOpacity
              key={tx.id}
              style={[
                styles.transactionRow,
                index < TRANSACTIONS.length - 1 && styles.transactionRowBorder,
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.txIconWrap}>
                <Ionicons name="wallet-outline" size={18} color="#8259D2" />
              </View>
              <View style={styles.txInfo}>
                <Text style={styles.txOrder}>{tx.order}</Text>
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={styles.txAmount}>+₹{tx.amount}</Text>
                <Text style={styles.txStatus}>{tx.status}</Text>
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.transactionDivider} />
          <TouchableOpacity
            style={styles.viewAllRow}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("earnings-history")}
          >
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  segmentedControl: {
    flexDirection: "row",
    height: 48,
    backgroundColor: "#EFE7FF",
    borderRadius: 18,
    padding: 4,
  },
  segmentTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentTextActive: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  segmentTextInactive: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#6F6B7D",
  },
  monthNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 16,
  },
  navArrow: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFE7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  monthText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#10213A",
    minWidth: 160,
    textAlign: "center",
  },
  earningsSection: {
    alignItems: "center",
    marginTop: 28,
  },
  earningsLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#6F6B7D",
    letterSpacing: 1.2,
  },
  earningsAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 56,
    color: "#10213A",
    marginTop: 4,
  },
  growthPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F7E6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginTop: 10,
    gap: 4,
  },
  growthText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#16A34A",
  },
  transactionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    marginTop: 28,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  transactionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  transactionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#10213A",
  },
  transactionCount: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6F6B7D",
  },
  transactionDivider: {
    height: 1,
    backgroundColor: "#F0F0F0",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  transactionRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  txIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#EFE7FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  txInfo: {
    flex: 1,
  },
  txOrder: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#10213A",
  },
  txDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6F6B7D",
    marginTop: 1,
  },
  txRight: {
    alignItems: "flex-end",
  },
  txAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#16A34A",
  },
  txStatus: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6F6B7D",
    marginTop: 1,
  },
  viewAllRow: {
    alignItems: "center",
    paddingVertical: 14,
  },
  viewAllText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#10213A",
  },
  bonusBanner: {
    marginTop: 24,
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 24,
    shadowColor: "#8259D2",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  bonusTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  bonusDesc: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    lineHeight: 22,
    marginTop: 6,
  },
  bonusBtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignSelf: "flex-start",
    marginTop: 16,
  },
  bonusBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#8259D2",
  },
});
