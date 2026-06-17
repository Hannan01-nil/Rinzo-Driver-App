import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute, StackActions } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withSpring,
  withTiming,
  withDelay,
  withRepeat,
  withSequence,
  FadeInUp,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Path as SvgPath } from 'react-native-svg'
import { HeaderBackButton } from '@/components/layout/header-back-button'

const AnimatedPath = Animated.createAnimatedComponent(SvgPath)

export function OrderCollectedSuccessScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()

  const { orderId = '#129348393', flowType = 'customer_pickup', status = 'pickup' } = (route.params || {}) as {
    orderId: string;
    flowType?: 'customer_pickup' | 'franchise_delivery' | 'reroute_to_service' | 'service_return';
    status?: 'pickup' | 'delivery' | 'rerouting';
  };

  const outerRingScale = useSharedValue(0)
  const ringOpacity = useSharedValue(0)
  const innerRingScale = useSharedValue(0)
  const circleScale = useSharedValue(0)
  const checkmarkProgress = useSharedValue(0)
  const buttonScale = useSharedValue(1)

  // Dynamic styling for status badge
  const badgeStyles = {
    pickup: { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' },
    delivery: { bg: '#EFF6FF', text: '#1D4ED8', label: 'Delivery' },
    rerouting: { bg: '#FEF3C7', text: '#D97706', label: 'Rerouting' },
  }[status] || { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' };

  // Dynamic text content based on flowType
  const flowContent = {
    customer_pickup: {
      title: "Order Collected!",
      subtitle: "The clothes have been picked up successfully and are ready to be transported to the laundry.",
      statusLabel: "Pickup Status",
      nextStep: "Deliver to Laundry",
    },
    franchise_delivery: {
      title: "Order Picked Up!",
      subtitle: "The washed clothes have been picked up from the franchise and are ready to be delivered to the customer.",
      statusLabel: "Pickup Status",
      nextStep: "Deliver to Customer",
    },
    reroute_to_service: {
      title: "Reroute Collected!",
      subtitle: "The clothes have been picked up from the franchise and are ready to be rerouted to the premium service hub.",
      statusLabel: "Reroute Status",
      nextStep: "Deliver to Service Hub",
    },
    service_return: {
      title: "Return Collected!",
      subtitle: "The washed clothes have been picked up from the premium hub and are ready to be returned to the franchise.",
      statusLabel: "Return Status",
      nextStep: "Return to Franchise",
    },
  }[flowType] || {
    title: "Order Collected!",
    subtitle: "The clothes have been picked up successfully and are ready to be transported to the laundry.",
    statusLabel: "Pickup Status",
    nextStep: "Deliver to Laundry",
  };

  useEffect(() => {
    outerRingScale.value = withSpring(1, {
      damping: 15,
      stiffness: 80,
    })

    ringOpacity.value = withDelay(
      300,
      withRepeat(
        withSequence(
          withTiming(0.4, { duration: 1500 }),
          withTiming(1, { duration: 1500 }),
        ),
        -1,
        true,
      ),
    )

    innerRingScale.value = withDelay(
      100,
      withSpring(1, {
        damping: 14,
        stiffness: 90,
      }),
    )

    circleScale.value = withDelay(
      200,
      withSpring(1, {
        damping: 10,
        stiffness: 100,
      }),
    )

    checkmarkProgress.value = withDelay(
      350,
      withTiming(1, { duration: 400 }),
    )
  }, [])

  const outerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: outerRingScale.value }],
    opacity: ringOpacity.value,
  }))

  const innerRingStyle = useAnimatedStyle(() => ({
    transform: [{ scale: innerRingScale.value }],
  }))

  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }))

  const checkmarkProps = useAnimatedProps(() => ({
    strokeDashoffset: 80 - checkmarkProgress.value * 80,
  }))

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }))

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
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
        <View style={styles.topSection}>
          <View style={styles.animationContainer}>
            <Animated.View
              style={[styles.outerRing, outerRingStyle]}
            />

            <Animated.View
              style={[styles.innerRing, innerRingStyle]}
            />

            <Animated.View
              style={[styles.successCircle, circleStyle]}
            >
              <Svg
                width={76}
                height={76}
                viewBox="0 0 120 120"
              >
                <AnimatedPath
                  animatedProps={checkmarkProps}
                  d="M 35 55 L 50 70 L 85 35"
                  stroke="#FFFFFF"
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray={80}
                />
              </Svg>
            </Animated.View>
          </View>

          <Text style={styles.successTitle}>
            {flowContent.title}
          </Text>

          <Text style={styles.successSubtitle}>
            {flowContent.subtitle}
          </Text>
        </View>

        <Animated.View
          entering={FadeInUp.delay(600).duration(400).springify()}
          style={styles.card}
        >
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Order ID</Text>
            <Text style={styles.cardValue}>{orderId}</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>{flowContent.statusLabel}</Text>
            <Text style={styles.cardValue}>Completed</Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Next Step</Text>
            <Text style={styles.cardValue}>
              {flowContent.nextStep}
            </Text>
          </View>

          <View style={styles.cardDivider} />

          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Status</Text>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                Collected Successfully
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInUp.delay(800).duration(400).springify()}
        >
          <Animated.View
            style={[styles.buttonOuter, animatedButtonStyle]}
          >
            <TouchableOpacity
              style={styles.continueButton}
              activeOpacity={0.85}
              onPressIn={() => {
                buttonScale.value = withSpring(0.97, {
                  damping: 15,
                  stiffness: 200,
                })
              }}
              onPressOut={() => {
                buttonScale.value = withSpring(1, {
                  damping: 10,
                  stiffness: 150,
                })
              }}
              onPress={() => {
                navigation.navigate("laundry-tracking", { orderId, flowType, status });
              }}
            >
              <Text style={styles.continueButtonText}>
                Track Order
              </Text>
            </TouchableOpacity>

          </Animated.View>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
  },

  headerSide: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    zIndex: 10,
  },

  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1F1F1F',
  },

  badge: {
    backgroundColor: '#DDF4E8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },

  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: '#5D9C74',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 110,
  },

  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  animationContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  outerRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 10,
    borderColor: '#F2F2F6',
    backgroundColor: '#FFFFFF',
  },

  innerRing: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    borderWidth: 7,
    borderColor: '#FFFFFF',
    backgroundColor: '#F7F5FF',
    top: 19,
  },

  successCircle: {
    position: 'absolute',
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },

  successTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#1F1F1F',
    marginBottom: 8,
  },

  successSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    padding: 16,
    elevation: 2,
  },

  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },

  cardLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#8E8E93',
  },

  cardValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
    flexShrink: 1,
    textAlign: 'right',
    maxWidth: '55%',
  },

  cardDivider: {
    height: 1,
    backgroundColor: '#F1F1F1',
  },

  statusBadge: {
    backgroundColor: '#DDF4E8',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },

  statusText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 12,
    color: '#5D9C74',
  },

  buttonOuter: {
    marginTop: 16,
  },

  continueButton: {
    height: 52,
    backgroundColor: '#8259D2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  continueButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },

  outlineButton: {
    height: 52,
    borderWidth: 1,
    borderColor: '#8259D2',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },

  outlineButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#8259D2',
  },
})