import { CustomKeypad } from "@/components/common/CustomKeypad";
import { OTP_LENGTH } from "@/constants/config";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeInUp,
  SlideInUp,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import orderTickImage from "@/assets/images/DriverAppImages/order_tick.png";
import Svg, { Path } from "react-native-svg";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OTP_WIDTH = 56;
const OTP_HEIGHT = 68;
const OTP_GAP = 12;

export function LaundryOtpVerificationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const orderId = (route.params as any)?.orderId ?? "#DRV-8821";
  const customerName =
    (route.params as any)?.customerName ?? "Rahul Sharma";
  const status =
    (route.params as any)?.status ?? "At Doorstep";

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [keypadVisible, setKeypadVisible] = useState(false);

  const verifyScale = useSharedValue(1);

  const verifyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: verifyScale.value }],
  }));

  const isComplete =
    otp.every((d) => d !== "") && otp.length === OTP_LENGTH;

  const handleKeyPress = (digit: string) => {
    setOtp((prev) => {
      const next = [...prev];
      const emptyIndex = next.findIndex((d) => d === "");
      if (emptyIndex !== -1) {
        next[emptyIndex] = digit;
      }
      
      const isNowComplete = next.every((d) => d !== "");
      if (isNowComplete) {
        setKeypadVisible(false);
      }
      
      return next;
    });
  };

  const handleDelete = () => {
    setOtp((prev) => {
      const next = [...prev];
      const lastFilledIndex = prev
        .map((d, i) => (d !== "" ? i : -1))
        .filter((i) => i !== -1)
        .pop();
      if (lastFilledIndex !== undefined) {
        next[lastFilledIndex] = "";
      }
      return next;
    });
  };

  const handleVerify = () => {
    if (!isComplete) return;
    (navigation as any).navigate("order-at-laundry", { orderId });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
      <Animated.View
        entering={FadeInUp.delay(100).duration(400)}
        style={styles.header}
      >
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </Animated.View>

      <View style={styles.topSection}>
        <Animated.View
          entering={FadeInUp.delay(200).duration(500).springify()}
          style={styles.iconCircle}
        >
          <MaterialCommunityIcons name="truck" size={42} color="#FFFFFF" />
        </Animated.View>

        <Animated.Text
          entering={FadeInUp.delay(300).duration(400).springify()}
          style={styles.title}
        >
          Enter OTP
        </Animated.Text>

        <Animated.Text
          entering={FadeInUp.delay(400).duration(400).springify()}
          style={styles.description}
        >
          Please ask the customer for the 4-digit verification code sent to their phone.
        </Animated.Text>

        <Animated.View
          entering={FadeInUp.delay(500).duration(400).springify()}
          style={styles.otpRow}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, index) => {
            const filled = otp[index] !== "";
            return (
              <TouchableOpacity
                key={`otp-${index}`}
                style={[
                  styles.otpBox,
                  filled && styles.otpBoxFilled,
                ]}
                onPress={() => setKeypadVisible(true)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.otpDigit,
                    filled && styles.otpDigitFilled,
                  ]}
                >
                  {filled ? otp[index] : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(600).duration(400).springify()}
          style={styles.countdownRow}
        >
          <Ionicons name="time-outline" size={14} color="#8E8E93" />
          <Text style={styles.countdownText}>Resend code in 29 s</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(700).duration(400).springify()}
          style={styles.orderCard}
        >
          <View style={styles.bagIconContainer}>
            <Image
              source={orderTickImage}
              style={styles.orderCardImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.orderLabelText}>ORDER {orderId}</Text>
            <Text
              style={styles.customerName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {customerName}
            </Text>
          </View>

          <View style={styles.statusContainer}>
            <Text style={styles.statusLabelText}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{status}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(800).duration(400).springify()}
          style={styles.verifyWrapper}
        >
          <Animated.View style={verifyAnimatedStyle}>
            <TouchableOpacity
              style={[
                styles.verifyButton,
                !isComplete && styles.verifyButtonDisabled,
              ]}
              activeOpacity={0.95}
              onPressIn={() => {
                verifyScale.value = withSpring(0.97, {
                  damping: 15,
                  stiffness: 200,
                });
              }}
              onPressOut={() => {
                verifyScale.value = withSpring(1, {
                  damping: 10,
                  stiffness: 150,
                });
              }}
              onPress={handleVerify}
              disabled={!isComplete}
            >
              <Text style={styles.verifyText}>
                Verify & Complete Delivery
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>

      {keypadVisible && (
        <Animated.View
          entering={SlideInUp.duration(280).easing(Easing.out(Easing.cubic))}
        >
          <CustomKeypad onPress={handleKeyPress} onDelete={handleDelete} />
        </Animated.View>
      )}
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
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: "#FAFAFA",
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
  topSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingBottom: 8,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#8259D2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#8259D2",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 24,
    color: "#1F1F1F",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 8,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: OTP_GAP,
    marginBottom: 14,
  },
  otpBox: {
    width: OTP_WIDTH,
    height: OTP_HEIGHT,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#EAEAEA",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  otpBoxFilled: {
    borderColor: "#8259D2",
    backgroundColor: "#F8F5FF",
  },
  otpDigit: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1F1F1F",
    textAlign: "center",
  },
  otpDigitFilled: {
    color: "#8259D2",
  },
  countdownRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginBottom: 20,
  },
  countdownText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#8E8E93",
  },
  orderCard: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  bagIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  orderCardImage: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  orderInfo: {
    flex: 1,
    marginLeft: 14,
    justifyContent: "center",
  },
  orderLabelText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  customerName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F1F1F",
  },
  statusContainer: {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  statusLabelText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#8E8E93",
    marginBottom: 4,
  },
  statusBadge: {
    backgroundColor: "#8259D2",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#FFFFFF",
  },
  verifyWrapper: {
    width: "100%",
    marginTop: 10,
  },
  verifyButton: {
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
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
