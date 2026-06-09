import { View, Text, StyleSheet } from 'react-native'

export function EarningsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Today's Earnings</Text>
      <Text style={styles.amount}>₹ 620</Text>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Pickups</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Deliveries</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#7C4DFF',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginTop: 16,
    justifyContent: 'center',
    shadowColor: '#7C4DFF',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  title: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  amount: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#FFFFFF',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 28,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
})
