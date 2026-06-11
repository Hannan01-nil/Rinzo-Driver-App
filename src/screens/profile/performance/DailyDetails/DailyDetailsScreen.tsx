import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { mockDailyDetails } from "@/data/dailyDetails";
import { HeaderBackButton } from "@/components/layout/header-back-button";

export function DailyDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { date } = route.params as { date: string };

  // Use the mockDailyDetails. Fall back to it if data is missing or doesn't match date.
  const data = mockDailyDetails;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Daily Details</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="bell-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Earnings Card */}
        <LinearGradient
          colors={["#8B5CF6", "#7C4DFF"]}
          style={styles.earningsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.earningsTopRow}>
            <View>
              <Text style={styles.earningsLabel}>Total Earnings</Text>
              <View style={styles.earningsAmountRow}>
                <Text style={styles.earningsAmount}>₹{data.totalEarnings}</Text>
                <Text style={styles.todayText}>Today</Text>
              </View>
            </View>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.earningsBottomRow}>
            <View style={styles.statCol}>
              <Text style={styles.statColLabel}>Base Pay</Text>
              <Text style={styles.statColValue}>₹{data.basePay}</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statColLabel}>Tips</Text>
              <Text style={styles.statColValue}>₹{data.tips}</Text>
            </View>
            <View style={styles.statCol}>
              <Text style={styles.statColLabel}>Incentives</Text>
              <Text style={styles.statColValue}>₹{data.incentives}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Cards Row */}
        <View style={styles.statsRow}>
          {/* Avg Delivery Card */}
          <View style={styles.statsCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons
                name="timer-outline"
                size={16}
                color="#8B5CF6"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.cardLabel}>Avg. Delivery</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardValue}>{data.avgDeliveryTime}</Text>
              <View style={styles.statusRow}>
                <Ionicons
                  name="trending-down"
                  size={12}
                  color="#16A34A"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statusText} numberOfLines={1}>
                  {data.avgDeliveryStatus}
                </Text>
              </View>
            </View>
          </View>

          {/* Idle Time Card */}
          <View style={styles.statsCard}>
            <View style={styles.cardHeaderRow}>
              <Ionicons
                name="pause-circle-outline"
                size={16}
                color="#8B5CF6"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.cardLabel}>Idle Time</Text>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardValue}>{data.idleTime}</Text>
              <View style={styles.statusRow}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={12}
                  color="#16A34A"
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.statusText} numberOfLines={1}>
                  {data.idleStatus}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Order Log</Text>
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.viewReceiptText}>View Receipt</Text>
          </TouchableOpacity>
        </View>

        {/* Order Timeline */}
        <View style={styles.timelineContainer}>
          {/* Continuous Vertical Timeline Line */}
          <View style={styles.timelineLine} />

          {data.orders.map((order, index) => (
            <View
              key={order.id || index}
              style={[
                styles.timelineItemRow,
                index === data.orders.length - 1 && { marginBottom: 0 },
              ]}
            >
              {/* Node Column */}
              <View style={styles.timelineNodeContainer}>
                <View style={styles.timelineNode}>
                  <MaterialCommunityIcons
                    name="truck"
                    size={20}
                    color="#8B5CF6"
                  />
                </View>
              </View>

              {/* Order Card */}
              <View style={styles.orderCard}>
                <View style={styles.orderCardHeader}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <Text style={styles.orderNumber}>Order {order.orderNumber}</Text>
                    <Text style={styles.restaurantName} numberOfLines={1}>
                      {order.restaurant} • {order.itemsCount} {order.itemsCount === 1 ? "item" : "items"}
                    </Text>
                  </View>
                  <Text style={styles.orderAmount}>₹{order.amount}</Text>
                </View>

                <View style={styles.cardInnerDivider} />

                <View style={styles.timeRow}>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>PICKUP</Text>
                    <Text style={styles.timeValue}>{order.pickupTime}</Text>
                  </View>
                  <View style={styles.timeCol}>
                    <Text style={styles.timeLabel}>DROP-OFF</Text>
                    <Text style={styles.timeValue}>{order.dropoffTime}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Achievement Card */}
        <View style={styles.achievementCard}>
          <Image
            source={require("@/assets/images/sparkles.png")}
            style={styles.achievementIcon}
            resizeMode="contain"
          />
          <View style={styles.achievementTextContainer}>
            <Text style={styles.achievementTitle}>{data.achievementTitle}</Text>
            <Text style={styles.achievementSubtitle} numberOfLines={2}>
              {data.achievementSubtitle}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#F8F7FC",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAF3",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#111827",
  },
  notificationButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  earningsCard: {
    height: 180,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 24,
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  earningsTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  earningsLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
  },
  earningsAmountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 2,
  },
  earningsAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 56,
    lineHeight: 60,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  todayText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.75)",
    marginLeft: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.20)",
    marginVertical: 10,
  },
  earningsBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statCol: {
    flex: 1,
    alignItems: "center",
  },
  statColLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.75)",
    marginBottom: 2,
    textAlign: "center",
  },
  statColValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    height: 120,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#ECEAF3",
    padding: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#8B5CF6",
  },
  cardBody: {
    justifyContent: "flex-end",
  },
  cardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#111827",
    lineHeight: 28,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  statusText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#111827",
  },
  viewReceiptText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#8B5CF6",
  },
  timelineContainer: {
    position: "relative",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  timelineLine: {
    position: "absolute",
    left: 27,
    top: 22,
    bottom: 102,
    width: 2,
    backgroundColor: "#E5E7EB",
    zIndex: 1,
  },
  timelineItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timelineNodeContainer: {
    width: 56,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  rowLine: {
    position: "absolute",
    left: 27,
    top: 22,
    width: 2,
    height: 144, // Stretches exactly to the center of the next node (128px card height + 16px space)
    backgroundColor: "#E5E7EB",
    zIndex: 1,
  },
  timelineNode: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  orderCard: {
    flex: 1,
    height: 128,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ECEAF3",
    padding: 12,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  orderCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#111827",
    marginBottom: 2,
  },
  restaurantName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
  },
  orderAmount: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#8B5CF6",
    textAlign: "right",
  },
  cardInnerDivider: {
    height: 1,
    backgroundColor: "#F1F2F6",
    marginVertical: 6,
  },
  timeRow: {
    flexDirection: "row",
    gap: 32,
  },
  timeCol: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#9CA3AF",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  timeValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#111827",
  },
  achievementCard: {
    height: 90,
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
  },
  achievementTextContainer: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#111827",
    marginBottom: 2,
  },
  achievementSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
});
