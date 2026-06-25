import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSafeAreaInsets, SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import { mockAttendanceActivityData, CalendarDay } from "@/data/performance";

const { width: screenWidth } = Dimensions.get("window");
const cellWidth = (screenWidth - 40) / 7; // Calendar cell width based on 20px horizontal margins

export function AttendanceActivityScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const data = mockAttendanceActivityData;

  // Chunk the 42 days of the calendar grid into 6 rows of 7 days
  const calendarRows: CalendarDay[][] = [];
  for (let i = 0; i < data.calendar.length; i += 7) {
    calendarRows.push(data.calendar.slice(i, i + 7));
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeftButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="chevron-back" size={24} color="#1F1F1F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance & Activity</Text>
        <View style={styles.headerRightSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 120 }, // Dynamic offset to float above bottom tab bar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Attendance Summary Card */}
        <Animated.View
          entering={FadeInUp.duration(400)}
          style={styles.summaryCard}
        >
          {/* Card Top */}
          <View style={styles.summaryCardTop}>
            <View>
              <Text style={styles.summaryMonth}>{data.attendance.month}</Text>
              <Text style={styles.summaryLabel}>{data.attendance.amountLabel}</Text>
            </View>
            <View style={styles.iconCircleContainer}>
              <Ionicons name="calendar-sharp" size={20} color="#1F1F1F" />
            </View>
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* Stats Grid (3 Columns) */}
          <View style={styles.statsRow}>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: "#22C55E" }]}>
                {data.attendance.presentDays}
              </Text>
              <Text style={styles.statLabelText}>Present Days</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: "#EF4444" }]}>
                {data.attendance.absentDays}
              </Text>
              <Text style={styles.statLabelText}>Absent Days</Text>
            </View>
            <View style={styles.statColumn}>
              <Text style={[styles.statValue, { color: "#6F4BFF" }]}>
                {data.attendance.leaveDays}
              </Text>
              <Text style={styles.statLabelText}>Leave Days</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* Attendance Rate Row */}
          <View style={styles.rateRow}>
            <Text style={styles.rateLabel}>Attendance Rate</Text>
            <Text style={styles.rateValue}>{data.attendance.rate}</Text>
          </View>
        </Animated.View>

        {/* Monthly Calendar Header */}
        <Animated.View entering={FadeInUp.duration(400).delay(100)}>
          <Text style={styles.sectionTitle}>Monthly Calendar</Text>
        </Animated.View>

        {/* Calendar Card Container */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(150)}
          style={styles.calendarCard}
        >
          {/* Weekday Header */}
          <View style={styles.weekHeaderRow}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
              (day, index) => (
                <Text key={index} style={styles.weekDayText}>
                  {day}
                </Text>
              )
            )}
          </View>

          {/* Date Cells Grid */}
          <View style={styles.calendarGrid}>
            {calendarRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.gridRow}>
                {row.map((day, cellIndex) => (
                  <View key={cellIndex} style={styles.calendarCell}>
                    <View
                      style={[
                        styles.dayCircle,
                        day.status === "present" && styles.dayPresentCircle,
                        day.status === "absent" && styles.dayAbsentCircle,
                        day.status === "leave" && styles.dayLeaveCircle,
                        day.status === "today" && styles.dayTodayCircle,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          !day.isCurrentMonth && styles.dayTextInactive,
                          day.status === "present" && styles.dayTextPresent,
                          day.status === "absent" && styles.dayTextAbsent,
                          day.status === "leave" && styles.dayTextLeave,
                          day.status === "today" && styles.dayTextToday,
                        ]}
                      >
                        {day.dayNumber}
                      </Text>
                    </View>
                    <View style={styles.dotSpacer}>
                      {(day.status === "present" || day.status === "absent") && (
                        <View
                          style={[
                            styles.dayDot,
                            day.status === "present" && styles.dayPresentDot,
                            day.status === "absent" && styles.dayAbsentDot,
                          ]}
                        />
                      )}
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Activity Summary Title */}
        <Animated.View entering={FadeInUp.duration(400).delay(200)}>
          <Text style={styles.sectionTitle}>Activity Summary</Text>
        </Animated.View>

        {/* Activity Grid Cards */}
        <Animated.View
          entering={FadeInUp.duration(400).delay(250)}
          style={styles.activityRow}
        >
          {/* Card 1 */}
          <View style={styles.activityCard}>
            <View style={styles.activityCardHeader}>
              <Text style={styles.activityCardTitle}>Total Working Hours</Text>
              <Ionicons name="time-outline" size={20} color="#8E8E93" />
            </View>
            <Text style={[styles.activityCardValue, { fontSize: 28 }]}>
              {data.activity.totalWorkingHours}
            </Text>
          </View>

          {/* Card 2 */}
          <View style={styles.activityCard}>
            <View style={styles.activityCardHeader}>
              <Text style={styles.activityCardTitle}>
                Average Working Hours
              </Text>
              <Ionicons name="bar-chart-outline" size={20} color="#8E8E93" />
            </View>
            <Text style={[styles.activityCardValue, { fontSize: 24 }]}>
              {data.activity.averageWorkingHours}
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 56,
    backgroundColor: "#FFFFFF",
  },
  headerLeftButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
    color: "#1F1F1F",
  },
  headerRightSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryMonth: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    lineHeight: 14,
  },
  summaryLabel: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#1F1F1F",
    marginTop: 2,
    lineHeight: 16,
  },
  iconCircleContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1F3F9",
    alignItems: "center",
    justifyContent: "center",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F2F2F7",
    marginVertical: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statColumn: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 28,
    lineHeight: 32,
  },
  statLabelText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
    lineHeight: 14,
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rateLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1F1F1F",
  },
  rateValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 24,
    color: "#6F4BFF",
    lineHeight: 28,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F1F1F",
    marginTop: 24,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  calendarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  weekHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  weekDayText: {
    width: (screenWidth - 72) / 7,
    textAlign: "center",
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
  },
  calendarGrid: {
    paddingHorizontal: 16,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  calendarCell: {
    width: (screenWidth - 72) / 7,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPresentCircle: {
    backgroundColor: "#E6F7EF",
  },
  dayAbsentCircle: {
    backgroundColor: "#FEE2E2",
  },
  dayLeaveCircle: {
    backgroundColor: "#EFE7FF",
  },
  dayTodayCircle: {
    backgroundColor: "#6F4BFF",
  },
  dayText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#1F1F1F",
    lineHeight: 18,
  },
  dayTextInactive: {
    color: "#CBD5E1",
  },
  dayTextPresent: {
    color: "#22C55E",
  },
  dayTextAbsent: {
    color: "#EF4444",
  },
  dayTextLeave: {
    color: "#6F4BFF",
  },
  dayTextToday: {
    color: "#FFFFFF",
    fontFamily: "Poppins_700Bold",
  },
  dotSpacer: {
    height: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  dayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dayPresentDot: {
    backgroundColor: "#22C55E",
  },
  dayAbsentDot: {
    backgroundColor: "#EF4444",
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 12,
  },
  activityCard: {
    width: (screenWidth - 40 - 12) / 2,
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2F2F7",
    backgroundColor: "#FFFFFF",
    padding: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.01,
    shadowRadius: 6,
    elevation: 2,
  },
  activityCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  activityCardTitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8E8E93",
    flex: 1,
    marginRight: 4,
    lineHeight: 16,
  },
  activityCardValue: {
    fontFamily: "Poppins_700Bold",
    color: "#1F1F1F",
  },
});
