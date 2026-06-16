import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

export function PrivacySettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Premium Shield/Padlock Visual */}
        <View style={styles.visualContainer}>
          <View style={styles.glowOuterCircle}>
            <View style={styles.glowInnerCircle}>
              <Ionicons name="shield-checkmark" size={48} color="#8259D2" />
            </View>
          </View>
          <Text style={styles.visualTitle}>Your Privacy, Secured</Text>
          <Text style={styles.visualSubtitle}>
            We are polishing our new policy terms to be transparent. Your data security remains our highest commitment.
          </Text>
        </View>

        {/* Status Banner */}
        <View style={styles.statusBanner}>
          <Ionicons name="hourglass-outline" size={16} color="#8259D2" style={{ marginRight: 8 }} />
          <Text style={styles.statusBannerText}>Status: Finalizing Terms (Coming Soon)</Text>
        </View>

        {/* Card 1: Data Encryption */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="lock-closed-outline" size={20} color="#8259D2" />
            <Text style={styles.cardTitle}>Data Encryption</Text>
          </View>
          <Text style={styles.cardText}>
            Your personal details are stored with end-to-end encryption. Nobody can access your sensitive information.
          </Text>
        </View>

        {/* Card 2: Location Transparency */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color="#8259D2" />
            <Text style={styles.cardTitle}>Location Transparency</Text>
          </View>
          <Text style={styles.cardText}>
            We only access location data during active delivery runs to coordinate seamless order handoffs.
          </Text>
        </View>

        {/* Card 3: Payment Integrity */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={20} color="#8259D2" />
            <Text style={styles.cardTitle}>Payment Integrity</Text>
          </View>
          <Text style={styles.cardText}>
            All payment details are processed through secure PCI-compliant partners. Your bank details are never stored on our servers.
          </Text>
        </View>

        {/* Custom Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorDot} />
          <View style={styles.separatorLine} />
        </View>

        {/* Bottom Acknowledge Text */}
        <Text style={styles.acknowledgeText}>
          We will notify you immediately once the new privacy document is officially published.
        </Text>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.gotItButton}
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.gotItButtonText}>Got It</Text>
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
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAF3",
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#111827",
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  visualContainer: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  glowOuterCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#F4F6FD",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E9F9",
    marginBottom: 16,
  },
  glowInnerCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  visualTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  visualSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4F6FD",
    borderWidth: 1,
    borderColor: "#E5E9F9",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
  statusBannerText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#8259D2",
  },
  softCard: {
    backgroundColor: "#F4F6FD",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#8259D2",
    marginLeft: 10,
  },
  cardText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginLeft: 30,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  separatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8259D2",
    marginHorizontal: 16,
  },
  acknowledgeText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  gotItButton: {
    height: 54,
    backgroundColor: "#8259D2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  gotItButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
