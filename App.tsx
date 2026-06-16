import { BottomTabBar } from "@/components/navigation/BottomTabBar";
import { authStore } from "@/store/auth-store";
import { colors } from "@/theme";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from "@expo-google-fonts/poppins";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { LoginScreen } from "@/screens/auth/Login/LoginScreen";
import { SignUpScreen } from "@/screens/auth/SignUp/SignUpScreen";
import { DashboardScreen } from "@/screens/dashboard/DashboardScreen";
import { DocumentViewScreen } from "@/screens/documents/DocumentView/DocumentViewScreen";
import { UploadDocumentScreen } from "@/screens/documents/UploadDocument/UploadDocumentScreen";
import { EarningsDashboardScreen } from "@/screens/earnings/EarningsDashboard/EarningsDashboardScreen";
import { EarningsHistoryScreen } from "@/screens/profile/EarningsHistory/EarningsHistoryScreen";
import { Last7DaysScreen } from "@/screens/earnings/Last7Days/Last7DaysScreen";
import { WithdrawScreen } from "@/screens/earnings/Withdraw/WithdrawScreen";
import { BankDetailsScreen } from "@/screens/profile/finance/BankDetails/BankDetailsScreen";
import { OrderTrackingScreen } from "@/screens/home/Tracking/TrackingScreen";
import { CollectClothesScreen } from "@/screens/orders/CollectClothes/CollectClothesScreen";
import { DeliveredSuccessScreen } from "@/screens/orders/Delivered/DeliveredScreen";
import { OrderAtLaundryScreen } from "@/screens/orders/OrderAtLaundry/OrderAtLaundryScreen";
import { OrderAcceptedScreen } from "@/screens/orders/OrderAccepted/OrderAcceptedScreen";
import { OrderCollectedSuccessScreen } from "@/screens/orders/OrderCollected/OrderCollectedScreen";
import { OrdersListScreen } from "@/screens/orders/OrdersList/OrdersListScreen";
import { InOrderToTransitScreen } from "@/screens/orders/InOrderToTransit/InOrderToTransitScreen";
import { InTransitScreen } from "@/screens/orders/Transit/TransitScreen";
import { LaundryOtpVerificationScreen } from "@/screens/orders/LaundryOtpVerification/LaundryOtpVerificationScreen";
import { LaundryTrackingScreen } from "@/screens/orders/LaundryTracking/LaundryTrackingScreen";
import { BonusScreen } from "@/screens/profile/performance/Bonus/BonusScreen";
import { DailyDetailsScreen } from "@/screens/profile/performance/DailyDetails/DailyDetailsScreen";
import { DailySummaryScreen } from "@/screens/profile/DailySummary/DailySummaryScreen";
import { PerformanceScreen } from "@/screens/profile/performance/Performance/PerformanceScreen";
import { DocumentsScreen } from "@/screens/profile/Documents/DocumentsScreen";
import { PersonalInformationScreen } from "@/screens/profile/PersonalInformation/PersonalInformationScreen";
import ProfileScreen from "@/screens/profile/Profile/ProfileScreen";
import { SettingsScreen } from "@/screens/profile/Settings/SettingsScreen";
import { NotificationSettingsScreen } from "@/screens/profile/Settings/NotificationSettingsScreen";
import { TermsSettingsScreen } from "@/screens/profile/Settings/TermsSettingsScreen";
import { PrivacySettingsScreen } from "@/screens/profile/Settings/PrivacySettingsScreen";
import { VehicleInformationScreen } from "@/screens/profile/VehicleInformation/VehicleInformationScreen";
import { ContactSupportScreen } from "@/screens/profile/support/ContactSupport/ContactSupportScreen";
import { HelpCenterScreen } from "@/screens/profile/support/HelpCenter/HelpCenterScreen";
import { ReportIssueScreen } from "@/screens/profile/support/ReportIssue/ReportIssueScreen";
import { ReportSubmittedScreen } from "@/screens/profile/support/ReportIssue/ReportSubmittedScreen";
import { ComingSoonScreen } from "@/screens/ComingSoonScreen";

SplashScreen.preventAutoHideAsync();

const RootStack = createNativeStackNavigator();
const AuthNavigator = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const OrdersStack = createNativeStackNavigator();
const EarningsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <AuthNavigator.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <AuthNavigator.Screen name="login" component={LoginScreen} />
      <AuthNavigator.Screen name="register" component={SignUpScreen} />
    </AuthNavigator.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <HomeStack.Screen name="index" component={DashboardScreen} />
      <HomeStack.Screen name="order-accepted" component={OrderAcceptedScreen} />
      <HomeStack.Screen name="order-tracking" component={OrderTrackingScreen} />
      <HomeStack.Screen name="collect-clothes" component={CollectClothesScreen} />
      <HomeStack.Screen name="order-collected-success" component={OrderCollectedSuccessScreen} />
      <HomeStack.Screen name="in-transit" component={InTransitScreen} />
      <HomeStack.Screen name="order-in-transit" component={InOrderToTransitScreen} />
      <HomeStack.Screen name="laundry-otp" component={LaundryOtpVerificationScreen} />
      <HomeStack.Screen name="laundry-tracking" component={LaundryTrackingScreen} />
      <HomeStack.Screen name="order-at-laundry" component={OrderAtLaundryScreen} />
      <HomeStack.Screen name="delivered-success" component={DeliveredSuccessScreen} />
    </HomeStack.Navigator>
  );
}

function OrdersComingSoon() {
  return <ComingSoonScreen title="Orders" />;
}

function EarningsComingSoon() {
  return <ComingSoonScreen title="Earnings" />;
}

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <OrdersStack.Screen name="index" component={OrdersListScreen} />
      <OrdersStack.Screen name="collect-clothes" component={CollectClothesScreen} />
      <OrdersStack.Screen name="order-collected-success" component={OrderCollectedSuccessScreen} />
      <OrdersStack.Screen name="in-transit" component={InTransitScreen} />
      <OrdersStack.Screen name="order-in-transit" component={InOrderToTransitScreen} />
      <OrdersStack.Screen name="laundry-otp" component={LaundryOtpVerificationScreen} />
      <OrdersStack.Screen name="laundry-tracking" component={LaundryTrackingScreen} />
      <OrdersStack.Screen name="order-at-laundry" component={OrderAtLaundryScreen} />
      <OrdersStack.Screen name="delivered-success" component={DeliveredSuccessScreen} />
    </OrdersStack.Navigator>
  );
}

function EarningsStackScreen() {
  return (
    <EarningsStack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <EarningsStack.Screen name="index" component={EarningsDashboardScreen} />
      <EarningsStack.Screen name="withdraw" component={WithdrawScreen} />
      <EarningsStack.Screen name="last-7-days" component={Last7DaysScreen} />
      <EarningsStack.Screen name="earnings-history" component={EarningsHistoryScreen} />
    </EarningsStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right" }}>
      <ProfileStack.Screen name="index" component={ProfileScreen} />
      <ProfileStack.Screen name="personal-information" component={PersonalInformationScreen} />
      <ProfileStack.Screen name="vehicle-information" component={VehicleInformationScreen} />
      <ProfileStack.Screen name="documents/index" component={DocumentsScreen} />
      <ProfileStack.Screen name="documents/upload" component={UploadDocumentScreen} />
      <ProfileStack.Screen name="documents/[id]" component={DocumentViewScreen} />
      <ProfileStack.Screen name="finance/bank-details" component={BankDetailsScreen} />
      <ProfileStack.Screen name="performance/index" component={PerformanceScreen} />
      <ProfileStack.Screen name="performance/bonus-incentives" component={BonusScreen} />
      <ProfileStack.Screen name="performance/daily-summary" component={DailySummaryScreen} />
      <ProfileStack.Screen name="performance/daily-details" component={DailyDetailsScreen} />
      <ProfileStack.Screen name="support/contact" component={ContactSupportScreen} />
      <ProfileStack.Screen name="support/help-center" component={HelpCenterScreen} />
      <ProfileStack.Screen name="support/report-issue" component={ReportIssueScreen} />
      <ProfileStack.Screen name="support/report-submitted" component={ReportSubmittedScreen} />
      <ProfileStack.Screen name="profile/settings" component={SettingsScreen} />
      <ProfileStack.Screen name="profile/settings/notifications" component={NotificationSettingsScreen} />
      <ProfileStack.Screen name="profile/settings/terms" component={TermsSettingsScreen} />
      <ProfileStack.Screen name="profile/settings/privacy" component={PrivacySettingsScreen} />
      <ProfileStack.Screen name="profile/earnings-history" component={EarningsHistoryScreen} />
    </ProfileStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index];
        const focusedRouteName = getFocusedRouteNameFromRoute(activeRoute);

        const hideOnScreens: string[] = [];

        if (focusedRouteName && hideOnScreens.includes(focusedRouteName)) {
          return null;
        }

        return (
          <BottomTabBar
            activeTab={activeRoute.name}
            onTabPress={(key) => props.navigation.navigate(key as any, { screen: "index" } as any)}
          />
        );
      }}
    >
      <Tab.Screen name="home" component={HomeStackScreen} />
      <Tab.Screen name="earnings" component={EarningsStackScreen} />
      <Tab.Screen name="orders" component={OrdersStackScreen} />
      <Tab.Screen name="profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

const linking = {
  prefixes: ["rinzo-driver://", "https://rinzo-driver.com"],
  config: {
    screens: {
      "(auth)": {
        screens: {
          login: "login",
          register: "register",
        },
      },
      "(tabs)": {
        screens: {
          home: {
            screens: {
              index: "home",
              "order-accepted": "home/order-accepted/:orderId",
              "order-tracking": "home/tracking/:orderId",
            },
          },
          orders: {
            screens: {
              index: "orders",
              "collect-clothes": "orders/collect/:orderId",
              "order-collected-success": "orders/collected/:orderId",
              "in-transit": "orders/in-transit/:orderId",
              "order-in-transit": "orders/in-transit/:orderId",
              "laundry-otp": "orders/laundry-otp/:orderId",
              "laundry-tracking": "orders/laundry-tracking/:orderId",
              "order-at-laundry": "orders/at-laundry/:orderId",
              "delivered-success": "orders/delivered/:orderId",
            },
          },
          earnings: {
            screens: {
              index: "earnings",
              withdraw: "earnings/withdraw",
              "last-7-days": "earnings/last-7-days",
              "earnings-history": "earnings/history",
            },
          },
          profile: {
            screens: {
              index: "profile",
              "personal-information": "profile/personal-info",
              "vehicle-information": "profile/vehicle",
              "documents/index": "documents",
              "documents/upload": "documents/upload",
              "documents/[id]": "documents/:id",
              "finance/bank-details": "finance/bank-details",
              "performance/index": "performance",
              "performance/bonus-incentives": "performance/bonuses",
              "performance/daily-summary": "performance/daily-summary",
              "performance/daily-details": "performance/daily/:date",
              "support/contact": "support",
              "support/help-center": "help-center",
              "support/report-issue": "report-issue",
              "support/report-submitted": "report-submitted",
              "profile/settings": "settings",
              "profile/settings/notifications": "settings/notifications",
              "profile/settings/language": "settings/language",
              "profile/settings/terms": "settings/terms",
              "profile/settings/privacy": "settings/privacy",
              "profile/earnings-history": "profile/earnings-history",
            },
          },
        },
      },
    },
  },
};

function RootNavigator() {
  const { isAuthenticated } = authStore();

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false, animation: "fade" }}
      initialRouteName={isAuthenticated ? "(tabs)" : "(auth)"}
    >
      <RootStack.Screen name="(auth)" component={AuthStack} />
      <RootStack.Screen name="(tabs)" component={MainTabs} />
    </RootStack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer linking={linking as any}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}