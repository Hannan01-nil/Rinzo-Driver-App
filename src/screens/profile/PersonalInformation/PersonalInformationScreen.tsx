import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Header } from '@/components/layout/header'
import { Card, Button, TextInput } from '@/components/ui'
import { useProfile } from '@/hooks'
import { colors, typography, spacing } from '@/theme'

export function PersonalInformationScreen() {
  const { profile } = useProfile()

  return (
    <ScreenWrapper>
      <Header title="Personal Information" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <TextInput label="Full Name" value={profile?.name ?? ''} onChangeText={() => {}} />
          <TextInput label="Email" value={profile?.email ?? ''} onChangeText={() => {}} keyboardType="email-address" />
          <TextInput label="Phone" value={profile?.phone ?? ''} onChangeText={() => {}} keyboardType="phone-pad" disabled />
          <Button title="Save Changes" onPress={() => {}} fullWidth />
        </Card>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
})
