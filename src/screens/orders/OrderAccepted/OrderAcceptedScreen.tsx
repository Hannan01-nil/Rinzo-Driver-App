import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";
// SVG used for success tick
import Svg, { Path as SvgPath } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(SvgPath);

type HomeStackParamList = {
  index: undefined;
  "order-accepted": {
    orderId: string;
    flowType?: string;
    status?: string;
  };
  "order-tracking": {
    orderId: string;
    flowType?: string;
    status?: string;
  };
  "laundry-tracking": {
    orderId: string;
    flowType?: string;
    status?: string;
  };
};

type OrderAcceptedRouteProp = RouteProp<HomeStackParamList, "order-accepted">;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const CONFETTI_CONFIG = [
  { angle: 0, distance: 86, color: "#FF6B6B" },
  { angle: 45, distance: 74, color: "#FFD93D" },
  { angle: 90, distance: 86, color: "#6BCB77" },
  { angle: 135, distance: 74, color: "#4D96FF" },
  { angle: 180, distance: 86, color: "#FF8C00" },
  { angle: 225, distance: 74, color: "#9B59B6" },
  { angle: 270, distance: 86, color: "#1ABC9C" },
  { angle: 315, distance: 74, color: "#E74C3C" },
];

export function OrderAcceptedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const route = useRoute<OrderAcceptedRouteProp>();
  const { orderId, flowType = 'customer_pickup', status = 'pickup' } = route.params;

  const ringsOpacity = useRef(new Animated.Value(0)).current;
  const outerScale = useRef(new Animated.Value(0.7)).current;
  const innerScale = useRef(new Animated.Value(0.8)).current;
  const circleScale = useRef(new Animated.Value(0.6)).current;
  const checkmarkOffset = useRef(new Animated.Value(80)).current;
  const confettiOpacity = useRef(new Animated.Value(0)).current;
  const confettiValues = useRef(
    CONFETTI_CONFIG.map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
    })),
  ).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.timing(ringsOpacity, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(outerScale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(100),
        Animated.spring(innerScale, {
          toValue: 1,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(200),
        Animated.spring(circleScale, {
          toValue: 1,
          friction: 5,
          tension: 50,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.delay(350),
        Animated.timing(checkmarkOffset, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.delay(450),
        Animated.parallel([
          Animated.timing(confettiOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.parallel(
            CONFETTI_CONFIG.map((config, i) =>
              Animated.parallel([
                Animated.spring(confettiValues[i].x, {
                  toValue:
                    Math.cos((config.angle * Math.PI) / 180) * config.distance,
                  friction: 6,
                  useNativeDriver: true,
                }),
                Animated.spring(confettiValues[i].y, {
                  toValue:
                    Math.sin((config.angle * Math.PI) / 180) * config.distance,
                  friction: 6,
                  useNativeDriver: true,
                }),
                Animated.sequence([
                  Animated.timing(confettiValues[i].opacity, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                  }),
                  Animated.delay(500),
                  Animated.timing(confettiValues[i].opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                  }),
                ]),
              ]),
            ),
          ),
        ]),
      ]),
    ]);

    animation.start();
  }, []);

  // Dynamic styling for status badge
  const badgeStyles = {
    pickup: { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' },
    delivery: { bg: '#EFF6FF', text: '#1D4ED8', label: 'Delivery' },
    rerouting: { bg: '#FEF3C7', text: '#D97706', label: 'Rerouting' },
  }[status] || { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' };

  // Dynamic content based on flowType
  const flowContent = {
    customer_pickup: {
      title: 'Pickup Accepted!',
      subtitle: 'You have accepted the customer pickup request successfully',
      timeLabel: 'Pickup Time',
    },
    franchise_delivery: {
      title: 'Delivery Accepted!',
      subtitle: 'You have accepted the franchise delivery request successfully',
      timeLabel: 'Delivery Time',
    },
    franchise_delivery_transit: {
      title: 'Clothes Collected!',
      subtitle: 'You have collected the washed clothes from the laundry successfully',
      timeLabel: 'Delivery Time',
    },
    reroute_to_service: {
      title: 'Reroute Accepted!',
      subtitle: 'You have accepted the premium service reroute request successfully',
      timeLabel: 'Transfer Time',
    },
    service_return: {
      title: 'Return Accepted!',
      subtitle: 'You have accepted the franchise return request successfully',
      timeLabel: 'Return Time',
    },
  }[flowType] || {
    title: 'Order Accepted!',
    subtitle: 'You have accepted the pickup request successfully',
    timeLabel: 'Pickup Time',
  };

  // Dynamic button label and navigation target based on flowType
  const buttonConfig = {
    customer_pickup: {
      text: "Track Order",
      route: "order-tracking",
    },
    franchise_delivery: {
      text: "Track Laundry",
      route: "laundry-tracking",
    },
    franchise_delivery_transit: {
      text: "Track Delivery",
      route: "order-tracking",
    },
    reroute_to_service: {
      text: "Track Order",
      route: "order-tracking",
    },
    service_return: {
      text: "Track Laundry",
      route: "laundry-tracking",
    },
  }[flowType] || {
    text: "Track Order",
    route: "order-tracking",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">
          {orderId}
        </Text>
        <View style={[styles.badge, { backgroundColor: badgeStyles.bg }]}>
          <Text style={[styles.badgeText, { color: badgeStyles.text }]}>{badgeStyles.label}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.mainGroup}>
          <View style={styles.animationSection}>
            <View style={styles.animationContainer}>
              <Animated.View
                style={[
                  styles.outerRing,
                  {
                    opacity: ringsOpacity,
                    transform: [{ scale: outerScale }],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.innerRing,
                  {
                    opacity: ringsOpacity,
                    transform: [{ scale: innerScale }],
                  },
                ]}
              />

              {CONFETTI_CONFIG.map((config, i) => (
                <Animated.View
                  key={i}
                  style={[
                    styles.confettiPiece,
                    {
                      backgroundColor: config.color,
                      opacity: Animated.multiply(
                        confettiOpacity,
                        confettiValues[i].opacity,
                      ),
                      transform: [
                        { translateX: confettiValues[i].x },
                        { translateY: confettiValues[i].y },
                      ],
                    },
                  ]}
                />
              ))}

              <Animated.View
                style={[
                  styles.successCircle,
                  { transform: [{ scale: circleScale }] },
                ]}
              >
                <Svg
                  width={110}
                  height={110}
                  viewBox="0 0 120 120"
                  style={{ alignSelf: "center" }}
                >
                  <AnimatedPath
                    d="M 35 55 L 50 70 L 85 35"
                    stroke="#FFFFFF"
                    strokeWidth={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    strokeDasharray={80}
                    strokeDashoffset={checkmarkOffset as any}
                  />
                </Svg>
              </Animated.View>
            </View>

            <Text style={styles.successTitle}>{flowContent.title}</Text>
            <Text style={styles.successSubtitle}>
              {flowContent.subtitle}
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardRow}>
              <Text style={styles.cardLabel}>Order ID</Text>
              <Text style={styles.cardValue}>{orderId}</Text>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.pickupRow}>
              <Text style={styles.cardLabel}>{flowContent.timeLabel}</Text>
              <Text style={styles.pickupValue}>Tomorrow, 2:00PM - 4:00PM</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => {
            try {
              (navigation as any).navigate(buttonConfig.route, { orderId, flowType, status });
            } catch (e) {
              const parentNav =
                (navigation as any).getParent && (navigation as any).getParent();
              if (parentNav && typeof parentNav.navigate === "function") {
                parentNav.navigate("home", {
                  screen: buttonConfig.route,
                  params: { orderId, flowType, status },
                });
              }
            }
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.trackButtonText}>{buttonConfig.text}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#FAFAFA",
    borderBottomWidth: 0,
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
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#5D9C74",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 110,
    justifyContent: "space-between",
  },
  mainGroup: {
    flex: 1,
    justifyContent: "flex-start",
  },
  animationSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    width: 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    marginTop: 20,
  },
  outerRing: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 12,
    borderColor: "#F2F2F6",
    backgroundColor: "#FFFFFF",
  },
  innerRing: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderColor: "#FFFFFF",
    backgroundColor: "#F7F5FF",
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#8259D2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  confettiPiece: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  successTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 12,
  },
  successSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#8E8E93",
    textAlign: "center",
    maxWidth: "85%",
    marginTop: 4,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  cardLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#8E8E93",
  },
  cardValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#1F1F1F",
  },
  pickupRow: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingVertical: 6,
  },
  pickupValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#1F1F1F",
    marginTop: 4,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F1F1F1",
    marginVertical: 10,
  },
  trackButton: {
    width: "100%",
    alignSelf: "center",
    height: 52,
    backgroundColor: "#8259D2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  trackButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
