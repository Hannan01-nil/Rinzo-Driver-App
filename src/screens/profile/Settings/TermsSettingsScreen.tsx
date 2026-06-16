import {
  Alert,
  Image,
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

export function TermsSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleAccept = () => {
    Alert.alert(
      "Terms and Conditions",
      "Thank you for accepting our Terms and Conditions.",
      [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

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
        <Text style={styles.headerTitle}>Terms and conditions</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Last Updated Date */}
        <Text style={styles.lastUpdated}>Last Updated: October 24, 2023</Text>

        {/* Intro Paragraph */}
        <Text style={styles.introText}>
          Welcome to LaundroWise. These Terms & Conditions govern your use of
          our laundry and dry-cleaning services. By using our platform, you
          agree to be bound by the following policies. Please read them
          carefully.
        </Text>

        {/* Card 1: User Obligations */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Image
              source={require("@/assets/images/terms_shield.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>User Obligations</Text>
          </View>
          <Text style={styles.cardText}>
            Users must provide accurate pickup locations and disclose any
            specific fabric care requirements for delicate items. Failure to label
            sensitive items correctly may void liability claims.
          </Text>
        </View>

        {/* Card 2: Service Availability */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Image
              source={require("@/assets/images/terms_clock.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>Service Availability</Text>
          </View>
          <Text style={styles.cardText}>
            LaundroWise operates within designated geographical zones. Pickup and
            delivery times are estimates and may be affected by traffic or
            inclement weather.
          </Text>
        </View>

        {/* Card 3: Liability */}
        <View style={styles.softCard}>
          <View style={styles.cardHeader}>
            <Image
              source={require("@/assets/images/terms_gavel.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <Text style={styles.cardTitle}>Liability</Text>
          </View>
          <Text style={styles.cardText}>
            While we take utmost care, LaundroWise is not responsible for
            pre-existing damage, color bleeding in non-colorfast fabrics, or loss
            of items left in pockets.
          </Text>
        </View>

        {/* Section 1: Account Registration */}
        <View style={styles.accentSection}>
          <View style={styles.accentLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.accentTitle}>1. Account Registration</Text>
            <Text style={styles.accentText}>
              To access our services, you must register for an account using a
              valid email address and phone number. You are responsible for
              maintaining the confidentiality of your credentials.
            </Text>
          </View>
        </View>

        {/* Section 2: Payment and Refunds */}
        <View style={styles.accentSection}>
          <View style={styles.accentLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.accentTitle}>2. Payment and Refunds</Text>
            <Text style={styles.accentText}>
              Payments are processed via our secure integrated wallet or linked
              credit cards. Refunds for unsatisfactory service are evaluated on a
              case-by-case basis and credited to the user's wallet.
            </Text>
          </View>
        </View>

        {/* Section 3: Privacy Policy */}
        <View style={styles.accentSection}>
          <View style={styles.accentLine} />
          <View style={{ flex: 1 }}>
            <Text style={styles.accentTitle}>3. Privacy Policy</Text>
            <Text style={styles.accentText}>
              Your personal data is handled in accordance with our Privacy Policy.
              We do not sell user data to third parties; it is used solely to
              facilitate the logistics of your service requests.
            </Text>
          </View>
        </View>

        {/* Custom Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <View style={styles.separatorDot} />
          <View style={styles.separatorLine} />
        </View>

        {/* Bottom Acknowledge Text */}
        <Text style={styles.acknowledgeText}>
          By continuing to use the app, you acknowledge that you have read and
          understood these terms.
        </Text>

        {/* Accept Button */}
        <TouchableOpacity
          style={styles.acceptButton}
          activeOpacity={0.8}
          onPress={handleAccept}
        >
          <Text style={styles.acceptButtonText}>I Understand and Accept</Text>
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
  lastUpdated: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#797878",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  introText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  softCard: {
    backgroundColor: "#F4F6FD",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    height: 180,
    width: 368,
    alignSelf: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -2,
  },
  cardIcon: {
    width: 20,
    height: 20,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#8259D2",
    marginLeft: 10,
  },
  cardText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 22,
    marginLeft: 30, 
    marginRight: 30,// Align text body to left edge matching the mockup exactly
  },
  accentSection: {
    flexDirection: "row",
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  accentLine: {
    width: 3,
    backgroundColor: "#8259D2",
    borderRadius: 1.5,
    marginRight: 16,
  },
  accentTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#8259D2",
    marginBottom: 6,
  },
  accentText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13.5,
    color: "#4B5563",
    lineHeight: 20,
    marginRight: 20,
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 32,
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
    marginBottom: 20,
  },
  acceptButton: {
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
  acceptButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
