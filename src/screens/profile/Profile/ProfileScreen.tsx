import { useProfile } from "@/hooks";
import { spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const { profile } = useProfile();

  const MENU_SECTIONS = [
    {
      title: "ACCOUNT",
      items: [
        {
          label: "Personal Information",
          route: "personal-information",
          icon: "person",
        },
        {
          label: "Vehicle Information",
          route: "vehicle-information",
          icon: "car",
        },
        { label: "Documents", route: "documents/index", icon: "document-text" },
      ],
    },
    {
      title: "FINANCE",
      items: [
        { label: "Bank Details", route: "finance/bank-details", icon: "card" },
        { label: "Earnings History", route: "earnings-history", icon: "time" },
      ],
    },
    {
      title: "WORK PERFORMANCE",
      items: [
        {
          label: "Performance",
          route: "performance/index",
          icon: "stats-chart",
        },
        {
          label: "Daily Summary",
          route: "performance/daily-summary",
          icon: "calendar",
        },
      ],
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Help Center", route: "support/contact", icon: "help-circle" },
        { label: "Contact Support", route: "support/contact", icon: "call" },
        { label: "Report Issue", route: "ReportIssueScreen", icon: "warning" },
      ],
    },
  ];

  function MenuRow({ icon, label, onPress, danger }: any) {
    return (
      <TouchableOpacity
        style={styles.row}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.leftIcon}>
          <Ionicons name={icon as any} size={20} color="#8259D2" />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
        <Ionicons name="chevron-forward" size={16} color="#C7C7CC" />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.headerRow}>
          <View style={styles.leftRow}>
            <View style={[styles.avatarWrap, { marginTop: 6 }]}>
              <View style={styles.avatarOuter}>
                {profile?.avatar ? (
                  <Image
                    source={{ uri: profile.avatar }}
                    style={styles.avatar}
                  />
                ) : (
                  <View style={styles.avatarPlaceholder}>
                    <Text style={styles.avatarText}>
                      {"Rahul Sharma"
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.avatarBadge}>
                <Text style={styles.avatarBadgeText}>★</Text>
              </View>
            </View>
            <View style={styles.infoCol}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>Rahul Sharma</Text>
                <View style={styles.verifiedWrapSmall}>
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                </View>
              </View>
              <Text style={styles.driverId}>Driver ID: DR-2024-001</Text>
              <View style={styles.statsRow}>
                <View style={[styles.statItem, { marginRight: 18 }]}>
                  <Ionicons name="star" size={14} color="#FFD24D" />
                  <Text style={[styles.statText, { marginLeft: 6 }]}>
                    4.9 Rating
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Ionicons name="key" size={14} color="#8259D2" />
                  <Text style={[styles.statText, { marginLeft: 6 }]}>
                    1,240 Deliveries
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.earningsCardWrap}>
          <LinearGradient
            colors={["#8259D2", "#6A44B8"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.earningsCard}
          >
            <View style={styles.earnTopRowV2}>
              <View style={styles.earnColumn}>
                <Text style={styles.earnLabelTop}>Today's Earnings</Text>
                <Text style={styles.earnValueTop}>₹650</Text>
              </View>
              <View style={styles.earnColumnRight}>
                <Text style={styles.earnLabelTop}>This Month</Text>
                <Text style={styles.earnValueTop}>₹15,800</Text>
              </View>
            </View>
            <View style={styles.earnDivider} />
            <Text style={styles.earnBottomV2}>
              8 Deliveries Completed Today
            </Text>
          </LinearGradient>
        </View>

        {MENU_SECTIONS.map((section, sIdx) => (
          <View key={sIdx}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.cardWrap}>
              {section.items.map((it: any, idx: number) => (
                <React.Fragment key={idx}>
                  <MenuRow
                    icon={it.icon + "-outline"}
                    label={it.label}
                    onPress={() => navigation.navigate(it.route as any)}
                  />
                  {idx < section.items.length - 1 && (
                    <View style={styles.rowDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          </View>
        ))}

        <View style={{ marginTop: 18 }}>
          <View style={[styles.cardWrap, styles.logoutCard]}>
            <TouchableOpacity
              style={styles.logoutRow}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <View style={styles.leftIconLogout}>
                <Ionicons name="log-out-outline" size={20} color="#FF4D4F" />
              </View>
              <Text style={styles.rowLabelLogout}>Logout</Text>
              <Ionicons name="chevron-forward" size={16} color="#FF4D4F" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  scroll: { paddingHorizontal: 16, paddingTop: 10 },
  headerRow: { marginBottom: 12 },
  leftRow: { flexDirection: "row", alignItems: "flex-start" },
  avatarWrap: { marginRight: 12 },
  avatar: { width: 80, height: 80, borderRadius: 42 },
  avatarOuter: {
    width: 80,
    height: 80,
    borderRadius: 42,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 42,
    backgroundColor: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#1F1F1F",
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  avatarBadge: {
    position: "absolute",
    right: 3,
    bottom: -6,
    width: 22,
    height: 22,
    borderRadius: 12,
    backgroundColor: "#FFD24D",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  avatarBadgeText: { color: "#FFFFFF", fontSize: 12 },
  infoCol: { marginLeft: 14, flex: 1 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  name: { fontFamily: "Poppins_600SemiBold", fontSize: 20, color: "#1F1F1F" },
  verifiedWrapSmall: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#8259D2",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 6,
  },
  driverId: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 2,
  },
  statsRow: { flexDirection: "row", marginTop: 6, alignItems: "center" },
  statItem: { flexDirection: "row", alignItems: "center" },
  statStar: { color: "#FFCC00", marginRight: 6 },
  statText: { fontFamily: "Poppins_500Medium", fontSize: 12, color: "#8259D2" },

  earningsCardWrap: { marginTop: 18 },
  earningsCard: {
    height: 160,
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 16,
    shadowColor: "#6A44B8",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
    justifyContent: "flex-start",
  },
  earnTopRowV2: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  earnColumn: { flex: 1 },
  earnColumnRight: { flex: 1, alignItems: "flex-end" },
  earnLabelTop: {
    fontSize: 13,
    color: "rgba(255,255,255,0.9)",
    fontFamily: "Poppins_400Regular",
  },
  earnValueTop: {
    fontSize: 24,
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
    marginTop: 6,
  },
  earnDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginTop: 14,
  },
  earnBottomV2: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#FFFFFF",
    marginTop: 14,
  },

  sectionWrap: { marginBottom: spacing.lg },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 10,
    letterSpacing: 0.8,
    color: "#8259D2",
    marginTop: 28,
    marginBottom: 8,
  },
  cardWrap: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F1F1",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  row: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  leftIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  rowLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1F1F1F",
    flex: 1,
  },
  rowDivider: { height: 1, backgroundColor: "#F1F1F1", marginLeft: 16 },

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
  settingsBtn: { padding: 8 },
});

export default ProfileScreen;
