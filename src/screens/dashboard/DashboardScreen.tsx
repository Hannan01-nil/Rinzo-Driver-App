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
            >
              <Image
                source={{ uri: "https://i.pravatar.cc/150?u=driver001" }}
                style={styles.avatar}
              />
            </TouchableOpacity>
            <View style={styles.headerInfo}>
              <Text style={styles.driverName}>Rahul Sharma</Text>
              <Text style={styles.onlineStatus}>Online</Text>
            </View>
          </View>
          <Ionicons name="notifications" size={22} color="#000000" />
        </View>

        <EarningsCard />

        <SectionHeader title="New Requests" />

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

        <SectionHeader title="Today's Schedule" />

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
    backgroundColor: "#FFFFFF",
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
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    marginLeft: 12,
  },
  driverName: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F1F1F",
  },
  onlineStatus: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#4CAF50",
    marginTop: -1,
  },
  bottomSpacer: {
    height: 110,
  },
});
