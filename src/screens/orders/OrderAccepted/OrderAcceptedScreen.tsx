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
// SVG used for success tick
import Svg, { Path as SvgPath } from "react-native-svg";

const AnimatedPath = Animated.createAnimatedComponent(SvgPath);

type HomeStackParamList = {
  index: undefined;
  "new-pickup-request": undefined;
  "order-accepted": { orderId: string };
  "order-tracking": { orderId: string };
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
  const { orderId } = route.params;

  const ringsOpacity = useRef(new Animated.Value(0)).current;
  const outerScale = useRef(new Animated.Value(0.7)).current;
  const innerScale = useRef(new Animated.Value(0.8)).current;
  const circleScale = useRef(new Animated.Value(0.6)).current;
  const checkmarkOffset = useRef(new Animated.Value(90)).current;
  const confettiOpacity = useRef(new Animated.Value(0)).current;
  const confettiValues = useRef(
    CONFETTI_CONFIG.map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
    })),
  ).current;

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(ringsOpacity, {
        toValue: 0.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.spring(outerScale, {
          toValue: 1,
          friction: 6,
          tension: 80,
          useNativeDriver: true,
        }),
        Animated.spring(innerScale, {
          toValue: 1,
          friction: 6,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(circleScale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: true,
      }),
      Animated.timing(checkmarkOffset, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }),
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
    ]);

    animation.start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate("new-pickup-request")}
          style={styles.headerSide}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} pointerEvents="none">
          {orderId}
        </Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[styles.animationSection, { minHeight: SCREEN_HEIGHT * 0.35 }]}
        >
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
                width={120}
                height={120}
                viewBox="0 0 120 110"
                style={{ alignSelf: "center" }}
              >
                <AnimatedPath
                  d="M 30 55 L 48 73 L 90 30"
                  stroke="#FFFFFF"
                  strokeWidth={12}
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  fill="none"
                  strokeDasharray={120}
                  strokeDashoffset={checkmarkOffset as any}
                />
              </Svg>
            </Animated.View>
          </View>

          <Text style={styles.successTitle}>Order Accepted!</Text>
          <Text style={styles.successSubtitle}>
            You have accepted the pickup request successfully
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Order ID</Text>
            <Text style={styles.cardValue}>{orderId}</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.pickupRow}>
            <Text style={styles.cardLabel}>Pickup Time</Text>
            <Text style={styles.pickupValue}>Tomorrow, 2:00PM - 4:00PM</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => {
            const parentNav =
              (navigation as any).getParent && (navigation as any).getParent();
            if (parentNav && typeof parentNav.navigate === "function") {
              parentNav.navigate("home", {
                screen: "order-tracking",
                params: { orderId },
              });
            } else {
              navigation.navigate("order-tracking", { orderId });
            }
          }}
          activeOpacity={0.7}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  animationSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  animationContainer: {
    width: 260,
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    marginTop: 36,
  },
  outerRing: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 12,
    borderColor: "#F2F2F6",
    backgroundColor: "#FFFFFF",
  },
  innerRing: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 8,
    borderColor: "#FFFFFF",
    backgroundColor: "#F7F5FF",
  },
  successCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#8259D2",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  confettiPiece: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  successTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 16,
  },
  successSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    maxWidth: "80%",
    marginTop: 12,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    marginTop: 52,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  cardLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
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
    paddingVertical: 4,
  },
  pickupValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#1F1F1F",
    marginTop: 2,
  },
  cardDivider: {
    height: 2,
    backgroundColor: "#F1F1F1",
    marginVertical: 8,
  },
  trackButton: {
    width: "100%",
    alignSelf: "center",
    height: 48,
    backgroundColor: "#8259D2",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
  },
  trackButtonText: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 16,
  },
  bottomSpacer: {
    height: 24,
  },
});
