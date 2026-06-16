import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks";

export function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<any>();
  const { logout } = useAuth();

  const selectedLanguage = route.params?.selectedLanguage ?? "English";

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out of your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            logout();
            const rootNavigation = navigation.getParent()?.getParent();
            if (rootNavigation && typeof rootNavigation.reset === "function") {
              rootNavigation.reset({
                index: 0,
                routes: [{ name: "(auth)" }],
              });
            } else {
              navigation.reset({
                index: 0,
                routes: [{ name: "(auth)" }],
              });
            }
          },
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Notifications & Language */}
        <View style={styles.cardWrap}>
          {/* Notifications Option */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("profile/settings/notifications")}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="notifications-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Notifications</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Language Option */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("profile/settings/language")}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="globe-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Language</Text>
            <View style={styles.rowRightContainer}>
              <Text style={styles.rowValue}>{selectedLanguage}</Text>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" style={{ marginLeft: 4 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Section 2: Privacy, Terms & Version */}
        <View style={styles.cardWrap}>
          {/* Privacy Policy */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="shield-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </View>

          <View style={styles.rowDivider} />

          {/* Terms & Conditions */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="document-text-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </View>

          <View style={styles.rowDivider} />

          {/* App Version */}
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name="information-circle-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>App Version</Text>
            <Text style={styles.rowValue}>1.0.0</Text>
          </View>
        </View>

        {/* Section 3: Logout Action */}
        <View style={styles.cardWrap}>
          <TouchableOpacity style={styles.row} activeOpacity={0.6} onPress={handleLogout}>
            <View style={styles.iconContainer}>
              <Ionicons name="log-out-outline" size={22} color="#D32F2F" />
            </View>
            <Text style={[styles.rowLabel, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F8FC",
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
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 16,
  },
  cardWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  iconContainer: {
    width: 24,
    height: 24,
    marginRight: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },
  logoutText: {
    color: "#D32F2F",
    fontFamily: "Poppins_600SemiBold",
  },
  rowRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F1F1F1",
    marginLeft: 54, // Pushes divider past the icons (24 + 14 + 16)
  },
});
