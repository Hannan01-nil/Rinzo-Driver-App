import mapImage from "@/assets/images/DriverAppImages/map.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function OrderTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params as { orderId: string };

  useEffect(() => {
    const { redirectToCollect } = (route.params || {}) as {
      redirectToCollect?: boolean;
    };
    if (redirectToCollect) {
      const t = setTimeout(() => {
        const parentNav =
          (navigation as any).getParent && (navigation as any).getParent();
        if (parentNav && typeof parentNav.navigate === "function") {
          parentNav.navigate("orders", {
            screen: "collect-clothes",
            params: { orderId },
          });
        } else {
          // fallback: try direct navigate
          try {
            (navigation as any).navigate("collect-clothes", { orderId });
          } catch (e) {
            // no-op if navigation fails
          }
        }
      }, 200);

      return () => clearTimeout(t);
    }
  }, [route.params]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.mapContainer}>
        <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.title}>Order Tracking</Text>
        <View style={styles.driverRow}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?u=driver_tracking" }}
            style={styles.avatar}
          />
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>Cameron Williamson</Text>
            <Text style={styles.driverRole}>Delivery Man</Text>
          </View>
          <TouchableOpacity style={styles.callButton} activeOpacity={0.7}>
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
              <Text style={styles.trackingLabel}>Pickup</Text>
              <Text style={styles.trackingValue}>
                221b baker street, bangalore - 500001
              </Text>
            </View>
          </View>

          <View style={styles.trackingRow}>
            <View style={styles.iconContainer}>
              <Ionicons name="flag-outline" size={16} color="#8259D2" />
            </View>
            <View style={styles.trackingContent}>
              <Text style={styles.trackingLabel}>Dropoff</Text>
              <Text style={styles.trackingValue}>03:00PM (Max 20 min)</Text>
            </View>
          </View>
        </View>
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
    borderBottomWidth: 0,
  },
  headerRight: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
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
  badge: {
    backgroundColor: "#DDF4E8",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#5D9C74",
  },
  mapContainer: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.62,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  bottomCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginTop: -92,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 6,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginBottom: 14,
  },
  driverRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    marginVertical: 12,
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
    marginBottom: 16,
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
});
