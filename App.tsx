import { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import { authStore } from '@/store/auth-store'
import { colors } from '@/theme'
import { BottomTabBar } from '@/components/navigation/BottomTabBar'

import { LoginScreen } from '@/screens/auth/Login/LoginScreen'
import { DashboardScreen } from '@/screens/dashboard/DashboardScreen'
import { NewPickupRequestScreen } from '@/screens/dashboard/NewPickupRequestScreen'
import { OrderAcceptedScreen } from '@/screens/orders/OrderAccepted/OrderAcceptedScreen'
import { OrderTrackingScreen } from '@/screens/home/Tracking/TrackingScreen'
import { OrdersListScreen } from '@/screens/orders/OrdersList/OrdersListScreen'
import { CollectClothesScreen } from '@/screens/orders/CollectClothes/CollectClothesScreen'
import { OrderCollectedSuccessScreen } from '@/screens/orders/OrderCollected/OrderCollectedScreen'
import { InTransitScreen } from '@/screens/orders/Transit/TransitScreen'
import { OrderAtLaundryScreen } from '@/screens/orders/Laundry/LaundryScreen'
import { DeliveredSuccessScreen } from '@/screens/orders/Delivered/DeliveredScreen'
import { EarningsDashboardScreen } from '@/screens/earnings/EarningsDashboard/EarningsDashboardScreen'
import { WithdrawScreen } from '@/screens/earnings/Withdraw/WithdrawScreen'
import { Last7DaysScreen } from '@/screens/earnings/Last7Days/Last7DaysScreen'
import { EarningsHistoryScreen } from '@/screens/earnings/EarningsHistory/EarningsHistoryScreen'
import { ProfileScreen } from '@/screens/profile/Profile/ProfileScreen'
import { PersonalInformationScreen } from '@/screens/profile/PersonalInformation/PersonalInformationScreen'
import { VehicleInformationScreen } from '@/screens/profile/VehicleInformation/VehicleInformationScreen'
import { DocumentsScreen } from '@/screens/profile/Documents/DocumentsScreen'
import { UploadDocumentScreen } from '@/screens/documents/UploadDocument/UploadDocumentScreen'
import { DocumentViewScreen } from '@/screens/documents/DocumentView/DocumentViewScreen'
import { BankDetailsScreen } from '@/screens/finance/BankDetails/BankDetailsScreen'
import { PerformanceScreen } from '@/screens/performance/Performance/PerformanceScreen'
import { BonusScreen } from '@/screens/performance/Bonus/BonusScreen'
import { DailySummaryScreen } from '@/screens/performance/DailySummary/DailySummaryScreen'
import { DailyDetailsScreen } from '@/screens/performance/DailyDetails/DailyDetailsScreen'
import { ContactSupportScreen } from '@/screens/support/ContactSupport/ContactSupportScreen'

SplashScreen.preventAutoHideAsync()

const RootStack = createNativeStackNavigator()
const AuthNavigator = createNativeStackNavigator()
const HomeStack = createNativeStackNavigator()
const OrdersStack = createNativeStackNavigator()
const EarningsStack = createNativeStackNavigator()
const ProfileStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <AuthNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthNavigator.Screen name="login" component={LoginScreen} />
    </AuthNavigator.Navigator>
  )
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <HomeStack.Screen name="index" component={DashboardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="new-pickup-request" component={NewPickupRequestScreen} options={{ title: 'New Pickup Request', headerShown: false }} />
      <HomeStack.Screen name="order-accepted" component={OrderAcceptedScreen} options={{ title: 'Order Accepted', headerShown: false }} />
      <HomeStack.Screen name="order-tracking" component={OrderTrackingScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  )
}

function OrdersStackScreen() {
  return (
    <OrdersStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <OrdersStack.Screen name="index" component={OrdersListScreen} options={{ headerShown: false }} />
      <OrdersStack.Screen name="collect-clothes" component={CollectClothesScreen} options={{ title: 'Collect Clothes' }} />
      <OrdersStack.Screen name="order-collected-success" component={OrderCollectedSuccessScreen} options={{ title: 'Collected', headerBackVisible: false }} />
      <OrdersStack.Screen name="in-transit" component={InTransitScreen} options={{ title: 'In Transit' }} />
      <OrdersStack.Screen name="order-at-laundry" component={OrderAtLaundryScreen} options={{ title: 'At Laundry' }} />
      <OrdersStack.Screen name="delivered-success" component={DeliveredSuccessScreen} options={{ title: 'Delivered', headerBackVisible: false }} />
    </OrdersStack.Navigator>
  )
}

function EarningsStackScreen() {
  return (
    <EarningsStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <EarningsStack.Screen name="index" component={EarningsDashboardScreen} options={{ headerShown: false }} />
      <EarningsStack.Screen name="withdraw" component={WithdrawScreen} options={{ title: 'Withdraw' }} />
      <EarningsStack.Screen name="last-7-days" component={Last7DaysScreen} options={{ title: 'Last 7 Days' }} />
      <EarningsStack.Screen name="earnings-history" component={EarningsHistoryScreen} options={{ title: 'Earnings History' }} />
    </EarningsStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <ProfileStack.Screen name="index" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="personal-information" component={PersonalInformationScreen} options={{ title: 'Personal Information' }} />
      <ProfileStack.Screen name="vehicle-information" component={VehicleInformationScreen} options={{ title: 'Vehicle Information' }} />
      <ProfileStack.Screen name="documents/index" component={DocumentsScreen} options={{ title: 'Documents' }} />
      <ProfileStack.Screen name="documents/upload" component={UploadDocumentScreen} options={{ title: 'Upload Document' }} />
      <ProfileStack.Screen name="documents/[id]" component={DocumentViewScreen} options={{ title: 'Document' }} />
      <ProfileStack.Screen name="finance/bank-details" component={BankDetailsScreen} options={{ title: 'Bank Details' }} />
      <ProfileStack.Screen name="performance/index" component={PerformanceScreen} options={{ title: 'Performance' }} />
      <ProfileStack.Screen name="performance/bonus-incentives" component={BonusScreen} options={{ title: 'Bonus & Incentives' }} />
      <ProfileStack.Screen name="performance/daily-summary" component={DailySummaryScreen} options={{ title: 'Daily Summary' }} />
      <ProfileStack.Screen name="performance/daily-details" component={DailyDetailsScreen} options={{ title: 'Daily Details' }} />
      <ProfileStack.Screen name="support/contact" component={ContactSupportScreen} options={{ title: 'Contact Support' }} />
    </ProfileStack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => {
        const activeRoute = props.state.routes[props.state.index]
        const homeState = activeRoute.state as any
        const currentRouteName = homeState?.routes?.[homeState?.index ?? -1]?.name
        const isDashboard = activeRoute.name === 'home' && currentRouteName === 'index'

        if (!isDashboard) return null

        return (
          <BottomTabBar
            activeTab={activeRoute.name}
            onTabPress={(key) => props.navigation.navigate(key as never)}
          />
        )
      }}
    >
      <Tab.Screen name="home" component={HomeStackScreen} />
      <Tab.Screen name="orders" component={OrdersStackScreen} />
      <Tab.Screen name="earnings" component={EarningsStackScreen} />
      <Tab.Screen name="profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  )
}

const linking = {
  prefixes: ['rinzo-driver://', 'https://rinzo-driver.com'],
  config: {
    screens: {
      '(auth)': {
        screens: {
          login: 'login',
        },
      },
      '(tabs)': {
        screens: {
          home: {
            screens: {
              index: 'home',
              'new-pickup-request': 'home/new-pickup',
              'order-accepted': 'home/order-accepted/:orderId',
              'order-tracking': 'home/tracking/:orderId',
            },
          },
          orders: {
            screens: {
              index: 'orders',
              'collect-clothes': 'orders/collect/:orderId',
              'order-collected-success': 'orders/collected/:orderId',
              'in-transit': 'orders/in-transit/:orderId',
              'order-at-laundry': 'orders/at-laundry/:orderId',
              'delivered-success': 'orders/delivered/:orderId',
            },
          },
          earnings: {
            screens: {
              index: 'earnings',
              withdraw: 'earnings/withdraw',
              'last-7-days': 'earnings/last-7-days',
              'earnings-history': 'earnings/history',
            },
          },
          profile: {
            screens: {
              index: 'profile',
              'personal-information': 'profile/personal-info',
              'vehicle-information': 'profile/vehicle',
              'documents/index': 'documents',
              'documents/upload': 'documents/upload',
              'documents/[id]': 'documents/:id',
              'finance/bank-details': 'finance/bank-details',
              'performance/index': 'performance',
              'performance/bonus-incentives': 'performance/bonuses',
              'performance/daily-summary': 'performance/daily-summary',
              'performance/daily-details': 'performance/daily/:date',
              'support/contact': 'support',
            },
          },
        },
      },
    },
  },
}

function RootNavigator() {
  const { isAuthenticated } = authStore()

  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? '(tabs)' : '(auth)'}
    >
      <RootStack.Screen name="(auth)" component={AuthStack} />
      <RootStack.Screen name="(tabs)" component={MainTabs} />
    </RootStack.Navigator>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <NavigationContainer linking={linking as any}>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}


