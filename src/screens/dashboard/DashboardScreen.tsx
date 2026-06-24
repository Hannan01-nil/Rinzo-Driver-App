import React, { useEffect, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EarningsCard } from "./components/EarningsCard";
import { RequestCard } from "./components/RequestCard";
import { SectionHeader } from "./components/SectionHeader";

interface MockRequestItem {
  orderNumber: string;
  time: string;
  address: string;
  customer: string;
  distance: string;
  flowType: 'customer_pickup' | 'franchise_delivery' | 'reroute_to_service' | 'service_return';
  status: 'pickup' | 'delivery' | 'rerouting';
}

const MOCK_REQUESTS: MockRequestItem[] = [
  {
    orderNumber: "#123454797",
    time: "2:00-4:00 PM",
    address: "221b baker street , Bangalore",
    customer: "Krishna (Customer)",
    distance: "1.2 Km away",
    flowType: "customer_pickup",
    status: "pickup",
  },
  {
    orderNumber: "#123454798",
    time: "3:00-5:00 PM",
    address: "15, Koramangala, Bangalore",
    customer: "Priya Patel",
    distance: "2.5 Km away",
    flowType: "franchise_delivery",
    status: "delivery",
  },
];

const MOCK_SCHEDULE: MockRequestItem[] = [
  {
    orderNumber: "#123454799",
    time: "6:00-8:00 PM",
    address: "42, Indiranagar, Bangalore",
    customer: "Service Franchise (Premium Hub)",
    distance: "3.0 Km away",
    flowType: "reroute_to_service",
    status: "rerouting",
  },
  {
    orderNumber: "#123454800",
    time: "7:30-9:30 PM",
    address: "80, Outer Ring Road, Bangalore",
    customer: "Franchise Hub A",
    distance: "4.5 Km away",
    flowType: "service_return",
    status: "rerouting",
  },
];

export function DashboardScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.4,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 👋";
    if (hour < 17) return "Good Afternoon 👋";
    return "Good Evening 👋";
  };

  const pulseScale = pulseAnim.interpolate({
    inputRange: [0.4, 1],
    outputRange: [1, 1.8],
  });

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              onPress={() => navigation.navigate("profile")}
              activeOpacity={0.7}
              style={styles.avatarContainer}
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=driver001" }}
                style={styles.avatar}
              />
              <View style={styles.pulseContainer}>
                <Animated.View
                  style={[
                    styles.pulseDot,
                    {
                      opacity: pulseAnim,
                      transform: [{ scale: pulseScale }],
                    },
                  ]}
                />
                <View style={styles.solidDot} />
              </View>
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.greetingText}>{getGreeting()}</Text>
              <Text style={styles.driverName}>Rahul Sharma</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.8}>
            <Ionicons name="notifications-outline" size={20} color="#8259D2" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        <EarningsCard />

        <SectionHeader title="Today's Schedule" />

        {MOCK_REQUESTS.map((req) => (
          <RequestCard
            key={req.orderNumber}
            orderNumber={req.orderNumber}
            time={req.time}
            address={req.address}
            customer={req.customer}
            distance={req.distance}
            status={req.status}
            onPress={() =>
              navigation.navigate("order-accepted", {
                orderId: req.orderNumber,
                flowType: req.flowType,
                status: req.status,
              })
            }
          />
        ))}

        {MOCK_SCHEDULE.map((item) => (
          <RequestCard
            key={item.orderNumber}
            orderNumber={item.orderNumber}
            time={item.time}
            address={item.address}
            customer={item.customer}
            distance={item.distance}
            status={item.status}
            onPress={() =>
              navigation.navigate("order-accepted", {
                orderId: item.orderNumber,
                flowType: item.flowType,
                status: item.status,
              })
            }
          />
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FDFBFF",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#EBE3FC",
  },
  pulseContainer: {
    position: "absolute",
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  pulseDot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10B981",
  },
  solidDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#10B981",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  headerInfo: {
    marginLeft: 12,
  },
  greetingText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#7E7E7E",
  },
  driverName: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#1A1A1E",
    marginTop: -2,
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(130, 89, 210, 0.08)",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EF4444",
  },
  bottomSpacer: {
    height: 110,
  },
});
