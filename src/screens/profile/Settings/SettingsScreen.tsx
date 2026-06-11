import { useState } from "react";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/hooks";
import * as WebBrowser from "expo-web-browser";

export function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { logout } = useAuth();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isCheckingUpdates, setIsCheckingUpdates] = useState(false);

  const handleNotificationsToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Alert.alert(
      "Notifications",
      value
        ? "Push notifications have been enabled. You will receive updates about new pickup requests and earnings."
        : "Push notifications have been disabled. You might miss important delivery updates."
    );
  };

  const handleLanguage = () => {
    Alert.alert(
      "Language",
      "Select your preferred language:",
      [
        {
          text: `English ${selectedLanguage === "English" ? "✓" : ""}`,
          onPress: () => {
            setSelectedLanguage("English");
            Alert.alert("Language Changed", "Language has been set to English.");
          },
        },
        {
          text: `Hindi ${selectedLanguage === "Hindi" ? "✓" : ""}`,
          onPress: () => {
            setSelectedLanguage("Hindi");
            Alert.alert("Language Changed", "Language has been set to Hindi.");
          },
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handlePrivacyPolicy = async () => {
    try {
      await WebBrowser.openBrowserAsync("https://rinzo.com/privacy");
    } catch (error) {
      Alert.alert("Error", "Could not open Privacy Policy in-app.");
    }
  };

  const handleTermsAndConditions = async () => {
    try {
      await WebBrowser.openBrowserAsync("https://rinzo.com/terms");
    } catch (error) {
      Alert.alert("Error", "Could not open Terms & Conditions in-app.");
    }
  };

  const handleAppVersion = () => {
    setIsCheckingUpdates(true);
    setTimeout(() => {
      setIsCheckingUpdates(false);
      Alert.alert(
        "App Version",
        "Rinzo Driver App is up to date!\n\nVersion: 1.0.0 (Latest)\nBuild: 2026.06.12",
        [{ text: "OK" }]
      );
    }, 1200);
  };

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
        <View style={styles.headerLeft}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Section 1: Notifications & Language */}
        <View style={styles.cardWrap}>
          {/* Notifications Option */}
          <View style={styles.row}>
            <Image
              source={require("@/assets/images/settings_bell.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.rowLabel}>Notifications</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={handleNotificationsToggle}
              trackColor={{ false: "#D1D1D6", true: "#8259D2" }}
              thumbColor={notificationsEnabled ? "#FFFFFF" : "#F4F3F4"}
            />
          </View>

          <View style={styles.rowDivider} />

          {/* Language Option */}
          <TouchableOpacity style={styles.row} activeOpacity={0.6} onPress={handleLanguage}>
            <Image
              source={require("@/assets/images/settings_globe.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.rowLabel}>Language</Text>
            <View style={styles.rowRightContainer}>
              <Text style={styles.rowValue}>{selectedLanguage}</Text>
              <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Section 2: Privacy, Terms & Version */}
        <View style={styles.cardWrap}>
          {/* Privacy Policy */}
          <TouchableOpacity style={styles.row} activeOpacity={0.6} onPress={handlePrivacyPolicy}>
            <Image
              source={require("@/assets/images/settings_shield.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.rowLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* Terms & Conditions */}
          <TouchableOpacity style={styles.row} activeOpacity={0.6} onPress={handleTermsAndConditions}>
            <Image
              source={require("@/assets/images/settings_terms.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.rowLabel}>Terms & Conditions</Text>
            <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
          </TouchableOpacity>

          <View style={styles.rowDivider} />

          {/* App Version */}
          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={handleAppVersion}
            disabled={isCheckingUpdates}
          >
            <Image
              source={require("@/assets/images/settings_version.png")}
              style={styles.optionIcon}
              resizeMode="contain"
            />
            <Text style={styles.rowLabel}>App Version</Text>
            {isCheckingUpdates ? (
              <ActivityIndicator size="small" color="#8259D2" style={{ marginRight: 4 }} />
            ) : (
              <Text style={styles.rowValue}>1.0.0</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Section 3: Logout Action */}
        <View style={styles.cardWrap}>
          <TouchableOpacity style={styles.row} activeOpacity={0.6} onPress={handleLogout}>
            <View style={styles.vectorIconContainer}>
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
    backgroundColor: "#F8F7FC",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
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
  optionIcon: {
    width: 24,
    height: 24,
    marginRight: 14,
    marginLeft:5,
  },
  vectorIconContainer: {
    width: 24,
    height: 24,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  rowLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },
  logoutText: {
    color: "#D32F2F",
  },
  rowRightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValue: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    marginRight: 4,
  },
  rowDivider: {
    height: 1,
    backgroundColor: "#F1F1F1",
    marginLeft: 54, // Pushes divider past the icons for clean layout
  },
});
