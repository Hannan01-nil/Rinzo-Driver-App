import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "@/components/layout/header-back-button";

export function ContactSupportScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleLiveChat = () => {
    Linking.openURL("https://rinzo.com/chat").catch(() => {});
  };

  const handleCallSupport = () => {
    Linking.openURL("tel:+9118001234567").catch(() => {});
  };

  const handleEmailSupport = () => {
    Linking.openURL("mailto:support@aura.com").catch(() => {});
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Contact Support</Text>
        </View>

        <TouchableOpacity style={styles.notificationButton} activeOpacity={0.7}>
          <MaterialCommunityIcons name="bell-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Illustration */}
        <View style={styles.illustrationContainer}>
          <Image
            source={require("@/assets/images/support_illustration.png")}
            style={styles.illustrationImage}
            resizeMode="contain"
          />
          <Text style={styles.helpTitle}>We are here to help</Text>
          <Text style={styles.helpSubtitle}>Choose a support option</Text>
        </View>

        {/* Support Options List */}
        <View style={styles.optionsContainer}>
          {/* Live Chat Card */}
          <TouchableOpacity
            style={styles.supportCard}
            activeOpacity={0.7}
            onPress={handleLiveChat}
          >
            <Image
              source={require("@/assets/images/support_chat.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Live Chat</Text>
              <Text style={styles.cardSubtitle}>Chat with our support team</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#C7C7CC"
            />
          </TouchableOpacity>

          {/* Call Support Card */}
          <TouchableOpacity
            style={styles.supportCard}
            activeOpacity={0.7}
            onPress={handleCallSupport}
          >
            <Image
              source={require("@/assets/images/support_call.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Call Support</Text>
              <Text style={styles.cardSubtitle}>Talk to our support executive</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#C7C7CC"
            />
          </TouchableOpacity>

          {/* Email Support Card */}
          <TouchableOpacity
            style={styles.supportCard}
            activeOpacity={0.7}
            onPress={handleEmailSupport}
          >
            <Image
              source={require("@/assets/images/support_email.png")}
              style={styles.cardIcon}
              resizeMode="contain"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>Email Support</Text>
              <Text style={styles.cardSubtitle}>support@aura.com</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={18}
              color="#C7C7CC"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#F8F7FC",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAF3",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#111827",
  },
  notificationButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  illustrationContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  illustrationImage: {
    width: 290,
    height: 160,
    marginBottom: 24,
  },
  helpTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#111827",
    textAlign: "center",
  },
  helpSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
    marginTop:-6,
    marginBottom:10,
  },
  optionsContainer: {
    paddingHorizontal: 16,
  },
  supportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardIcon: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#111827",
  },
  cardSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
});
