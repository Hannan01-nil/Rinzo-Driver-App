import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

type RootStackParamList = {
  "support/report-submitted": { ticketId?: string };
};

type ReportSubmittedRouteProp = RouteProp<
  RootStackParamList,
  "support/report-submitted"
>;

export function ReportSubmittedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<ReportSubmittedRouteProp>();
  const ticketId = route.params?.ticketId || "#REP-88219-ZV";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Success Icon */}
        <View style={styles.iconOutline}>
          <View style={styles.iconBg}>
            <Ionicons name="checkmark" size={42} color="#FFFFFF" />
          </View>
        </View>

        {/* Title & Description */}
        <Text style={styles.title}>Report Submitted</Text>
        <Text style={styles.description}>
          Thank you for letting us know. Our team is looking into the issue and
          will get back to you shortly if needed.
        </Text>

        {/* Info Cards */}
        <View style={styles.cardsContainer}>
          {/* Estimated Response Card */}
          <View style={styles.infoCard}>
            <Image
              source={require("@/assets/images/submitted_clock.png")}
              style={styles.cardIconImage}
              resizeMode="contain"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>ESTIMATED RESPONSE</Text>
              <Text style={styles.cardValue}>Within 24 hours</Text>
            </View>
          </View>

          {/* Ticket ID Card */}
          <View style={styles.infoCard}>
            <Image
              source={require("@/assets/images/submitted_ticket.png")}
              style={styles.cardIconImage}
              resizeMode="contain"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardLabel}>TICKET ID</Text>
              <Text style={styles.cardValue}>{ticketId}</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.homeButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("profile", { screen: "index" })}
          >
            <Text style={styles.homeButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.historyButton}
            activeOpacity={0.7}
            onPress={() => {
              // Redirect to main support contact page
              navigation.navigate("support/contact");
            }}
          >
            <MaterialCommunityIcons name="history" size={20} color="#8259D2" style={styles.historyIcon} />
            <Text style={styles.historyButtonText}>View Support History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  iconOutline: {
    width: 156,
    height: 156,
    borderRadius: 78,
    backgroundColor: "rgba(130, 89, 210, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(130, 89, 210, 0.05)",
  },
  iconBg: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "#8259D2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#0D1D33",
    textAlign: "center",
    marginBottom: 14,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#5E617A",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 16,
    marginBottom: 40,
  },
  cardsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 48,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF4FF",
    borderWidth: 1,
    borderColor: "#E2E6F2",
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardIconImage: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 11,
    color: "#5E617A",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 15,
    color: "#0D1D33",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#8259D2",
    width: "100%",
    height: 52,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  homeButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  historyIcon: {
    marginRight: 8,
  },
  historyButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#8259D2",
  },
});
