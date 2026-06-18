import { StyleSheet, Text, View } from "react-native";

export function EarningsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Summary</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Pickups</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#8259D2",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 20,
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 12,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#FFFFFF",
  },
  statLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
});
