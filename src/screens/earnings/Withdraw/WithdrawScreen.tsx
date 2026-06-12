import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import { useEarnings } from "@/hooks";
import { HeaderBackButton } from "@/components/layout/header-back-button";

type PaymentMethod = "bank" | "upi";

export function WithdrawScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const { summary, requestWithdrawal } = useEarnings();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("bank");
  const [amountText, setAmountText] = useState("2,350");
  const [isLoading, setIsLoading] = useState(false);

  const availableBalance = summary?.availableForWithdrawal ?? 2350;

  const handleWithdraw = async () => {
    // Parse input number
    const parsedAmount = parseFloat(amountText.replace(/,/g, "")) || 0;
    if (parsedAmount <= 0 || parsedAmount > availableBalance) return;

    setIsLoading(true);
    const success = await requestWithdrawal(parsedAmount, "bank_acc_001");
    setIsLoading(false);

    if (success) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">
          Withdraw
        </Text>
        <View style={styles.headerSide} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Available Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹2,350</Text>
        </View>

        {/* Select Withdrawal Method Section */}
        <Text style={styles.sectionHeader}>Select Withdrawal Method</Text>

        {/* Bank Account Method */}
        <TouchableOpacity
          style={[
            styles.methodCard,
            selectedMethod === "bank" ? styles.methodCardSelected : styles.methodCardNormal,
          ]}
          activeOpacity={0.8}
          onPress={() => setSelectedMethod("bank")}
        >
          <View style={styles.methodIconContainer}>
            <MaterialCommunityIcons name="bank-outline" size={22} color="#845EF7" />
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>Bank Account</Text>
            <Text style={styles.methodSubtitle}>XXXX 4321</Text>
          </View>
          <View
            style={[
              styles.radioButton,
              selectedMethod === "bank" ? styles.radioButtonActive : styles.radioButtonInactive,
            ]}
          >
            {selectedMethod === "bank" && <View style={styles.radioButtonDot} />}
          </View>
        </TouchableOpacity>

        {/* UPI Method */}
        <TouchableOpacity
          style={[
            styles.methodCard,
            selectedMethod === "upi" ? styles.methodCardSelected : styles.methodCardNormal,
          ]}
          activeOpacity={0.8}
          onPress={() => setSelectedMethod("upi")}
        >
          <View style={styles.methodIconContainer}>
            <MaterialCommunityIcons name="at" size={22} color="#845EF7" />
          </View>
          <View style={styles.methodDetails}>
            <Text style={styles.methodTitle}>UPI</Text>
            <Text style={styles.methodSubtitle}>rahul@paytm</Text>
          </View>
          <View
            style={[
              styles.radioButton,
              selectedMethod === "upi" ? styles.radioButtonActive : styles.radioButtonInactive,
            ]}
          >
            {selectedMethod === "upi" && <View style={styles.radioButtonDot} />}
          </View>
        </TouchableOpacity>

        {/* Enter Amount Section */}
        <Text style={styles.sectionHeader}>Enter Amount</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.currencyPrefix}>₹</Text>
          <TextInput
            style={styles.textInput}
            value={amountText}
            onChangeText={setAmountText}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#A0AEC0"
          />
        </View>
        <Text style={styles.helperText}>Available Balance: ₹2,350</Text>

        {/* Withdraw Action Button */}
        <TouchableOpacity
          style={styles.withdrawActionBtn}
          activeOpacity={0.9}
          onPress={handleWithdraw}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.withdrawActionBtnText}>Withdraw</Text>
          )}
        </TouchableOpacity>

        {/* Notice Info Row */}
        <View style={styles.noticeRow}>
          <Ionicons name="time-outline" size={18} color="#8E8E9F" style={styles.noticeIcon} />
          <Text style={styles.noticeText}>
            Withdrawal will be transferred within 24 hours
          </Text>
        </View>
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
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: "#FFFFFF",
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#10213A",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 180, // Spacing for bottom tab bar overlay
  },
  // Available Balance Card
  balanceCard: {
    backgroundColor: "#F8F9FE", // Light blue tinted background
    borderRadius: 18,
    padding: 20,
    marginTop: 8,
  },
  balanceLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#8E8E9F",
  },
  balanceAmount: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    color: "#10213A",
    marginTop: 6,
  },
  // Sub-headers
  sectionHeader: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6F6B7D",
    marginTop: 24,
    marginBottom: 12,
  },
  // Selectable Method Cards
  methodCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  methodCardNormal: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
  },
  methodCardSelected: {
    borderWidth: 1.5,
    borderColor: "#845EF7", // Purple selection border
  },
  methodIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3E8FF", // Light purple background
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  methodDetails: {
    flex: 1,
  },
  methodTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#10213A",
  },
  methodSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8E8E9F",
    marginTop: 2,
  },
  // Radio Buttons
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  radioButtonInactive: {
    borderColor: "#CBD5E1",
  },
  radioButtonActive: {
    borderColor: "#2563EB", // Blue radio button border in screenshot
  },
  radioButtonDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#2563EB", // Blue filled dot in screenshot
  },
  // Input Container
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  currencyPrefix: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#10213A",
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#10213A",
    padding: 0,
  },
  helperText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8E8E9F",
    marginTop: 8,
  },
  // Withdraw Button
  withdrawActionBtn: {
    backgroundColor: "#845EF7",
    borderRadius: 16,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
    shadowColor: "#845EF7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  withdrawActionBtnText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  // Notice Info Row
  noticeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
  },
  noticeIcon: {
    marginRight: 6,
  },
  noticeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8E8E9F",
  },
});
