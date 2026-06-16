import { useState } from "react";
import {
  Modal,
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
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        {/* Section 1: Settings Options */}
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

          {/* Privacy Policy */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("profile/settings/privacy")}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="shield-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Terms & Conditions */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.6}
            onPress={() => navigation.navigate("profile/settings/terms")}
          >
            <View style={styles.iconContainer}>
              <Ionicons name="document-text-outline" size={22} color="#8259D2" />
            </View>
            <Text style={styles.rowLabel}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
          </TouchableOpacity>

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
        <View style={{ marginTop: 18 }}>
          <View style={[styles.cardWrap, styles.logoutCard]}>
            <TouchableOpacity
              style={styles.logoutRow}
              activeOpacity={0.7}
              onPress={() => setShowLogoutModal(true)}
            >
              <View style={styles.leftIconLogout}>
                <Ionicons name="log-out-outline" size={20} color="#FF4D4F" />
              </View>
              <Text style={styles.rowLabelLogout}>Logout</Text>
              <Ionicons name="chevron-forward" size={16} color="#fa373a" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalIconBg}>
              <Ionicons name="log-out-outline" size={28} color="#FF4D4F" />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to log out of your account?
            </Text>
            <View style={styles.modalButtonsRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalCancelBtn]}
                activeOpacity={0.8}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalLogoutBtn]}
                activeOpacity={0.85}
                onPress={() => {
                  setShowLogoutModal(false);
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
                }}
              >
                <Text style={styles.modalLogoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    backgroundColor: "#F6F8FC",
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
    paddingBottom: 120,
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
  logoutCard: { borderColor: "#FFE1E1" },
  logoutRow: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftIconLogout: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rowLabelLogout: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#FF4D4F",
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalIconBg: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFF1F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginBottom: 8,
  },
  modalMessage: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  modalButtonsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  modalButton: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCancelBtn: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  modalCancelText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
  },
  modalLogoutBtn: {
    backgroundColor: "#FF4D4F",
  },
  modalLogoutText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#FFFFFF",
  },
});
