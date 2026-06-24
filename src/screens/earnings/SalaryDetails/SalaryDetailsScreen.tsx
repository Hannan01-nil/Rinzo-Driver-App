import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SalarySummaryCard } from "@/components/common/SalarySummaryCard";
import { mockSalaryDetailsData, BreakdownRowItem } from "@/data/performance";

interface SalaryBreakdownRowProps {
  item: BreakdownRowItem;
}

function SalaryBreakdownRow({ item }: SalaryBreakdownRowProps) {
  const textStyle = item.isHighlight
    ? [styles.breakdownTextHighlight, { fontFamily: "Poppins_700Bold" }]
    : [styles.breakdownTextStandard, { fontFamily: "Poppins_500Medium" }];

  const valueStyle = item.isHighlight
    ? [styles.breakdownTextHighlight, { fontFamily: "Poppins_700Bold" }]
    : [styles.breakdownTextStandard, { fontFamily: "Poppins_600SemiBold" }];

  return (
    <View style={styles.breakdownRow}>
      <Text style={textStyle}>{item.label}</Text>
      <Text style={valueStyle}>{item.value}</Text>
    </View>
  );
}

export function SalaryDetailsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const data = mockSalaryDetailsData;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeftButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Salary Details</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 }, // Ensures layout scrolls cleanly above bottom navigation
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Salary Summary Card */}
        <SalarySummaryCard
          month={data.month}
          label={data.amountLabel}
          value={data.value}
          paymentStatus={data.paymentStatusLabel}
          iconName="wallet-outline"
        />

        {/* Salary Breakdown Title */}
        <Animated.View entering={FadeInUp.duration(400).delay(100)}>
          <Text style={styles.sectionTitle}>Salary Breakdown</Text>
        </Animated.View>

        {/* Breakdown Card */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(150)}
          style={styles.breakdownCard}
        >
          {data.breakdown.map((item, index) => (
            <View key={index}>
              <SalaryBreakdownRow item={item} />
              {index < data.breakdown.length - 1 && (
                <View style={styles.rowSeparator} />
              )}
            </View>
          ))}
        </Animated.View>

        {/* Payment Status Title */}
        <Animated.View entering={FadeInUp.duration(400).delay(200)}>
          <Text style={styles.sectionTitle}>Payment Status</Text>
        </Animated.View>

        {/* Payment Status Card */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(250)}
          style={styles.statusCard}
        >
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{data.paymentStatus.status}</Text>
          </View>
          <Text style={styles.statusDescription} numberOfLines={2}>
            {data.paymentStatus.description}
          </Text>
        </Animated.View>

        {/* Download Payslip Button */}
        <Animated.View entering={FadeInUp.duration(400).delay(300)}>
          <TouchableOpacity
            style={styles.downloadButtonContainer}
            activeOpacity={0.9}
            onPress={() =>
              Alert.alert("", "Payslip download will be available soon.")
            }
          >
            <LinearGradient
              colors={["#6F4BFF", "#8D6EFF"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.downloadButtonGradient}
            >
              <Ionicons
                name="download-outline"
                size={20}
                color="#FFFFFF"
                style={styles.downloadIcon}
              />
              <Text style={styles.downloadButtonText}>Download Payslip</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: "#FFFFFF",
  },
  headerLeftButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F1F1F",
  },
  headerRightSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginTop: 24,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  breakdownCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F2F2F7",
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  breakdownRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breakdownTextStandard: {
    fontSize: 14,
    color: "#1F1F1F",
    lineHeight: 18,
  },
  breakdownTextHighlight: {
    fontSize: 14,
    color: "#8259D2",
    lineHeight: 18,
  },
  rowSeparator: {
    height: 1,
    backgroundColor: "#F2F2F7",
  },
  statusCard: {
    height: 92,
    marginHorizontal: 20,
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    padding: 16,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 2,
  },
  statusPill: {
    backgroundColor: "#DDF4E8",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  statusPillText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#4CAF50",
    lineHeight: 14,
  },
  statusDescription: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#8E8E93",
    lineHeight: 18,
  },
  downloadButtonContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#6F4BFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  downloadButtonGradient: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadIcon: {
    marginRight: 8,
  },
  downloadButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
