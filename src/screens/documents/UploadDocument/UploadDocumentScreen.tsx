import { HeaderBackButton } from "@/components/layout/header-back-button";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { DOCUMENT_TYPE_LABELS } from "@/constants";
import type { DocumentType } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DOCUMENT_TYPES = Object.entries(DOCUMENT_TYPE_LABELS) as [
  DocumentType,
  string,
][];
const RADIUS = 12;

export function UploadDocumentScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedLabel = selectedType
    ? DOCUMENT_TYPE_LABELS[selectedType]
    : "Select document type";

  return (
    <ScreenWrapper noPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Upload Document</Text>
          <View style={styles.headerSpacer} />
          <TouchableOpacity style={styles.headerSide}>
            <Ionicons name="notifications-outline" size={20} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.stepIndicator}>STEP 2 OF 4</Text>

          <Text style={styles.description}>
            Please provide a valid document to verify your identity and
            eligibility for delivery services.
          </Text>

          <Text style={styles.sectionLabel}>DOCUMENT TYPE</Text>

          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.7}
            onPress={() => setDropdownOpen(true)}
          >
            <Text
              style={[
                styles.dropdownText,
                !selectedType && styles.dropdownPlaceholder,
              ]}
            >
              {selectedLabel}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6B7280" />
          </TouchableOpacity>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>
            UPLOAD PHOTO
          </Text>

          <TouchableOpacity style={styles.uploadArea} activeOpacity={0.7}>
            <View style={styles.uploadIconCircle}>
              <Ionicons name="camera-outline" size={28} color="#8259D2" />
            </View>
            <Text style={styles.uploadTitle}>Add File</Text>
            <Text style={styles.uploadSubtitle}>
              Drag and drop or click to upload
            </Text>
          </TouchableOpacity>

          <View style={styles.tipsCard}>
            <View style={styles.tipsHeader}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color="#7C5CE5"
              />
              <Text style={styles.tipsTitle}>TIPS FOR A CLEAR PHOTO</Text>
            </View>
            <View style={styles.tipsList}>
              <Text style={styles.tipItem}>
                Ensure all four corners are visible
              </Text>
              <Text style={styles.tipItem}>Avoid glare and shadows</Text>
              <Text style={styles.tipItem}>
                Make sure text is readable and sharp
              </Text>
              <Text style={styles.tipItem}>
                Use a plain, dark background for contrast
              </Text>
            </View>
          </View>

          <LinearGradient
            colors={["#8259D2", "#8259D2"]}
            style={styles.submitButton}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.submitTouchable}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.submitText}>Submit for Verification</Text>
            </TouchableOpacity>
          </LinearGradient>
        </ScrollView>
      </View>

      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.modalContent}>
            {DOCUMENT_TYPES.map(([type, label], index) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.modalItem,
                  index < DOCUMENT_TYPES.length - 1 && styles.modalItemBorder,
                ]}
                onPress={() => {
                  setSelectedType(type);
                  setDropdownOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.modalItemText,
                    selectedType === type && styles.modalItemTextSelected,
                  ]}
                >
                  {label}
                </Text>
                {selectedType === type && (
                  <Ionicons name="checkmark" size={18} color="#8259D2" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
    backgroundColor: "#F8F9FF",
  },
  headerSide: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F2A5A",
    marginLeft: 20,
  },
  headerSpacer: {
    flex: 1,
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 120,
  },
  stepIndicator: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#6B7280",
    letterSpacing: 0.6,
    marginBottom: 2,
    marginTop: 18,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 26,
    marginBottom: 20,
  },
  sectionLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#8259D2",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  dropdown: {
    height: 56,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: RADIUS,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#1F2A5A",
  },
  dropdownPlaceholder: {
    color: "#9CA3AF",
  },
  uploadArea: {
    height: 220,
    borderWidth: 2,
    borderColor: "#D8C9EF",
    borderStyle: "dashed",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadIconCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#F1E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1F2A5A",
    marginBottom: 4,
  },
  uploadSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: "#EFF4FF",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 26,
  },
  tipsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  tipsTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#1F2A5A",
    letterSpacing: 0.4,
  },
  tipsList: {
    gap: 6,
  },
  tipItem: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#5F6473",
    lineHeight: 15,
    marginBottom: 8,
    marginLeft: 26,
  },
  submitButton: {
    height: 56,
    borderRadius: 22,
    marginTop: 32,
    overflow: "hidden",
    shadowColor: "#8259D2",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  submitTouchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  modalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  modalItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  modalItemText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#1F2A5A",
  },
  modalItemTextSelected: {
    color: "#8259D2",
  },
});
