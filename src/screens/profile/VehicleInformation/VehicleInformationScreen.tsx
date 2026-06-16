import { HeaderBackButton } from "@/components/layout/header-back-button";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { Card } from "@/components/ui/card";
import { mockVehicleInfo, mockVehicleDetails } from "@/data/profile";
import { useProfile } from "@/hooks";
import { spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const CARD_RADIUS = 18;

export function VehicleInformationScreen() {
  const { vehicle } = useProfile();
  const navigation = useNavigation();

  const data = {
    type: vehicle?.type ?? mockVehicleInfo.type,
    model: vehicle?.model ?? mockVehicleInfo.model,
    color: vehicle?.color ?? mockVehicleInfo.color,
    licensePlate: vehicle?.licensePlate ?? mockVehicleInfo.licensePlate,
    isVerified: vehicle?.isVerified ?? mockVehicleInfo.isVerified,
    registrationNumber: mockVehicleDetails.registrationNumber,
    insuranceValidTill: mockVehicleDetails.insuranceValidTill,
  };

  return (
    <ScreenWrapper noPadding>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Vehicle Information</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.content}>
          <View style={styles.heroCard}>
            <View style={styles.heroTopRight}>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#16A34A" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
              <Text style={styles.activeLabel}>Active Vehicle</Text>
            </View>
            <View style={styles.heroImageWrap}>
              <Ionicons name="bicycle-outline" size={110} color="#6BB5B8" />
            </View>
          </View>

          {/* Detail Cards */}
          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Vehicle Type</Text>
            <Text style={styles.value}>
              {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            </Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Registration Number</Text>
            <Text style={styles.value}>{data.registrationNumber}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Model</Text>
            <Text style={styles.value}>{data.model}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Color</Text>
            <Text style={styles.value}>{data.color}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Insurance Valid Till</Text>
            <Text style={styles.value}>{data.insuranceValidTill}</Text>
          </Card>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveWrap}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["#8259D2", "#8259D2"]}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Update Vehicle Info</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F2A5A",
  },
  headerRight: {
    width: 32,
  },
  scroll: {
    paddingBottom: 120,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  heroCard: {
    backgroundColor: "#C8F1F3",
    borderRadius: 24,
    height: 200,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroTopRight: {
    position: "absolute",
    top: 14,
    right: 14,
    alignItems: "flex-end",
    zIndex: 2,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFF7E6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
    marginBottom: 4,
  },
  verifiedText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#16A34A",
  },
  activeLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#374151",
  },
  heroImageWrap: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "60%",
    height: "85%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 12,
    paddingBottom: 8,
  },
  fieldCard: {
    marginBottom: 14,
    borderRadius: CARD_RADIUS,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#98A2B3",
    marginBottom: 4,
  },
  value: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#27315B",
  },
  saveWrap: {
    marginTop: 8,
    marginBottom: spacing.sm,
  },
  saveButton: {
    height: 56,
    borderRadius: 20,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C5CE5",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  saveText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
