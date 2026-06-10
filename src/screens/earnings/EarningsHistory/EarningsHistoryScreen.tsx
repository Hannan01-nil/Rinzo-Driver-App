import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import { useEarnings } from "@/hooks";
import { formatCurrency, formatDate, formatTime } from "@/utils";

export function EarningsHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { history } = useEarnings();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Earnings History</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {history.length === 0 ? (
          <Text style={styles.empty}>No earnings history yet</Text>
        ) : (
          history.map((entry) => (
            <View key={entry.id} style={styles.entryRow}>
              <View style={styles.entryLeft}>
                <Text style={styles.entryOrder}>Order {entry.orderNumber}</Text>
                <Text style={styles.entryDate}>
                  {formatDate(entry.createdAt, "long")} at{" "}
                  {formatTime(entry.createdAt)}
                </Text>
              </View>
              <View style={styles.entryRight}>
                <Text
                  style={[
                    styles.entryAmount,
                    entry.type === "bonus" && styles.bonusAmount,
                  ]}
                >
                  {entry.type === "adjustment" ? "-" : "+"}
                  {formatCurrency(entry.amount)}
                </Text>
                <View
                  style={[
                    styles.statusPill,
                    entry.status === "settled" && styles.statusPillSuccess,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      entry.status === "settled" && styles.statusTextSuccess,
                    ]}
                  >
                    {entry.status === "settled" ? "Settled" : "Pending"}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}
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
    backgroundColor: "#FFFFFF",
  },
  headerRight: {
    width: 38,
  },
  headerTitle: {
    flex: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F2A5A",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  empty: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#6F6B7D",
    textAlign: "center",
    marginTop: 48,
  },
  entryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  entryLeft: {
    flex: 1,
    marginRight: 12,
  },
  entryRight: {
    alignItems: "flex-end",
  },
  entryOrder: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#10213A",
  },
  entryDate: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6F6B7D",
    marginTop: 2,
  },
  entryAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#16A34A",
    marginBottom: 4,
  },
  bonusAmount: {
    color: "#FFC107",
  },
  statusPill: {
    backgroundColor: "#FFF3CD",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 999,
  },
  statusPillSuccess: {
    backgroundColor: "#E6F7E6",
  },
  statusText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#856404",
  },
  statusTextSuccess: {
    color: "#16A34A",
  },
});
