import { CustomKeypad } from "@/components/common/CustomKeypad";
import { OTP_LENGTH } from "@/constants/config";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
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
  SlideInUp,
  Easing,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const OTP_BOX_SIZE = Math.min(56, (SCREEN_WIDTH - 80) / 4.5);
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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </Animated.View>

      <View style={styles.topSection}>
        <Animated.View
          entering={FadeInUp.delay(200).duration(500).springify()}
          style={styles.iconCircle}
        >
          <Ionicons name="car-outline" size={36} color="#FFFFFF" />
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
          Please ask the laundry staff for the 4-digit verification code
          sent for order handover confirmation.
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
          <Ionicons name="shirt-outline" size={28} color="#8259D2" />
          <View style={styles.orderInfo}>
            <Text
              style={styles.customerName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {customerName}
            </Text>
            <Text style={styles.orderIdText}>{orderId}</Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{status}</Text>
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
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8259D2",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1F1F1F",
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#8E8E93",
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: OTP_GAP,
    marginBottom: 14,
  },
  otpBox: {
    width: OTP_BOX_SIZE,
    height: OTP_BOX_SIZE + 6,
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
    fontSize: 20,
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
    marginBottom: 16,
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
    padding: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
    marginHorizontal: 10,
  },
  customerName: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1F1F1F",
  },
  orderIdText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#8E8E93",
  },
  statusBadge: {
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  statusText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#E67E22",
  },
  verifyWrapper: {
    width: "100%",
  },
  verifyButton: {
    height: 48,
    backgroundColor: "#8259D2",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
