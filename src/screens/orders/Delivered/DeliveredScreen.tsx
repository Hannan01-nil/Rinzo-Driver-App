import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, StackActions } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path as SvgPath } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
  withDelay,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderBackButton } from '@/components/layout/header-back-button';

const AnimatedPath = Animated.createAnimatedComponent(SvgPath);

export function DeliveredSuccessScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute();

  const {
    orderId = '#129348393',
    deliveryTime = '4:25 Pm . 12 may 2026',
    flowType = 'customer_pickup',
    status = 'pickup'
  } = (route.params || {}) as {
    orderId: string;
    deliveryTime?: string;
    flowType?: 'customer_pickup' | 'franchise_delivery' | 'franchise_delivery_transit' | 'reroute_to_service' | 'reroute_to_service_drop' | 'service_return' | 'service_return_drop';
    status?: 'pickup' | 'delivery' | 'rerouting';
  };

  // Dynamic styling for status badge
  const badgeStyles = {
    pickup: { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' },
    delivery: { bg: '#EFF6FF', text: '#1D4ED8', label: 'Delivery' },
    rerouting: { bg: '#FEF3C7', text: '#D97706', label: 'Rerouting' },
  }[status] || { bg: '#DEF7EC', text: '#15803D', label: 'Pickup' };

  // Dynamic text content based on flowType
  const flowContent = {
    customer_pickup: {
      title: "Dropped at Laundry",
      subtitle: "The clothes have been dropped at the laundry successfully.",
    },
    franchise_delivery: {
      title: "Delivered Successfully",
      subtitle: "The order has been delivered to the customer.",
    },
    franchise_delivery_transit: {
      title: "Delivered Successfully",
      subtitle: "The order has been delivered to the customer.",
    },
    reroute_to_service: {
      title: "Rerouted Successfully",
      subtitle: "The clothes have been dropped at the premium service hub.",
    },
    reroute_to_service_drop: {
      title: "Rerouted Successfully",
      subtitle: "The clothes have been dropped at the premium service hub.",
    },
    service_return: {
      title: "Returned Successfully",
      subtitle: "The clothes have been returned to the franchise.",
    },
    service_return_drop: {
      title: "Returned Successfully",
      subtitle: "The clothes have been returned to the franchise.",
    },
  }[flowType] || {
    title: "Delivered Successfully",
    subtitle: "The order has been delivered.",
  };

  // Animation values
  const circleScale = useSharedValue(0);
  const ringScale1 = useSharedValue(0.7);
  const ringScale2 = useSharedValue(0.7);
  const ringOpacity1 = useSharedValue(0);
  const ringOpacity2 = useSharedValue(0);

  const checkmarkProgress = useSharedValue(0);

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);

  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);

  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);

  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(30);

  const buttonScale = useSharedValue(1);

  useEffect(() => {
    // 1. Success Circle Scales Up
    circleScale.value = withSpring(1, { damping: 12, stiffness: 100 });

    // 2. Outer Rings Fade and Expand
    ringScale1.value = withTiming(1.35, { duration: 1000 });
    ringOpacity1.value = withSequence(
      withTiming(0.4, { duration: 100 }),
      withTiming(0, { duration: 900 })
    );

    ringScale2.value = withDelay(250, withTiming(1.4, { duration: 1000 }));
    ringOpacity2.value = withDelay(
      250,
      withSequence(
        withTiming(0.25, { duration: 100 }),
        withTiming(0, { duration: 900 })
      )
    );

    // 3. Checkmark Draws In
    checkmarkProgress.value = withDelay(250, withTiming(1, { duration: 400 }));

    // 4. Title Fades In
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 400 }));
    titleTranslateY.value = withDelay(500, withSpring(0, { damping: 15, stiffness: 150 }));

    // 5. Subtitle Fades In
    subtitleOpacity.value = withDelay(650, withTiming(1, { duration: 400 }));
    subtitleTranslateY.value = withDelay(650, withSpring(0, { damping: 15, stiffness: 150 }));

    // 6. Delivery Card Fades & Slides Up
    cardOpacity.value = withDelay(800, withTiming(1, { duration: 450 }));
    cardTranslateY.value = withDelay(800, withSpring(0, { damping: 14, stiffness: 120 }));

    // 7. View Proof Button Fades & Slides Up
    buttonOpacity.value = withDelay(950, withTiming(1, { duration: 450 }));
    buttonTranslateY.value = withDelay(950, withSpring(0, { damping: 14, stiffness: 120 }));
  }, []);

  // Animated Styles
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: circleScale.value }],
  }));

  const ring1Style = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale1.value }],
    opacity: ringOpacity1.value,
  }));

  const ring2Style = useAnimatedStyle(() => ({
    transform: [{ scale: ringScale2.value }],
    opacity: ringOpacity2.value,
  }));

  const checkmarkProps = useAnimatedProps(() => ({
    strokeDashoffset: 80 - checkmarkProgress.value * 80,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }, { scale: buttonScale.value }],
  }));

  const handleDismiss = () => {
    try {
      navigation.dispatch(StackActions.popToTop());
    } catch (e) {
      // Ignore if pop is not supported
    }

    try {
      navigation.navigate("orders", {
        screen: "index",
        params: { filter: "completed" },
      });
    } catch (e) {
      const parent = navigation.getParent();
      if (parent && typeof parent.navigate === "function") {
        parent.navigate("orders", {
          screen: "index",
          params: { filter: "completed" },
        });
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
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

      {/* Main Content */}
      <View style={styles.content}>
        {/* Success Icon Animation wrapper */}
        <View style={styles.animationWrapper}>
          {/* Fading expanding rings */}
          <Animated.View style={[styles.ring, styles.ringOuter, ring1Style]} />
          <Animated.View style={[styles.ring, styles.ringInner, ring2Style]} />

          {/* Core success circle */}
          <Animated.View style={[styles.successCircle, circleStyle]}>
            <Svg width={96} height={96} viewBox="0 0 120 120">
              <AnimatedPath
                animatedProps={checkmarkProps}
                d="M 32 58 L 50 76 L 88 38"
                stroke="#FFFFFF"
                strokeWidth={11}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                strokeDasharray={80}
              />
            </Svg>
          </Animated.View>
        </View>

        {/* Text descriptions */}
        <Animated.Text style={[styles.title, titleStyle]}>
          {flowContent.title}
        </Animated.Text>
        <Animated.Text style={[styles.subtitle, subtitleStyle]}>
          {flowContent.subtitle}
        </Animated.Text>

        {/* Delivery Card */}
        <Animated.View style={[styles.deliveryCard, cardStyle]}>
          <Text style={styles.cardLabel}>Delivered at</Text>
          <Text style={styles.cardTime}>{deliveryTime}</Text>
        </Animated.View>

        {/* Action Button */}
        <Animated.View style={[styles.buttonWrap, buttonAnimatedStyle]}>
          <TouchableOpacity
            style={styles.confirmButton}
            activeOpacity={0.85}
            onPressIn={() => {
              buttonScale.value = withSpring(0.97, { damping: 15, stiffness: 200 });
            }}
            onPressOut={() => {
              buttonScale.value = withSpring(1, { damping: 10, stiffness: 150 });
            }}
            onPress={handleDismiss}
          >
            <Text style={styles.confirmText}>View Proof</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: '#FAFAFA',
  },
  headerSide: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 10,
  },
  headerTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1F1F1F',
    textAlign: 'center',
  },
  badge: {
    backgroundColor: '#DDF4E8',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 11,
    color: '#5D9C74',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingBottom: 110,
  },
  animationWrapper: {
    width: 260,
    height: 260,
    marginTop: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  ring: {
    position: 'absolute',
    borderWidth: 2.5,
    borderColor: '#8259D2',
    backgroundColor: 'transparent',
  },
  ringOuter: {
    width: 230,
    height: 230,
    borderRadius: 115,
  },
  ringInner: {
    width: 190,
    height: 190,
    borderRadius: 95,
  },
  successCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#8259D2',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#8259D2',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 22,
    color: '#1F1F1F',
    textAlign: 'center',
    marginTop: 36,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 8,
  },
  deliveryCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 36,
  },
  cardLabel: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#1F1F1F',
    marginBottom: 4,
  },
  cardTime: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#8E8E93',
  },
  buttonWrap: {
    width: '100%',
    marginTop: 56,
  },
  confirmButton: {
    height: 52,
    backgroundColor: '#8259D2',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  confirmText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
