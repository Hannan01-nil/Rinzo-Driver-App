import { View, Text, StyleSheet } from 'react-native'
import { colors, typography, spacing } from '@/theme'

interface BarChartProps {
  data: { label: string; value: number }[]
  barColor?: string
  height?: number
}

export function BarChart({ data, barColor = colors.primary, height = 120 }: BarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value), 1)

  return (
    <View style={styles.container}>
      <View style={[styles.chartArea, { height }]}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * (height - 20)
          return (
            <View key={index} style={styles.barColumn}>
              <Text style={styles.barValue}>{item.value}</Text>
              <View
                style={[
                  styles.bar,
                  {
                    height: Math.max(barHeight, 4),
                    backgroundColor: barColor,
                  },
                ]}
              />
              <Text style={styles.barLabel}>{item.label}</Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '60%',
    minWidth: 16,
    maxWidth: 40,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barValue: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  barLabel: {
    ...typography.caption,
    color: colors.textTertiary,
    marginTop: 4,
  },
})
