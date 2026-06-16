import { HeaderBackButton } from "@/components/layout/header-back-button";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { useDocuments } from "@/hooks";
import { formatDate } from "@/utils";
import type { TDocument } from "@/types";

function formatDocumentId(doc: TDocument): string {
  if (doc.documentNumber) return doc.documentNumber;
  const prefixes: Record<string, string> = {
    drivers_license: "DL-",
    vehicle_registration: "REG-",
    insurance: "POL-",
    id_card: "PAN-",
  };
  const prefix = prefixes[doc.type] || "DOC-";
  return `${prefix}${doc.id.toUpperCase().replace("DOC_", "")}${"XXXX".slice(0, 4)}`;
}

export function DocumentViewScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const { documents } = useDocuments();
  const doc = documents.find((d) => d.id === id);

  if (!doc) {
    return (
      <ScreenWrapper noPadding>
        <View style={styles.container}>
          <View style={styles.header}>
            <HeaderBackButton />
            <Text style={styles.headerTitle}>Driving License</Text>
            <View style={styles.headerSpacer} />
          </View>
          <View style={styles.headerDivider} />
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>Document not found</Text>
          </View>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>{doc.label}</Text>
          <View style={styles.headerSpacer} />
          <TouchableOpacity style={styles.headerSide}>
            <Ionicons name="share-social-outline" size={22} color="#4B4458" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.previewCard}>
            <View style={styles.previewPlaceholder}>
              <Ionicons name="document-text-outline" size={38} color="#D8C9EF" />
              <Text style={styles.previewLabel}>{doc.label}</Text>
            </View>
          </View>

          <View style={styles.statusCard}>
            <View style={styles.statusIconCircle}>
              <Ionicons name="checkmark-circle" size={20} color="#8259D2" />
            </View>
            <Text style={styles.statusTitle}>Verified Status</Text>
            <Text style={styles.statusSubtitle}>Authenticated and secured</Text>
            <View style={styles.badgePill}>
              <Text style={styles.badgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>VERIFICATION DATE</Text>
              <Text style={styles.infoValue}>
                {doc.verifiedAt
                  ? formatDate(doc.verifiedAt, "long")
                  : "Pending"}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>DOCUMENT ID</Text>
              <Text style={styles.infoValue}>{formatDocumentId(doc)}</Text>
            </View>
            {doc.expiresAt && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>EXPIRY DATE</Text>
                <Text style={styles.infoValue}>
                  {formatDate(doc.expiresAt, "long")}
                </Text>
              </View>
            )}
          </View>

          <LinearGradient
            colors={["#8259D2", "#8259D2"]}
            style={styles.primaryButton}
          >
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.buttonTouchable}
              onPress={() => {}}
            >
              <Ionicons name="download-outline" size={16} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Download Copy</Text>
            </TouchableOpacity>
          </LinearGradient>

          <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
            <Text style={styles.secondaryButtonText}>Update Document</Text>
          </TouchableOpacity>

          <View style={styles.secureCard}>
            <View style={styles.secureHeader}>
              <Ionicons
                name="shield-checkmark-outline"
                size={19}
                color="#8259D2"
              />
              <Text style={styles.secureTitle}>Secure Storage</Text>
            </View>
            <Text style={styles.secureDescription}>
              Secure Storage
This document is encrypted with AES-
256 and stored securely. Only verified
administrators and automated
systems can access this information
for compliance purposes.
            </Text>
          </View>
        </ScrollView>
      </View>
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
    height: 44,
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
    fontSize: 19,
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
  notFoundContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  notFoundText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#6B7280",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 120,
  },
  previewCard: {
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.6)",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  previewPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFE",
  },
  previewLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
  },
  statusCard: {
    borderWidth: 0.5,
    borderColor: "#E6E8F0",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    alignItems: "center",
    paddingVertical: 18,
    marginTop: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  statusIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#F1E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  statusTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 19,
    color: "#1F2A5A",
    marginBottom: 2,
  },
  statusSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 20,
  },
  badgePill: {
    backgroundColor: "#F2EBFF",
    paddingHorizontal: 35,
    paddingVertical: 1,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8259D2",
  },
  infoCard: {
    borderWidth: 0.5,
    borderColor: "#E6E8F0",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 24,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  infoRow: {
    paddingVertical: 10,
  },
  infoLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#8A869A",
    letterSpacing: 0.3,
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#1F2A5A",
  },
  primaryButton: {
    height: 52,
    borderRadius: 10,
    marginTop: 36,
    overflow: "hidden",
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonTouchable: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  primaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
  secondaryButton: {
    height: 52,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#8259D2",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  secondaryButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#8259D2",
  },
  secureCard: {
    borderWidth: 0.5,
    borderColor: "#E6E8F0",
    backgroundColor: "#DCE9FF80",
    borderRadius: 20,
    padding: 16,
    marginTop: 26,
  },
  secureHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  secureTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#1F2A5A",
  },
  secureDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 20,
    marginLeft: 24,
  },
});
