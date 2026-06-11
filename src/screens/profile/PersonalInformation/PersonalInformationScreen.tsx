import { HeaderBackButton } from "@/components/layout/header-back-button";
import { useState } from "react";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { Card } from "@/components/ui/card";
import { mockPersonalInfo } from "@/data/profile";
import { useProfile } from "@/hooks";
import { spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const AVATAR_SIZE = 110;
const CAMERA_SIZE = 40;
const CARD_RADIUS = 18;
const GENDER_OPTIONS = ["Male", "Female"];

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
  if (!dateStr) return new Date(1995, 7, 12);
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
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
          <Ionicons name="chevron-back" size={20} color="#1F2A5A" />
        </TouchableOpacity>
        <Text style={calendarStyles.navTitle}>
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity onPress={goToNextMonth} style={calendarStyles.navBtn}>
          <Ionicons name="chevron-forward" size={20} color="#1F2A5A" />
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
    color: "#1F2A5A",
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
    color: "#1F2A5A",
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
    color: "#1F2A5A",
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

export function PersonalInformationScreen() {
  const { profile } = useProfile();
  const navigation = useNavigation();

  const initialDate = parseDate(mockPersonalInfo.dateOfBirth);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [selectedGender, setSelectedGender] = useState(mockPersonalInfo.gender);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const data = {
    fullName:
      profile?.name ??
      `${mockPersonalInfo.firstName} ${mockPersonalInfo.lastName}`,
    phone: profile?.phone ?? mockPersonalInfo.phone,
    email: profile?.email ?? mockPersonalInfo.email,
    emergency: mockPersonalInfo.emergencyContact,
    address: mockPersonalInfo.address,
  };

  return (
    <ScreenWrapper noPadding>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Personal Information</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatarWrap}>
          <Image source={{ uri: profile?.avatar }} style={styles.avatar} />
          <TouchableOpacity style={styles.cameraBtn} activeOpacity={0.8}>
            <View style={styles.cameraOuter}>
              <Ionicons name="camera-outline" size={17} color="#8B5CF6" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{data.fullName}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{data.phone}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{data.email}</Text>
          </Card>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowDatePicker(true)}
          >
            <Card style={styles.fieldCard}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.label}>Date of Birth</Text>
                  <Text style={styles.value}>{formatDate(selectedDate)}</Text>
                </View>
                <View style={styles.iconBox}>
                  <Ionicons name="calendar-outline" size={16} color="#A0A3BD" />
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowGenderPicker(true)}
          >
            <Card style={styles.fieldCard}>
              <View style={styles.rowBetween}>
                <View>
                  <Text style={styles.label}>Gender</Text>
                  <Text style={styles.value}>{selectedGender}</Text>
                </View>
                <View style={styles.iconBox}>
                  <Ionicons name="chevron-down" size={14} color="#8259D2" />
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Emergency Contact</Text>
            <Text style={styles.value}>
              {data.emergency?.name} - {data.emergency?.phone}
            </Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Address</Text>
            <Text style={[styles.value, styles.addressValue]}>
              {data.address}
            </Text>
          </Card>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveWrap}
            onPress={() => navigation.goBack()}
          >
            <LinearGradient
              colors={["#8259D2", "#8259D2"]}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Gender Picker Modal */}
      <Modal
        visible={showGenderPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGenderPicker(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowGenderPicker(false)}
        >
          <Pressable style={styles.genderSheet}>
            <Text style={styles.genderSheetTitle}>Select Gender</Text>
            {GENDER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.genderOption,
                  option === selectedGender && styles.genderOptionActive,
                ]}
                onPress={() => {
                  setSelectedGender(option);
                  setShowGenderPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.genderOptionText,
                    option === selectedGender && styles.genderOptionTextActive,
                  ]}
                >
                  {option}
                </Text>
                {option === selectedGender && (
                  <Ionicons name="checkmark" size={20} color="#8259D2" />
                )}
              </TouchableOpacity>
            ))}
          </Pressable>
        </Pressable>
      </Modal>

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
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    paddingHorizontal: 16,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F2A5A",
  },
  headerRight: {
    width: 32,
  },
  scroll: {
    paddingBottom: 52,
  },
  avatarWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
    position: "relative",
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    alignSelf: "center",
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  cameraBtn: {
    position: "absolute",
    right: -6,
    bottom: 2,
  },
  cameraOuter: {
    width: CAMERA_SIZE,
    height: CAMERA_SIZE,
    borderRadius: CAMERA_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  fieldCard: {
    marginBottom: 12,
    borderRadius: CARD_RADIUS,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#A0A3BD",
    marginBottom: 4,
  },
  value: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F2A5A",
  },
  addressValue: {
    lineHeight: 22,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconBox: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  saveWrap: {
    marginTop: 14,
    marginBottom: 4,
  },
  saveButton: {
    height: 56,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C5CE5",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  saveText: {
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  genderSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  genderSheetTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F2A5A",
    textAlign: "center",
    marginBottom: 16,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 4,
  },
  genderOptionActive: {
    backgroundColor: "#F5F0FF",
  },
  genderOptionText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#1F2A5A",
  },
  genderOptionTextActive: {
    fontFamily: "Poppins_600SemiBold",
    color: "#8259D2",
  },
  dateSheetWrap: {},
});
