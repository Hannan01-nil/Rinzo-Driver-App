import { useState } from "react";
import {
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import { mockDailySummaryData } from "@/data/dailySummaryData";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

function formatDate(date: Date): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function parseDate(dateStr: string | undefined): Date {
  if (!dateStr) return new Date(2024, 3, 24); // 24 Apr 2024
  const [d, mStr, y] = dateStr.split(" ");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const m = months.indexOf(mStr);
  return new Date(Number(y), m, Number(d));
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(year: number, month: number, day: number): boolean {
  const today = new Date();
  return (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  );
}

function CalendarGrid({
  selectedDate,
  onSelectDate,
  onClose,
}: {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onClose: () => void;
}) {
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const startDay = getFirstDayOfMonth(viewYear, viewMonth);

  const days: (number | null)[] = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear(viewYear - 1);
      setViewMonth(11);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear(viewYear + 1);
      setViewMonth(0);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <View style={calendarStyles.container}>
      <View style={calendarStyles.header}>
        <Text style={calendarStyles.headerTitle}>
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={calendarStyles.doneBtn}>Done</Text>
        </TouchableOpacity>
      </View>

      <View style={calendarStyles.nav}>
        <TouchableOpacity onPress={goToPrevMonth} style={calendarStyles.navBtn}>
          <Ionicons name="chevron-back" size={20} color="#081C3A" />
        </TouchableOpacity>
        <Text style={calendarStyles.navTitle}>
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={calendarStyles.navBtn}>
          <Ionicons name="chevron-forward" size={20} color="#081C3A" />
        </TouchableOpacity>
      </View>

      <View style={calendarStyles.weekRow}>
        {DAYS_OF_WEEK.map((d, i) => (
          <View key={`${d}-${i}`} style={calendarStyles.weekCell}>
            <Text style={calendarStyles.weekText}>{d}</Text>
          </View>
        ))}
      </View>

      <View style={calendarStyles.daysGrid}>
        {days.map((day, i) => {
          if (day === null) {
            return <View key={`empty-${i}`} style={calendarStyles.dayCell} />;
          }

          const dateObj = new Date(viewYear, viewMonth, day);
          const isSelected = isSameDay(dateObj, selectedDate);
          const isTodayDate = isToday(viewYear, viewMonth, day);

          return (
            <TouchableOpacity
              key={`day-${day}`}
              style={[
                calendarStyles.dayCell,
                isSelected && calendarStyles.dayCellSelected,
              ]}
              onPress={() => {
                onSelectDate(dateObj);
                onClose();
              }}
            >
              <Text
                style={[
                  calendarStyles.dayText,
                  isSelected && calendarStyles.dayTextSelected,
                  isTodayDate && !isSelected && calendarStyles.dayTextToday,
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export function DailySummaryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { reportDate, summaryStats, performanceScore } = mockDailySummaryData;

  const [selectedDate, setSelectedDate] = useState<Date>(parseDate(reportDate));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getIconName = (icon: string) => {
    if (icon === "car-outline") return "truck-outline";
    if (icon === "cash-outline") return "wallet-outline";
    if (icon === "warning-outline") return "alert-circle-outline";
    return icon;
  };

  const getSummaryIcon = (id: string) => {
    switch (id) {
      case "orders":
        return require("@/assets/images/summary_truck.png");
      case "distance":
        return require("@/assets/images/summary_map.png");
      case "hours":
        return require("@/assets/images/summary_clock.png");
      case "earnings":
        return require("@/assets/images/summary_cash.png");
      case "cancelled":
        return require("@/assets/images/summary_warning.png");
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Daily Summary</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Report Date Card */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setShowDatePicker(true)}
          style={styles.dateCard}
        >
          <View style={styles.dateCardLeft}>
            <Image
              source={require("@/assets/images/summary_calendar.png")}
              style={styles.summaryIconImage}
              resizeMode="contain"
            />
            <View style={styles.dateInfo}>
              <Text style={styles.dateLabel}>Report Date</Text>
              <Text style={styles.dateValue}>{formatDate(selectedDate)}</Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={18} color="#8D8797" />
        </TouchableOpacity>

        {/* Summary Metric Cards */}
        <View style={styles.metricsList}>
          {summaryStats.map((stat) => (
            <View key={stat.id} style={styles.metricCard}>
              <View style={styles.metricLeft}>
                {getSummaryIcon(stat.id) ? (
                  <Image
                    source={getSummaryIcon(stat.id)}
                    style={styles.summaryIconImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={[
                      styles.iconContainer,
                      stat.id === "cancelled" && styles.cancelledIconContainer,
                    ]}
                  >
                    <Ionicons
                      name="alert-circle-outline"
                      size={18}
                      color={stat.id === "cancelled" ? "#FF4D4F" : "#8259D2"}
                    />
                  </View>
                )}
                <View style={styles.metricInfo}>
                  <Text style={styles.metricLabel}>{stat.label}</Text>
                  <Text
                    style={[
                      styles.metricValue,
                      stat.isEarnings && styles.earningsValue,
                    ]}
                  >
                    {stat.value}
                  </Text>
                </View>
              </View>
              {stat.isEarnings && (
                <Ionicons name="trending-up" size={16} color="#16A34A" />
              )}
            </View>
          ))}
        </View>

        {/* Performance Banner */}
        <ImageBackground
          source={require("@/assets/images/performanceScoreBanner.png")}
          style={styles.bannerBackground}
          imageStyle={{ borderRadius: 20 }}
          resizeMode="cover"
        >
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Performance Score</Text>
            <Text style={styles.bannerScore}>{performanceScore}</Text>
            <Text numberOfLines={2} style={styles.bannerSubtitle}>
              You are in the top 5% of drivers today!
            </Text>
          </View>
        </ImageBackground>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>
            navigation.navigate("performance/daily-details", {
              date: formatDate(selectedDate),
            })
          }
        >
          <LinearGradient
            colors={["#8259D2", "#6A44B8"]}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>View Details</Text>
              <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>

      {/* Custom Calendar Modal */}
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowDatePicker(false)}
        >
          <Pressable style={styles.dateSheetWrap}>
            <CalendarGrid
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
              onClose={() => setShowDatePicker(false)}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E9E7F2",
    backgroundColor: "#F8F9FF",
  },
  headerRight: {
    width: 26,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#081C3A",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F9FF",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },
  dateCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 72,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F0EDF7",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginBottom: 16,
  },
  dateCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F4EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dateInfo: {
    justifyContent: "center",
  },
  dateLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#6F6B78",
    lineHeight: 16,
  },
  dateValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 20,
    color: "#081C3A",
    lineHeight: 24,
  },
  metricsList: {
    marginBottom: 4,
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 72,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#F0EDF7",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
    marginBottom: 12,
  },
  metricLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4EEFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  earningsIconContainer: {
    backgroundColor: "#8259D2",
  },
  cancelledIconContainer: {
    backgroundColor: "#FFEBEB",
  },
  summaryIconImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  metricInfo: {
    justifyContent: "center",
  },
  metricLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#6F6B78",
    lineHeight: 16,
  },
  metricValue: {
    fontFamily: "Poppins_700Bold",
    fontSize: 18,
    color: "#081C3A",
    lineHeight: 22,
  },
  earningsValue: {
    color: "#8259D2",
  },
  bannerBackground: {
    height: 170,
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 4,
    marginBottom: 16,
  },
  bannerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
  },
  bannerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
    marginBottom: 2,
  },
  bannerScore: {
    fontFamily: "Poppins_700Bold",
    fontSize: 44,
    color: "#FFFFFF",
    lineHeight: 48,
  },
  bannerSubtitle: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#FFFFFF",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 2,
  },
  button: {
    height: 56,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#8259D2",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  buttonInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#FFFFFF",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  dateSheetWrap: {},
});

const calendarStyles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#081C3A",
  },
  doneBtn: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#8259D2",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  navBtn: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  navTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#081C3A",
  },
  weekRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  weekCell: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 32,
  },
  weekText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#A0A3BD",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
  dayCell: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 40,
  },
  dayCellSelected: {
    backgroundColor: "#8259D2",
    borderRadius: 20,
  },
  dayText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    color: "#081C3A",
  },
  dayTextSelected: {
    color: "#FFFFFF",
    fontFamily: "Poppins_600SemiBold",
  },
  dayTextToday: {
    color: "#8259D2",
    fontFamily: "Poppins_600SemiBold",
  },
});
