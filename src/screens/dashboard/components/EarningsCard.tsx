import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export function EarningsCard() {
  return (
    <LinearGradient
      colors={["#8259D2", "#5A34A6"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>Today's Summary</Text>
        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons name="package-variant-closed" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Pickups</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons name="truck-delivery-outline" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <View style={styles.iconBg}>
            <MaterialCommunityIcons name="clipboard-text-outline" size={18} color="#FFFFFF" />
          </View>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>

      <View style={styles.subBar}>
        <View style={styles.subBarItem}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.subBarText}>4.9 Rating</Text>
        </View>
        <View style={styles.subBarDivider} />
        <View style={styles.subBarItem}>
          <Ionicons name="time" size={14} color="#A7F3D0" />
          <Text style={styles.subBarText}>4.5h Active</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 20,
    marginTop: 20,
    overflow: "hidden",
    shadowColor: "#8259D2",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 18,
    marginBottom: 8,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
    marginRight: 4,
  },
  liveText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 18,
    paddingTop: 4,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  statNumber: {
    fontFamily: "Poppins_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
  },
  statLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#EBE3FC",
    marginTop: 1,
  },
  divider: {
    width: 1,
    height: 48,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    alignSelf: "flex-end",
    marginBottom: 10,
  },
  subBar: {
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.12)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  subBarItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  subBarText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft: 6,
  },
  subBarDivider: {
    width: 1,
    height: 14,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
