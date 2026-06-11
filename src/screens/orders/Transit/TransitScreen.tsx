import { View, Text, StyleSheet } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HeaderBackButton } from '@/components/layout/header-back-button'
import { Card, Button } from '@/components/ui'
import { useOrders } from '@/hooks'
import { colors, typography, spacing } from '@/theme'

export function InTransitScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const route = useRoute()
  const { orderId } = route.params as { orderId: string }
  const { orders } = useOrders()
  const order = orders.find(o => o.id === orderId || o.orderNumber === orderId)

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.headerSide}>
          <HeaderBackButton />
        </View>
        <Text style={styles.headerTitle} pointerEvents="none">In Transit</Text>
        <View style={styles.headerSide} />
      </View>

      <View style={styles.content}>
        <Card>
          <Text style={styles.status}>🚚 In Transit</Text>
          <Text style={styles.info}>
            You are heading to the laundry with {order?.itemsCount ?? 0} items.
          </Text>
        </Card>

        <View style={{ marginTop: spacing.xxl }}>
          <Button
            title="Reached Laundry"
            onPress={() => navigation.navigate('order-at-laundry', { orderId })}
            fullWidth
          />
        </View>
      </View>
    </SafeAreaView>
  )
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  status: { ...typography.h3, color: colors.text, textAlign: 'center', marginBottom: spacing.md },
  info: { ...typography.body, color: colors.textSecondary, textAlign: 'center' },
})
