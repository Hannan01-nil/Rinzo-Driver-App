import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, TextInput, Badge } from '@/components/ui'
import { useProfile } from '@/hooks'
import { colors, typography, spacing } from '@/theme'

export function VehicleInformationScreen() {
  const { vehicle } = useProfile()

  return (
    <ScreenWrapper>
      <Header title="Vehicle Information" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.verifiedRow}>
            <Text style={styles.sectionLabel}>Vehicle Status</Text>
            <Badge label={vehicle?.isVerified ? 'Verified' : 'Unverified'} variant={vehicle?.isVerified ? 'success' : 'warning'} />
          </View>

          <TextInput label="Vehicle Type" value={vehicle?.type ?? ''} onChangeText={() => {}} />
          <TextInput label="Make" value={vehicle?.make ?? ''} onChangeText={() => {}} />
          <TextInput label="Model" value={vehicle?.model ?? ''} onChangeText={() => {}} />
          <TextInput label="Year" value={String(vehicle?.year ?? '')} onChangeText={() => {}} keyboardType="numeric" />
          <TextInput label="Color" value={vehicle?.color ?? ''} onChangeText={() => {}} />
          <TextInput label="License Plate" value={vehicle?.licensePlate ?? ''} onChangeText={() => {}} />

          <Button title="Update Vehicle Info" onPress={() => {}} fullWidth />
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  verifiedRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.lg },
  sectionLabel: { ...typography.label, color: colors.text },
})
