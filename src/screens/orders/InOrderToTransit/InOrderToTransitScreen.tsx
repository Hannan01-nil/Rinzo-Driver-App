import mapImage from "@/assets/images/DriverAppImages/map.png";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export function InOrderToTransitScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const orderId = (route.params as any)?.orderId ?? "#129348393";
  const distance =
    (route.params as any)?.distance ?? "2.8 km away";
  const eta = (route.params as any)?.eta ?? "20 mins";
  const fromHomeTrack = (route.params as any)?.fromHomeTrack;

  const reachedScale = useSharedValue(1);
  const helpScale = useSharedValue(1);

  const reachedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: reachedScale.value }],
  }));

  const helpStyle = useAnimatedStyle(() => ({
    transform: [{ scale: helpScale.value }],
  }));

  const handleReached = () => {
    (navigation as any).navigate("laundry-otp", { orderId });
  };

  const handleCall = () => {
    Linking.openURL("tel:+919999999999");
  };

  const handleHelp = () => {};

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            if (fromHomeTrack) {
              const parentNav = navigation.getParent && navigation.getParent();
              if (parentNav && typeof parentNav.navigate === "function") {
                parentNav.navigate("home", {
                  screen: "order-tracking",
                  params: { orderId },
                });
              } else {
                navigation.navigate("order-tracking" as any, { orderId } as any);
              }
            } else {
              navigation.goBack();
            }
          }}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="arrow-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} pointerEvents="none">{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(400)}
        style={styles.mapContainer}
      >
        <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
      </Animated.View>

      <View style={styles.bottomCard}>
        <View style={styles.cardInner}>
          

          <Animated.View
            entering={FadeInUp.delay(500).duration(400).springify()}
            style={styles.laundryCard}
          >
            <View style={styles.laundryRow}>
              <View style={styles.laundryLeft}>
                <Text style={styles.laundryLine1}>Laundry Hub</Text>
                <Text style={styles.laundryLine2}>{distance}</Text>
                <Text style={styles.laundryLine3}>ETA: {eta}</Text>
              </View>
              <Ionicons name="pencil-outline" size={24} color="#1F1F1F" />
            </View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(600).duration(400).springify()}
          >
            <TouchableOpacity
              style={styles.callRow}
              onPress={handleCall}
              activeOpacity={0.7}
            >
              <Ionicons name="call-outline" size={18} color="#8259D2" />
              <Text style={styles.callText}>Call Laundry</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(700).duration(400).springify()}
          >
            <Animated.View style={reachedStyle}>
              <TouchableOpacity
                style={styles.reachedButton}
                activeOpacity={0.95}
                onPressIn={() => {
                  reachedScale.value = withSpring(0.97, {
                    damping: 15,
                    stiffness: 200,
                  });
                }}
                onPressOut={() => {
                  reachedScale.value = withSpring(1, {
                    damping: 10,
                    stiffness: 150,
                  });
                }}
                onPress={handleReached}
              >
                <Text style={styles.reachedText}>Reached Laundry</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(800).duration(400).springify()}
          >
            <Animated.View style={helpStyle}>
              <TouchableOpacity
                style={styles.helpButton}
                activeOpacity={0.95}
                onPressIn={() => {
                  helpScale.value = withSpring(0.97, {
                    damping: 15,
                    stiffness: 200,
                  });
                }}
                onPressOut={() => {
                  helpScale.value = withSpring(1, {
                    damping: 10,
                    stiffness: 150,
                  });
                }}
                onPress={handleHelp}
              >
                <Text style={styles.helpText}>Need Help?</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 48,
  },
  headerSide: {
    width: 32,
    height: 32,
    justifyContent: "center",
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
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#5D9C74",
  },
  mapContainer: {
    width: "100%",
    height: SCREEN_HEIGHT * 0.48,
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
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 6,
  },
  cardInner: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 18,
    marginBottom: 8,
  },
  laundryCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    marginBottom: 8,
  },
  laundryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  laundryLeft: {
    flex: 1,
    marginRight: 16,
  },
  laundryLine1: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F1F1F",
    marginBottom: 2,
  },
  laundryLine2: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#1F1F1F",
  },
  laundryLine3: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#777777",
  },
  callRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
    gap: 8,
  },
  callText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#8259D2",
  },
  reachedButton: {
    height: 48,
    backgroundColor: "#8259D2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  reachedText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#FFFFFF",
  },
  helpButton: {
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#8259D2",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
  },
  helpText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#8259D2",
  },
});
