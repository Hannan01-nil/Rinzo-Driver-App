import { useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Rect, Circle, Line } from "react-native-svg";

const WashingMachineIcon = ({ color }: { color: string }) => (
  <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
    <Rect
      x={4}
      y={3}
      width={16}
      height={18}
      rx={2.5}
      stroke={color}
      strokeWidth={2}
    />
    <Circle
      cx={12}
      cy={13}
      r={4}
      stroke={color}
      strokeWidth={2}
    />
    <Line
      x1={7}
      y1={6.5}
      x2={11}
      y2={6.5}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Circle
      cx={16}
      cy={6.5}
      r={1}
      fill={color}
    />
  </Svg>
);

export function NotificationSettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  // Preferences States
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [promoOffers, setPromoOffers] = useState(false);
  const [reminders, setReminders] = useState(false);

  const handleOpenSettings = async () => {
    try {
      await Linking.openSettings();
    } catch (error) {
      Alert.alert("Error", "Could not open device notification settings.");
    }
  };

  const handleSetQuietHours = () => {
    Alert.alert(
      "Quiet Hours",
      "Silence all laundry alerts between 10 PM and 7 AM to ensure a peaceful night's rest.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Enable Quiet Hours",
          onPress: () => {
            Alert.alert("Success", "Quiet Hours have been successfully set.");
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
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Communication Preferences</Text>

        {/* Card 1: Order Status Updates */}
        <View
          style={[
            styles.toggleCard,
            orderUpdates ? styles.cardActive : styles.cardInactive,
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              orderUpdates ? styles.iconActive : styles.iconInactive,
            ]}
          >
            <WashingMachineIcon color={orderUpdates ? "#8259D2" : "#9CA3AF"} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Order Status Updates</Text>
            <Text style={styles.cardSubtitle}>
              Real-time alerts for pickup, washing, and delivery.
            </Text>
          </View>
          <Switch
            value={orderUpdates}
            onValueChange={setOrderUpdates}
            trackColor={{ false: "#E5E7EB", true: "#8259D2" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        {/* Card 2: Promotional Offers */}
        <View
          style={[
            styles.toggleCard,
            promoOffers ? styles.cardActive : styles.cardInactive,
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              promoOffers ? styles.iconActive : styles.iconInactive,
            ]}
          >
            <Ionicons
              name="pricetag-outline"
              size={22}
              color={promoOffers ? "#8259D2" : "#9CA3AF"}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Promotional Offers</Text>
            <Text style={styles.cardSubtitle}>
              Discounts, seasonal deals, and referral rewards.
            </Text>
          </View>
          <Switch
            value={promoOffers}
            onValueChange={setPromoOffers}
            trackColor={{ false: "#E5E7EB", true: "#8259D2" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        {/* Card 3: Service Reminders */}
        <View
          style={[
            styles.toggleCard,
            reminders ? styles.cardActive : styles.cardInactive,
          ]}
        >
          <View
            style={[
              styles.iconContainer,
              reminders ? styles.iconActive : styles.iconInactive,
            ]}
          >
            <Ionicons
              name="calendar-outline"
              size={22}
              color={reminders ? "#8259D2" : "#9CA3AF"}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Service Reminders</Text>
            <Text style={styles.cardSubtitle}>
              Gentle nudges to schedule your weekly laundry.
            </Text>
          </View>
          <Switch
            value={reminders}
            onValueChange={setReminders}
            trackColor={{ false: "#E5E7EB", true: "#8259D2" }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#E5E7EB"
          />
        </View>

        {/* Quiet Hours Card (Dashed Border) */}
        <View style={styles.quietHoursCard}>
          <View style={styles.quietHoursHeader}>
            <Ionicons
              name="notifications-off-outline"
              size={22}
              color="#8259D2"
            />
            <Text style={styles.quietHoursTitle}>Quiet Hours</Text>
          </View>
          <Text style={styles.quietHoursSubtitle}>
            Silence all laundry alerts between 10 PM and 7 AM to ensure a
            peaceful night's rest.
          </Text>
          <TouchableOpacity onPress={handleSetQuietHours} activeOpacity={0.6}>
            <Text style={styles.quietHoursLink}>Set Quiet Hours &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Footer info text */}
        <Text style={styles.footerText}>
          You can also manage these in your{" "}
          <Text style={styles.footerLink} onPress={handleOpenSettings}>
            Device System Settings
          </Text>{" "}
          for more granular control.
        </Text>
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
    backgroundColor: "#F6F8FC",
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
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
    color: "#797878",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  toggleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardActive: {
    borderColor: "#E5DEFA",
  },
  cardInactive: {
    borderColor: "#EFF0F6",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  iconActive: {
    backgroundColor: "#F0EBFB",
  },
  iconInactive: {
    backgroundColor: "#F3F4F6",
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#111827",
  },
  cardSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 18,
  },
  quietHoursCard: {
    backgroundColor: "#F4F6FC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#C4D1F6",
    borderStyle: "dashed",
    padding: 16,
    marginBottom: 24,
  },
  quietHoursHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  quietHoursTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#111827",
    marginLeft: 10,
  },
  quietHoursSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#4B5563",
    marginTop: 8,
    marginLeft: 32,
    lineHeight: 18,
  },
  quietHoursLink: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    color: "#8259D2",
    marginTop: 12,
    marginLeft: 32,
  },
  footerText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 24,
    marginTop: 8,
  },
  footerLink: {
    fontFamily: "Poppins_600SemiBold",
    color: "#8259D2",
    textDecorationLine: "underline",
  },
});
