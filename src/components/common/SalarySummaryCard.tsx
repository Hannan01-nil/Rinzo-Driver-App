import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInUp } from "react-native-reanimated";

interface SalarySummaryCardProps {
  month: string;
  label: string;
  value: string;
  paymentStatus: string;
  iconName: string;
  height?: number;
}

export function SalarySummaryCard({
  month,
  label,
  value,
  paymentStatus,
  iconName,
  height,
}: SalarySummaryCardProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(400)}
      style={[styles.salaryCard, height ? { height } : null]}
    >
      <LinearGradient
        colors={["#6F4BFF", "#8D6EFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Curved visual patterns in background */}
        <View style={styles.circleOverlay} />
        <View style={styles.circleOverlayInner} />

        <View style={styles.salaryCardContent}>
          <View style={styles.mainRow}>
            <View style={styles.salaryHeaderLeft}>
              <Text style={styles.salaryCardMonth}>{month}</Text>
              <Text style={styles.salaryCardLabel}>{label}</Text>
              <Text style={styles.salaryCardValue}>{value}</Text>
            </View>
            <View style={styles.topRightIconContainer}>
              <Ionicons name={iconName as any} size={24} color="#FFFFFF" />
            </View>
          </View>

          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{paymentStatus}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  salaryCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#6F4BFF",
  },
  gradient: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  circleOverlay: {
    position: "absolute",
    right: -40,
    top: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
  circleOverlayInner: {
    position: "absolute",
    right: 10,
    top: 0,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
  },
  salaryCardContent: {
    justifyContent: "space-between",
    zIndex: 2,
  },
  mainRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salaryHeaderLeft: {
    flexDirection: "column",
    flex: 1,
  },
  salaryCardMonth: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.75)",
    lineHeight: 14,
  },
  salaryCardLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 3,
    lineHeight: 16,
  },
  salaryCardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 36,
    color: "#FFFFFF",
    lineHeight: 40,
    marginTop: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 28,
    alignSelf: "flex-start",
    marginTop: 16,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#34C759",
    marginRight: 6,
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#FFFFFF",
    lineHeight: 14,
  },
  topRightIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
  },
});
