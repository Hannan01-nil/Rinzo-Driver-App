import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

interface LanguageItem {
  code: string;
  native: string;
  english: string;
}

const LANGUAGES: LanguageItem[] = [
  { code: "US", native: "English", english: "English" },
  { code: "ES", native: "Español", english: "Spanish" },
  { code: "FR", native: "Français", english: "French" },
  { code: "DE", native: "Deutsch", english: "German" },
  { code: "IT", native: "Italiano", english: "Italian" },
];

export function LanguageSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const filteredLanguages = LANGUAGES.filter(
    (lang) =>
      lang.native.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.english.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContinue = () => {
    // Navigate back to Settings screen and pass the selected language
    navigation.navigate("profile/settings", {
      selectedLanguage,
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header Back Button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={20} color="#111827" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Globe Circular Background */}
        <View style={styles.globeContainer}>
          <Ionicons name="globe-outline" size={40} color="#FFFFFF" />
        </View>

        {/* Title */}
        <Text style={styles.title}>Select Language</Text>

        {/* Search Input Container */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#9CA3AF" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Languages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Section Label */}
        <Text style={styles.sectionLabel}>All Languages</Text>

        {/* Languages List */}
        {filteredLanguages.map((lang) => {
          const isSelected = selectedLanguage === lang.native;
          return (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageCard,
                isSelected ? styles.cardActive : styles.cardInactive,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedLanguage(lang.native)}
            >
              {/* Country Code Badge */}
              <View style={styles.badgeContainer}>
                <Text
                  style={[
                    styles.badgeText,
                    isSelected ? styles.badgeTextActive : styles.badgeTextInactive,
                  ]}
                >
                  {lang.code}
                </Text>
              </View>

              {/* Names */}
              <View style={styles.namesContainer}>
                <Text
                  style={[
                    styles.nativeName,
                    isSelected ? styles.textActive : styles.textInactive,
                  ]}
                >
                  {lang.native}
                </Text>
                <Text style={styles.englishName}>{lang.english}</Text>
              </View>

              {/* Checkmark indicator */}
              {isSelected && (
                <Ionicons name="checkmark" size={20} color="#8259D2" />
              )}
            </TouchableOpacity>
          );
        })}

        {filteredLanguages.length === 0 && (
          <Text style={styles.noResults}>No languages found</Text>
        )}

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          activeOpacity={0.8}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Content background is white in image
  },
  header: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 32,
  },
  globeContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#8259D2",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#111827",
    textAlign: "center",
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#111827",
    height: "100%",
  },
  sectionLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  languageCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1.5,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardActive: {
    borderColor: "#8259D2",
  },
  cardInactive: {
    borderColor: "#EFF0F6",
  },
  badgeContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  badgeText: {
    fontFamily: "Poppins_700Bold",
    fontSize: 14.5,
  },
  badgeTextActive: {
    color: "#8259D2",
  },
  badgeTextInactive: {
    color: "#9CA3AF",
  },
  namesContainer: {
    flex: 1,
  },
  nativeName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
  },
  textActive: {
    color: "#8259D2",
  },
  textInactive: {
    color: "#111827",
  },
  englishName: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  noResults: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  continueButton: {
    height: 54,
    backgroundColor: "#8259D2",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  continueButtonText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
