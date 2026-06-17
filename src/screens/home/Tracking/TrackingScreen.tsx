import mapImage from "@/assets/images/DriverAppImages/map.png";
import { Ionicons } from "@expo/vector-icons";
import {
  CommonActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect } from "react";
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

export function OrderTrackingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId, fromCollected, flowType = 'customer_pickup', status = 'pickup' } = (route.params || {}) as {
    orderId: string;
    fromCollected?: boolean;
    flowType?: 'customer_pickup' | 'franchise_delivery' | 'reroute_to_service' | 'service_return';
    status?: 'pickup' | 'delivery' | 'rerouting';
  };

  useEffect(() => {
    const { redirectToCollect } = (route.params || {}) as {
      redirectToCollect?: boolean;
    };
    if (redirectToCollect) {
      const t = setTimeout(() => {
        try {
          (navigation as any).navigate("collect-clothes", {
            orderId,
            fromScreen: "order-tracking",
            flowType,
            status,
          });
        } catch (e) {
          const parentNav =
            (navigation as any).getParent && (navigation as any).getParent();
          if (parentNav && typeof parentNav.navigate === "function") {
            parentNav.navigate("orders", {
              screen: "collect-clothes",
              params: { orderId, fromScreen: "order-tracking", flowType, status },
            });
          }
        }
      }, 200);

      return () => clearTimeout(t);
    }
  }, [route.params]);

  // Dynamic timeline content and button text based on flowType
  const trackingConfig = {
    customer_pickup: {
      loc1Label: "Customer Location (Pickup)",
      loc1Value: "221b baker street, Bangalore",
      loc2Label: "Franchise Dropoff",
      loc2Value: "Franchise Hub - Drop clothes for washing",
      buttonText: "Reached Pickup Point",
    },
    franchise_delivery: {
      loc1Label: "Franchise Hub (Pickup)",
      loc1Value: "Franchise Hub - Pick washed clothes",
      loc2Label: "Customer Location (Dropoff)",
      loc2Value: "15, Koramangala, Bangalore",
      buttonText: "Reached Customer Location",
    },
    franchise_delivery_transit: {
      loc1Label: "Laundry Hub (Completed)",
      loc1Value: "Washed clothes picked up",
      loc2Label: "Customer Location (Delivery)",
      loc2Value: "15, Koramangala, Bangalore",
      buttonText: "Reached Customer Location",
    },
    reroute_to_service: {
      loc1Label: "Franchise Hub (Pickup)",
      loc1Value: "Franchise Hub - Pick clothes to reroute",
      loc2Label: "Premium Service Hub (Dropoff)",
      loc2Value: "Premium Service Hub - Koramangala",
      buttonText: "Reached Franchise Hub",
    },
    service_return: {
      loc1Label: "Premium Service Hub (Pickup)",
      loc1Value: "Premium Service Hub - Pick washed clothes",
      loc2Label: "Franchise Hub (Dropoff)",
      loc2Value: "Franchise Hub - Drop for final inspection",
      buttonText: "Reached Franchise Location",
    },
  }[flowType] || {
    loc1Label: "Pickup",
    loc1Value: "221b baker street, bangalore - 500001",
    loc2Label: "Dropoff",
    loc2Value: "03:00PM (Max 20 min)",
    buttonText: "Reached Pickup Point",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton
            onPress={() => {
              if (fromCollected) {
                try {
                  (navigation as any).navigate("order-collected-success", { orderId, flowType, status });
                } catch (e) {
                  const parentNav =
                    (navigation as any).getParent &&
                    (navigation as any).getParent();
                  if (parentNav && typeof parentNav.navigate === "function") {
                    parentNav.navigate("orders", {
                      screen: "order-collected-success",
                      params: { orderId, flowType, status },
                    });
                  }
                }
                return;
              }
              try {
                navigation.dispatch(
                  CommonActions.navigate({
                    name: "(tabs)",
                    params: { screen: "home", params: { screen: "index" } },
                  }) as any,
                );
              } catch (e) {
                const parentNav =
                  (navigation as any).getParent &&
                  (navigation as any).getParent();
                if (parentNav && typeof parentNav.navigate === "function") {
                  parentNav.navigate("home", { screen: "index" });
                }
              }
            }}
          />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">{orderId}</Text>
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
            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.7}
              onPress={() => {
                try {
                  (navigation as any).navigate("order-in-transit", {
                    orderId,
                    fromHomeTrack: true,
                    flowType,
                    status,
                  });
                } catch (e) {
                  const parentNav =
                    (navigation as any).getParent &&
                    (navigation as any).getParent();
                  if (parentNav && typeof parentNav.navigate === "function") {
                    parentNav.navigate("orders", {
                      screen: "order-in-transit",
                      params: { orderId, fromHomeTrack: true, flowType, status },
                    });
                  }
                }
              }}
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
                <Text style={styles.trackingLabel}>{trackingConfig.loc1Label}</Text>
                <Text style={styles.trackingValue}>
                  {trackingConfig.loc1Value}
                </Text>
              </View>
            </View>

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons name="flag-outline" size={16} color="#8259D2" />
              </View>
              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>{trackingConfig.loc2Label}</Text>
                <Text style={styles.trackingValue}>{trackingConfig.loc2Value}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.reachedButton}
          activeOpacity={0.7}
          onPress={() => {
            try {
              (navigation as any).navigate("collect-clothes", {
                orderId,
                fromScreen: "order-tracking",
                flowType,
                status,
              });
            } catch (e) {
              const parentNav = (navigation as any).getParent?.();
              if (parentNav && typeof parentNav.navigate === "function") {
                parentNav.navigate("orders", {
                  screen: "collect-clothes",
                  params: { orderId, fromScreen: "order-tracking", flowType, status },
                });
              }
            }
          }}
        >
          <Text style={styles.reachedButtonText}>{trackingConfig.buttonText}</Text>
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