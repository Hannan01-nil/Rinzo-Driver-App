import mapImage from "@/assets/images/DriverAppImages/map.png";
import laundryHubImage from "@/assets/images/DriverAppImages/laundry_hub.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function LaundryTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = (route.params || {}) as { orderId: string };

  const handleTransitNavigate = () => {
    (navigation as any).navigate("order-in-transit", { orderId });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">{orderId ?? "Laundry Tracking"}</Text>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapContainer}>
          <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
        </View>

        <View style={styles.bottomCard}>
          <Text style={styles.title}>Laundry Tracking</Text>
          <View style={styles.driverRow}>
            <Image
              source={laundryHubImage}
              style={styles.avatar}
            />
            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Rinzo Laundry Hub</Text>
              <Text style={styles.driverRole}>Laundry Partner</Text>
            </View>
            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.7}
              onPress={handleTransitNavigate}
            >
              <Ionicons name="call-outline" size={20} color="#8259D2" />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.timelineSection}>
            <View style={styles.timelineLine} />

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="location-outline" size={16} color="#8259D2" />
              </View>
              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>Pickup Location (Completed)</Text>
                <Text style={styles.trackingValue}>
                  Clothes collected from customer
                </Text>
              </View>
            </View>

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="flag-outline" size={16} color="#8259D2" />
              </View>
              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>Laundry Dropoff</Text>
                <Text style={styles.trackingValue}>Rinzo Hub, Koramangala (ETA: 20 min)</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.reachedButton}
          activeOpacity={0.75}
          onPress={handleTransitNavigate}
        >
          <Text style={styles.reachedButtonText}>Start Transit to Laundry</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    height: 56,
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    textAlign: "center",
  },
  mapContainer: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.58,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  bottomCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 180,
    marginTop: -92,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 6,
  },
  buttonContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 110,
    backgroundColor: "transparent",
    zIndex: 999,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginBottom: 8,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  driverInfo: {
    flex: 1,
    justifyContent: "center",
  },
  driverName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F1F1F",
    lineHeight: 22,
    marginBottom: 2,
  },
  driverRole: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 16,
  },
  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F7F3FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F1F1",
    marginVertical: 6,
  },
  timelineSection: {
    position: "relative",
  },
  timelineLine: {
    position: "absolute",
    left: 20,
    top: 30,
    width: 2,
    height: 40,
    backgroundColor: "#EAEAEA",
  },
  trackingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  trackingContent: {
    flex: 1,
    marginLeft: 16,
  },
  trackingLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#8E8E93",
    marginBottom: 4,
  },
  trackingValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1F1F1F",
    lineHeight: 20,
  },
  reachedButton: {
    height: 48,
    backgroundColor: "#8259D2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  reachedButtonText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
