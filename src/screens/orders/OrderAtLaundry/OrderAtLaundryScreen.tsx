import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";

import storeImage from "@/assets/images/DriverAppImages/order.png";

export function OrderAtLaundryScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  const {
    orderId = "#123454797",
    customerName = "Mira Sharma",
    flowType = "customer_pickup",
    status = "pickup"
  } = (route.params || {}) as {
    orderId: string;
    customerName?: string;
    flowType?: 'customer_pickup' | 'franchise_delivery' | 'reroute_to_service' | 'service_return';
    status?: 'pickup' | 'delivery' | 'rerouting';
  };

  const [isLoading, setIsLoading] = useState(false);
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleConfirm = () => {
    if (isLoading) return;
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; 
      const minutesStr = minutes < 10 ? '0' + minutes : minutes;
      
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();

      const deliveryTime = `${hours}:${minutesStr} ${ampm} . ${day} ${month} ${year}`;

      (navigation as any).navigate("delivered-success", { 
        orderId, 
        customerName,
        deliveryTime,
        flowType,
        status,
      });
    }, 850);
  };

  // Dynamic styling for status badge
  const badgeStyles = {
    pickup: { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' },
    delivery: { bg: '#EFF6FF', text: '#1D4ED8', label: 'Delivery' },
    rerouting: { bg: '#FEF3C7', text: '#D97706', label: 'Rerouting' },
  }[status] || { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' };

  // Dynamic content based on flowType
  const flowConfig = {
    customer_pickup: {
      title: "Order at Laundry",
      subtitle: "Drop the order at the franchise laundry and update the status",
      buttonText: "Confirm Dropped",
    },
    franchise_delivery: {
      title: "Order Delivered",
      subtitle: "Deliver the order to the customer and update the status",
      buttonText: "Confirm Delivered",
    },
    reroute_to_service: {
      title: "Order at Premium Hub",
      subtitle: "Drop the rerouted clothes at the premium service hub",
      buttonText: "Confirm Dropped",
    },
    service_return: {
      title: "Order at Franchise",
      subtitle: "Drop the returned clothes at the franchise hub",
      buttonText: "Confirm Returned",
    },
  }[flowType] || {
    title: "Order at Laundry",
    subtitle: "Drop the order at the franchise laundry and update the status",
    buttonText: "Confirm Dropped",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>

        <Text style={styles.headerTitle} pointerEvents="none">
          {orderId}
        </Text>

        <View style={[styles.badge, { backgroundColor: badgeStyles.bg }]}>
          <Text style={[styles.badgeText, { color: badgeStyles.text }]}>{badgeStyles.label}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Image
          source={storeImage}
          style={styles.illustration}
          resizeMode="contain"
        />

        <Text style={styles.title}>{flowConfig.title}</Text>
        
        <Text style={styles.subtitle}>
          {flowConfig.subtitle}
        </Text>

        <View style={styles.buttonWrap}>
          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              style={styles.confirmButton}
              activeOpacity={0.85}
              disabled={isLoading}
              onPressIn={() => {
                if (!isLoading) {
                  buttonScale.value = withSpring(0.97, {
                    damping: 15,
                    stiffness: 200,
                  });
                }
              }}
              onPressOut={() => {
                if (!isLoading) {
                  buttonScale.value = withSpring(1, {
                    damping: 10,
                    stiffness: 150,
                  });
                }
              }}
              onPress={handleConfirm}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                  <Text style={styles.confirmText}>Updating Status...</Text>
                </View>
              ) : (
                <Text style={styles.confirmText}>{flowConfig.buttonText}</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
  },
  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#DDF4E8",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#5D9C74",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 28,
    paddingBottom: 110,
  },
  illustration: {
    width: 320,
    height: 290,
    marginTop: 48,
  },
  title: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 36,
  },
  subtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#8E8E93",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 8,
    paddingHorizontal: 20,
  },
  buttonWrap: {
    width: "100%",
    marginTop: 72,
  },
  confirmButton: {
    height: 52,
    backgroundColor: "#8259D2",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  confirmText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
