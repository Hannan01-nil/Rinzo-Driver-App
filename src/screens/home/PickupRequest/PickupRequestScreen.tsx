import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Button, TextInput } from '@/components/ui'
import { colors, typography, spacing } from '@/theme'

export function NewPickupRequestScreen() {
  return (
    <ScreenWrapper>
      <Header title="New Pickup Request" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionLabel}>Customer Information</Text>
        <TextInput label="Customer Name" value="" onChangeText={() => {}} placeholder="Enter name" />
        <TextInput label="Phone Number" value="" onChangeText={() => {}} placeholder="Enter phone" keyboardType="phone-pad" />

        <Text style={styles.sectionLabel}>Pickup Address</Text>
        <TextInput label="Street / Area" value="" onChangeText={() => {}} placeholder="Enter street" />
        <TextInput label="City" value="" onChangeText={() => {}} placeholder="Enter city" />

        <Text style={styles.sectionLabel}>Delivery Address</Text>
        <TextInput label="Street / Area" value="" onChangeText={() => {}} placeholder="Enter street" />
        <TextInput label="City" value="" onChangeText={() => {}} placeholder="Enter city" />

        <Button title="Submit Pickup Request" onPress={() => {}} fullWidth />
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  sectionLabel: { ...typography.label, color: colors.textSecondary, marginTop: spacing.xl, marginBottom: spacing.md, textTransform: 'uppercase', letterSpacing: 1 },
})
