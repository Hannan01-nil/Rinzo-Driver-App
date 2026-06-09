import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenWrapper } from '@/components/layout/screen-wrapper'
import { Card } from '@/components/ui'
import { useProfile } from '@/hooks'
import { colors, typography, spacing, borderRadius } from '@/theme'

const MENU_SECTIONS = [
  {
    title: 'Account',
    items: [
      { label: 'Personal Information', route: 'personal-information', icon: '👤' },
      { label: 'Vehicle Information', route: 'vehicle-information', icon: '🛵' },
      { label: 'Documents', route: 'documents/index', icon: '📄' },
    ],
  },
  {
    title: 'Finance',
    items: [
      { label: 'Bank Details', route: 'finance/bank-details', icon: '🏦' },
    ],
  },
  {
    title: 'Performance',
    items: [
      { label: 'Performance', route: 'performance/index', icon: '📊' },
      { label: 'Bonus & Incentives', route: 'performance/bonus-incentives', icon: '🎯' },
      { label: 'Daily Summary', route: 'performance/daily-summary', icon: '📅' },
    ],
  },
  {
    title: 'Support',
    items: [
      { label: 'Contact Support', route: 'support/contact', icon: '💬' },
    ],
  },
]

interface MenuItemProps {
  label: string
  icon: string
  onPress: () => void
}

function MenuItem({ label, icon, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Text style={styles.menuIcon}>{icon}</Text>
      <Text style={styles.menuLabel}>{label}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  )
}

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const { profile } = useProfile()

  return (
    <ScreenWrapper>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.navigate('personal-information')}
          style={styles.profileHeader}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {profile?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) ?? 'R'}
            </Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profile?.name ?? 'Driver'}</Text>
            <Text style={styles.profileRating}>★ {profile?.rating ?? 0}</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        {MENU_SECTIONS.map((section, idx) => (
          <View key={idx} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Card padded={false}>
              {section.items.map((item, itemIdx) => (
                <View key={itemIdx}>
                  <MenuItem
                    label={item.label}
                    icon={item.icon}
                    onPress={() => navigation.navigate(item.route as any)}
                  />
                  {itemIdx < section.items.length - 1 && <View style={styles.divider} />}
                </View>
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  scroll: { paddingBottom: spacing.xxl },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xxl },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 24, fontWeight: '700', color: colors.textInverse },
  profileInfo: { flex: 1, marginLeft: spacing.lg },
  profileName: { ...typography.h4, color: colors.text },
  profileRating: { ...typography.bodySmall, color: colors.warning, marginTop: spacing.xxs },
  chevron: { fontSize: 24, color: colors.textTertiary },
  section: { marginBottom: spacing.xl },
  sectionTitle: { ...typography.label, color: colors.textSecondary, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
  menuIcon: { fontSize: 20, marginRight: spacing.md },
  menuLabel: { ...typography.body, color: colors.text, flex: 1 },
  divider: { height: 1, backgroundColor: colors.divider, marginLeft: 52 },
})
