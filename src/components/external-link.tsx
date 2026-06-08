import { Text, StyleSheet } from 'react-native'
import { colors } from '@/theme'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  asChild?: boolean
}

export function ExternalLink({ href: _href, children, asChild: _asChild }: ExternalLinkProps) {
  return <Text style={styles.link}>{children}</Text>
}

const styles = StyleSheet.create({
  link: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
})
