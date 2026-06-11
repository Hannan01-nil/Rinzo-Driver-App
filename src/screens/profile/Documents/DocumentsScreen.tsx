import { HeaderBackButton } from "@/components/layout/header-back-button";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { useDocuments } from "@/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CARD_RADIUS = 16;
const ICON_CONTAINER_SIZE = 46;

const DOCUMENT_ICONS: Record<string, string> = {
  drivers_license: "card-outline",
  vehicle_registration: "document-text-outline",
  insurance: "shield-checkmark-outline",
  id_card: "wallet-outline",
};

export function DocumentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { documents } = useDocuments();
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper noPadding>
      <View style={styles.container}>
        <View style={styles.header}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Documents</Text>
          <TouchableOpacity style={styles.headerSide}>
            <Ionicons name="notifications-outline" size={22} color="#000001" />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />

        <Text style={styles.description}>
          Manage and verify your essential delivery documents to stay active
          on the platform.
        </Text>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {documents.map((doc) => {
              const iconName =
                DOCUMENT_ICONS[doc.type] || "document-outline";

              return (
                <TouchableOpacity
                  key={doc.id}
                  style={styles.docCard}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate("documents/[id]", { id: doc.id })}
                >
                  <View
                    style={styles.iconContainer}
                  >
                    <Ionicons name={iconName as any} size={20} color="#7C5CE5" />
                  </View>

                  <View style={styles.docInfo}>
                    <Text style={styles.docTitle} numberOfLines={1}>{doc.label}</Text>
                    {doc.documentNumber && (
                      <Text style={styles.docNumber} numberOfLines={1}>{doc.documentNumber}</Text>
                    )}
                    <View style={styles.statusRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color="#16A34A"
                      />
                      <Text style={styles.statusText}>Verified</Text>
                    </View>
                  </View>

                  <Text style={styles.viewAction}>View</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate("documents/upload")}
          >
            <LinearGradient
              colors={["#8259D2", "#8259D2"]}
              style={[styles.uploadButton, { marginBottom: insets.bottom + 16 }]}
            >
              <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
              <Text style={styles.uploadText}>Upload New Document</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
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
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F2A5A",
  },
  headerDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  scrollView: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 100,
  },
  content: {
    paddingHorizontal: 24,
  },
  description: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#4B5563",
    lineHeight: 22,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  docCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: CARD_RADIUS,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.8)",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  iconContainer: {
    width: ICON_CONTAINER_SIZE,
    height: ICON_CONTAINER_SIZE,
    borderRadius: 12,
    backgroundColor: "#F1E8FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  docInfo: {
    flex: 1,
    justifyContent: "center",
    flexShrink: 1,
  },
  docTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 17,
    color: "#2d2f34",
  },
  docNumber: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#2d2f34",
    marginTop: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
    gap: 3,
  },
  statusText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#0b913c",
  },
  viewAction: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    color: "#8259D2",
    marginLeft: 10,
    flexShrink: 0,
  },
  uploadButton: {
    height:56,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    shadowColor: "#7C5CE5",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  uploadText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    backgroundColor: "#FAFAFA",
  },
});
