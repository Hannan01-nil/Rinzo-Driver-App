import { useState } from "react";
import {
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Clipboard from "expo-clipboard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import { mockBankAccount } from "@/data/finance";
import SbiLogo from "@/assets/images/DriverAppImages/SBI_logo.png";

const BANK_ILLUSTRATION = require("@/assets/images/DriverAppImages/bank_details_img.png") as number;

export function BankDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);

  const bank = mockBankAccount;
  const maskedNumber = `******${bank.accountNumber.slice(-4)}`;
  const displayNumber = showAccountNumber ? bank.accountNumber : maskedNumber;

  const handleShare = async () => {
    try {
      const shareMessage = `Bank Account Details:\n\nAccount Holder: ${bank.accountHolderName}\nBank Name: ${bank.bankName}\nAccount Number: ${bank.accountNumber}\nIFSC Code: ${bank.ifscCode}\nUPI ID: ${bank.upiId}`;
      await Share.share({
        message: shareMessage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Bank Details</Text>
        <TouchableOpacity
          style={styles.headerSide}
          onPress={handleShare}
          activeOpacity={0.7}
        >
          <Ionicons name="share-social-outline" size={22} color="#4B4458" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerDivider} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.verifiedCard}>
          <View style={styles.verifiedIconCircle}>
            <Ionicons name="checkmark-circle" size={28} color="#8259D2"/>
          </View>
          <View style={styles.verifiedInfo}>
            <Text style={styles.verifiedTitle}>Bank Account Verified</Text>
            <Text style={styles.verifiedSubtitle}>
              Your bank details are verified and active.
            </Text>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>ACCOUNT HOLDER NAME</Text>
          <Text style={styles.detailValue}>{bank.accountHolderName}</Text>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>BANK NAME</Text>
          <View style={[styles.detailRow, { justifyContent: "flex-start" }]}>
            <Image
              source={SbiLogo}
              style={styles.bankLogo}
              resizeMode="contain"
            />
            <Text style={styles.detailValue}>{bank.bankName}</Text>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>ACCOUNT NUMBER</Text>
          <View style={styles.detailRow}>
            <Text style={[styles.detailValue, { letterSpacing: 2 }]}>
              {displayNumber}
            </Text>
            <TouchableOpacity
              onPress={() => setShowAccountNumber(!showAccountNumber)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={showAccountNumber ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>IFSC CODE</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailValue}>{bank.ifscCode}</Text>
            <TouchableOpacity
              onPress={async () => {
                await Clipboard.setStringAsync(bank.ifscCode ?? "");
                setCopiedIfsc(true);
                setTimeout(() => setCopiedIfsc(false), 2000);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.copyText, copiedIfsc && styles.copyTextDone]}>
                {copiedIfsc ? "COPIED" : "COPY"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>UPI ID</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailValue}>{bank.upiId}</Text>
            <Ionicons
              name="checkmark-circle"
              size={16}
              color="#16A34A"
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>

        <View style={styles.illustrationSection}>
          <Image
            source={BANK_ILLUSTRATION}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.updateWrap}
          onPress={() => navigation.navigate("index")}
        >
          <LinearGradient
            colors={["#8259D2", "#8259D2"]}
            style={styles.updateButton}
          >
            <Text style={styles.updateText}>Update Details</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  headerSide: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F2A5A",
    marginLeft: 20,
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 120,
  },
  verifiedCard: {
    backgroundColor: "#EFF4FF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CCC3D5",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  verifiedIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 28,
    backgroundColor: "#7052a61a",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    marginTop: 13,
  },
  verifiedInfo: {
    flex: 1,
    minWidth: 140,
  },
  verifiedTitle: {
    marginTop: 4,  
    fontFamily: "Poppins_400Regular",
    fontSize: 18,
    color: "#000000",
  },
  verifiedSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    marginTop: 2,
  },
  badgePill: {
    backgroundColor: "#F2EBFF",
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 999,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8259D2",
    letterSpacing: 0.3,
  },
  detailCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 16,
  },
  detailLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#8A869A",
    letterSpacing: 1,
    marginBottom: 6,
  },
  detailValue: {
    fontFamily: "Poppins_500Medium",
    fontSize: 18,
    color: "#1F2A5A",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copyText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#8259D2",
    letterSpacing: 0.5,
  },
  copyTextDone: {
    color: "#16A34A",
  },
  bankLogo: {
    width: 24,
    height: 24,
    marginRight: 8,
    marginBottom: 2,
  },
  illustrationSection: {
    marginTop: 8,
    alignItems: "center",
  },
  illustration: {
    width: "100%",
    height: 200,
    borderRadius: 28,
  },
  updateWrap: {
    marginTop: 28,
  },
  updateButton: {
    height: 60,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  updateText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
});
