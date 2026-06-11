import React from 'react'
import mapImage from '@/assets/images/DriverAppImages/map.png'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

export function OrderAtLaundryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()

  const { orderId } = route.params as { orderId: string }

  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId)

  const laundryName = 'Rinzo Laundry Hub'

  if (!order) {
    return (
      <ScreenWrapper>
        <Header title="Order At Laundry" />
        <Text style={styles.notFound}>Order not found</Text>
      </ScreenWrapper>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerSide}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="chevron-back" size={22} color="#1F1F1F" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{order.orderNumber}</Text>

        <View style={styles.headerSide} />
      </View>

      <Animated.View
        entering={FadeInUp.delay(100).duration(400)}
        style={styles.mapContainer}
      >
        <Image source={mapImage} style={styles.mapImage} resizeMode="cover" />
      </Animated.View>

      <View style={styles.bottomCard}>
        <Animated.View
          entering={FadeInUp.delay(300).duration(400).springify()}
          style={styles.cardUpper}
        >
          <Text style={styles.title}>Order At Laundry</Text>

          <Text style={styles.status}>🧺 At Laundry</Text>

          <Text style={styles.info}>
            Order {order.orderNumber} has been dropped off at the laundry and is
            awaiting processing.
          </Text>

          <View style={styles.driverRow}>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?u=driver_tracking',
              }}
              style={styles.avatar}
            />

            <View style={styles.driverInfo}>
              <Text style={styles.driverName}>Cameron Williamson</Text>
              <Text style={styles.driverRole}>Delivery Man</Text>
            </View>

            <TouchableOpacity
              style={styles.callButton}
              activeOpacity={0.7}
            >
              <Ionicons
                name="call-outline"
                size={20}
                color="#8259D2"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          <View style={styles.timelineSection}>
            <View style={styles.timelineLine} />

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="location-outline"
                  size={16}
                  color="#8259D2"
                />
              </View>

              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>Pickup</Text>
                <Text style={styles.trackingValue}>
                  {order.pickupAddress.street}
                </Text>
              </View>
            </View>

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="business-outline"
                  size={16}
                  color="#8259D2"
                />
              </View>

              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>Laundry</Text>
                <Text style={styles.trackingValue}>
                  {laundryName}
                </Text>
              </View>
            </View>

            <View style={styles.trackingRow}>
              <View style={styles.iconContainer}>
                <Ionicons
                  name="flag-outline"
                  size={16}
                  color="#8259D2"
                />
              </View>

              <View style={styles.trackingContent}>
                <Text style={styles.trackingLabel}>Status</Text>
                <Text style={styles.trackingValue}>
                  Awaiting Processing
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Mark as Delivered"
              fullWidth
              onPress={() =>
                navigation.navigate('delivered-success', {
                  orderId,
                })
              }
            />
          </View>
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

  notFound: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFFFFF',
  },

  headerSide: {
    width: 48,
    height: 48,
    justifyContent: 'center',
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

  mapContainer: {
    width: '100%',
    height: SCREEN_HEIGHT * 0.58,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },

  mapImage: {
    width: '100%',
    height: '100%',
  },

  bottomCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    marginTop: -92,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 6,
  },

  cardUpper: {
    flex: 1,
  },

  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#1F1F1F',
    marginBottom: 4,
  },

  status: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: '#8259D2',
    marginBottom: 6,
  },

  info: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 16,
    lineHeight: 20,
  },

  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },

  driverInfo: {
    flex: 1,
  },

  driverName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#1F1F1F',
  },

  driverRole: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#8E8E93',
  },

  callButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F7F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F1F1',
    marginVertical: 10,
  },

  timelineSection: {
    position: 'relative',
  },

  timelineLine: {
    position: 'absolute',
    left: 20,
    top: 30,
    width: 2,
    height: 80,
    backgroundColor: '#EAEAEA',
  },

  trackingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  trackingContent: {
    flex: 1,
    marginLeft: 16,
  },

  trackingLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 4,
  },

  trackingValue: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: '#1F1F1F',
    lineHeight: 20,
  },

  buttonContainer: {
    marginTop: 20,
  },
})