import { useEffect, useRef } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Animated, Dimensions, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import Svg, { Path as SvgPath } from 'react-native-svg'

const AnimatedPath = Animated.createAnimatedComponent(SvgPath)

type HomeStackParamList = {
  'index': undefined
  'new-pickup-request': undefined
  'order-accepted': { orderId: string }
  'order-tracking': { orderId: string }
}

type OrderAcceptedRouteProp = RouteProp<HomeStackParamList, 'order-accepted'>

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

const CONFETTI_CONFIG = [
  { angle: 0, distance: 70, color: '#FF6B6B' },
  { angle: 45, distance: 65, color: '#FFD93D' },
  { angle: 90, distance: 75, color: '#6BCB77' },
  { angle: 135, distance: 60, color: '#4D96FF' },
  { angle: 180, distance: 70, color: '#FF8C00' },
  { angle: 225, distance: 65, color: '#9B59B6' },
  { angle: 270, distance: 75, color: '#1ABC9C' },
  { angle: 315, distance: 60, color: '#E74C3C' },
]

export function OrderAcceptedScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>()
  const route = useRoute<OrderAcceptedRouteProp>()
  const { orderId } = route.params

  const ringsOpacity = useRef(new Animated.Value(0)).current
  const circleScale = useRef(new Animated.Value(0.6)).current
  const checkmarkOffset = useRef(new Animated.Value(68)).current
  const confettiOpacity = useRef(new Animated.Value(0)).current
  const confettiValues = useRef(
    CONFETTI_CONFIG.map(() => ({
      x: new Animated.Value(0),
      y: new Animated.Value(0),
      opacity: new Animated.Value(0),
    }))
  ).current

  useEffect(() => {
    const animation = Animated.sequence([
      Animated.timing(ringsOpacity, { toValue: 0.3, duration: 300, useNativeDriver: true }),
      Animated.spring(circleScale, { toValue: 1, friction: 5, tension: 50, useNativeDriver: true }),
      Animated.timing(checkmarkOffset, { toValue: 0, duration: 400, useNativeDriver: false }),
      Animated.parallel([
        Animated.timing(confettiOpacity, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.parallel(
          CONFETTI_CONFIG.map((config, i) =>
            Animated.parallel([
              Animated.spring(confettiValues[i].x, {
                toValue: Math.cos((config.angle * Math.PI) / 180) * config.distance,
                friction: 6,
                useNativeDriver: true,
              }),
              Animated.spring(confettiValues[i].y, {
                toValue: Math.sin((config.angle * Math.PI) / 180) * config.distance,
                friction: 6,
                useNativeDriver: true,
              }),
              Animated.sequence([
                Animated.timing(confettiValues[i].opacity, { toValue: 1, duration: 100, useNativeDriver: true }),
                Animated.delay(500),
                Animated.timing(confettiValues[i].opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
              ]),
            ])
          )
        ),
      ]),
    ])

    animation.start()
  }, [])

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerSide}>
          <Ionicons name="arrow-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{orderId}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Pickup</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.animationSection, { minHeight: SCREEN_HEIGHT * 0.42 }]}>
          <View style={styles.animationContainer}>
            <Animated.View
              style={[
                styles.outerRing,
                { opacity: ringsOpacity, transform: [{ scale: ringsOpacity.interpolate({ inputRange: [0, 0.3], outputRange: [0.8, 1] }) }] },
              ]}
            />
            <Animated.View
              style={[
                styles.innerRing,
                { opacity: ringsOpacity, transform: [{ scale: ringsOpacity.interpolate({ inputRange: [0, 0.3], outputRange: [0.9, 1] }) }] },
              ]}
            />

            {CONFETTI_CONFIG.map((config, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.confettiPiece,
                  {
                    backgroundColor: config.color,
                    opacity: Animated.multiply(confettiOpacity, confettiValues[i].opacity),
                    transform: [
                      { translateX: confettiValues[i].x },
                      { translateY: confettiValues[i].y },
                    ],
                  },
                ]}
              />
            ))}

            <Animated.View
              style={[
                styles.successCircle,
                { transform: [{ scale: circleScale }] },
              ]}
            >
              <Svg width={68} height={68} viewBox="0 0 120 120">
                <AnimatedPath
                  d="M 35 55 L 50 70 L 85 40"
                  stroke="#FFFFFF"
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray={68}
                  strokeDashoffset={checkmarkOffset as any}
                />
              </Svg>
            </Animated.View>
          </View>

          <Text style={styles.successTitle}>Order Accepted!</Text>
          <Text style={styles.successSubtitle}>
            You have accepted the pickup request successfully
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Order ID</Text>
            <Text style={styles.cardValue}>{orderId}</Text>
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Pickup Time</Text>
            <Text style={styles.cardValue}>Tomorrow, 2:00PM - 4:00PM</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.trackButton}
          onPress={() => navigation.navigate('order-tracking', { orderId })}
          activeOpacity={0.7}
        >
          <Text style={styles.trackButtonText}>Track Order</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
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
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  headerSide: {
    width: 32,
    height: 32,
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 17,
    color: '#1F1F1F',
  },
  badge: {
    backgroundColor: '#DDF4E8',
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#5D9C74',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  animationSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 40,
  },
  outerRing: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 77, 255, 0.2)',
  },
  innerRing: {
    position: 'absolute',
    width: 172,
    height: 172,
    borderRadius: 86,
    borderWidth: 1.5,
    borderColor: 'rgba(124, 77, 255, 0.2)',
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#7C4DFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7C4DFF',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  confettiPiece: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  successTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#1F1F1F',
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    maxWidth: '80%',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 28,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  cardLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
  },
  cardValue: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 10,
  },
  trackButton: {
    height: 52,
    backgroundColor: '#7C4DFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  trackButtonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#FFFFFF',
    fontSize: 14,
  },
  bottomSpacer: {
    height: 100,
  },
})
