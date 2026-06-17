import { HeaderBackButton } from "@/components/layout/header-back-button";
import React, { useState, useRef } from "react";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { Card } from "@/components/ui/card";
import { mockPersonalInfo, mockProfile } from "@/data/profile";
import { useProfile } from "@/hooks";
import { spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { uiStore } from "@/store/ui-store";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
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
  while (days.length < 42) {
    days.push(null);
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
  const { profile, updateAvatar } = useProfile();
  const navigation = useNavigation();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleCameraLaunch = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required to capture a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Camera launching error:", error);
    } finally {
      setShowUploadModal(false);
    }
  };

  const handleGalleryLaunch = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Gallery permission is required to select a photo.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Gallery launching error:", error);
    } finally {
      setShowUploadModal(false);
    }
  };

  const initialDate = parseDate(mockPersonalInfo.dateOfBirth);
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  // Helper to format Date to DD/MM/YYYY
  const formatDateToInput = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper to parse DD/MM/YYYY string to Date
  const parseInputToDate = (input: string): Date | null => {
    const parts = input.split("/");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const parsedDate = new Date(year, month, day);
        if (
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month &&
          parsedDate.getDate() === day
        ) {
          return parsedDate;
        }
      }
    }
    return null;
  };

  const [dobText, setDobText] = useState(formatDateToInput(selectedDate));

  const handleDobTextChange = (text: string) => {
    let cleaned = text.replace(/[^0-9]/g, "");
    if (cleaned.length > 8) {
      cleaned = cleaned.substring(0, 8);
    }
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2)}`;
    }
    if (cleaned.length > 4) {
      formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}/${cleaned.substring(4)}`;
    }
    setDobText(formatted);

    if (formatted.length === 10) {
      const parsed = parseInputToDate(formatted);
      if (parsed) {
        setSelectedDate(parsed);
      }
    }
  };

  const [selectedGender, setSelectedGender] = useState(mockPersonalInfo.gender);
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const initialFullName = profile?.name ?? `${mockPersonalInfo.firstName} ${mockPersonalInfo.lastName}`;
  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(profile?.phone ?? mockPersonalInfo.phone);
  const [email, setEmail] = useState(profile?.email ?? mockPersonalInfo.email);
  const [emergencyName, setEmergencyName] = useState(mockPersonalInfo.emergencyContact.name);
  const [emergencyPhone, setEmergencyPhone] = useState(mockPersonalInfo.emergencyContact.phone);
  const [address, setAddress] = useState(mockPersonalInfo.address);

  const fullNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const emergencyNameRef = useRef<TextInput>(null);
  const addressRef = useRef<TextInput>(null);

  const handleSaveChanges = () => {
    mockPersonalInfo.firstName = fullName.split(" ")[0] || "";
    mockPersonalInfo.lastName = fullName.split(" ").slice(1).join(" ") || "";
    mockPersonalInfo.phone = phone;
    mockPersonalInfo.email = email;
    mockPersonalInfo.gender = selectedGender;
    
    const parsed = parseInputToDate(dobText);
    if (!parsed) {
      alert("Please enter a valid Date of Birth (DD/MM/YYYY).");
      return;
    }
    
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    mockPersonalInfo.dateOfBirth = `${year}-${month}-${day}`;
    
    mockPersonalInfo.emergencyContact.name = emergencyName;
    mockPersonalInfo.emergencyContact.phone = emergencyPhone;
    mockPersonalInfo.address = address;

    mockProfile.name = fullName;
    mockProfile.phone = phone;
    mockProfile.email = email;

    uiStore.getState().showToast("Personal information updated successfully!", "success");
    navigation.goBack();
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
          <TouchableOpacity
            style={styles.cameraBtn}
            activeOpacity={0.8}
            onPress={() => setShowUploadModal(true)}
          >
            <View style={styles.cameraOuter}>
              <Ionicons name="camera-outline" size={17} color="#8259D2" />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Card style={styles.fieldCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput
                  ref={fullNameRef}
                  style={styles.inputField}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Full Name"
                  placeholderTextColor="#A0A3BD"
                />
              </View>
              <TouchableOpacity
                onPress={() => fullNameRef.current?.focus()}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.fieldCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  ref={phoneRef}
                  style={styles.inputField}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Phone Number"
                  placeholderTextColor="#A0A3BD"
                  keyboardType="phone-pad"
                />
              </View>
              <TouchableOpacity
                onPress={() => phoneRef.current?.focus()}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.fieldCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  ref={emailRef}
                  style={styles.inputField}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#A0A3BD"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <TouchableOpacity
                onPress={() => emailRef.current?.focus()}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.fieldCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Date of Birth (DD/MM/YYYY)</Text>
                <TextInput
                  style={styles.inputField}
                  value={dobText}
                  onChangeText={handleDobTextChange}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#A0A3BD"
                  keyboardType="numeric"
                  maxLength={10}
                />
              </View>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="calendar-outline" size={18} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

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
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Emergency Contact</Text>
                <View style={styles.contactRow}>
                  <TextInput
                    ref={emergencyNameRef}
                    style={[styles.inputField, { flex: 1 }]}
                    value={emergencyName}
                    onChangeText={setEmergencyName}
                    placeholder="Name"
                    placeholderTextColor="#A0A3BD"
                  />
                  <Text style={[styles.contactSeparator]}>-</Text>
                  <TextInput
                    style={[styles.inputField, { flex: 1.5 }]}
                    value={emergencyPhone}
                    onChangeText={setEmergencyPhone}
                    placeholder="Phone"
                    placeholderTextColor="#A0A3BD"
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              <TouchableOpacity
                onPress={() => emergencyNameRef.current?.focus()}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

          <Card style={styles.fieldCard}>
            <View style={styles.rowBetween}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                  ref={addressRef}
                  style={[styles.inputField, styles.addressInputField]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Address"
                  placeholderTextColor="#A0A3BD"
                  multiline
                />
              </View>
              <TouchableOpacity
                onPress={() => addressRef.current?.focus()}
                style={styles.iconBox}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil" size={16} color="#8259D2" />
              </TouchableOpacity>
            </View>
          </Card>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveWrap}
            onPress={handleSaveChanges}
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

      {/* Upload Image Selection Modal */}
      <Modal
        visible={showUploadModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUploadModal(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setShowUploadModal(false)}
        >
          <Pressable style={styles.genderSheet}>
            <Text style={styles.genderSheetTitle}>Upload Photo</Text>
            
            <TouchableOpacity
              style={[styles.genderOption, { backgroundColor: "#F5F0FF", marginBottom: 12 }]}
              activeOpacity={0.85}
              onPress={handleCameraLaunch}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="camera" size={20} color="#8259D2" />
                <Text style={[styles.genderOptionText, { fontFamily: "Poppins_600SemiBold", color: "#8259D2" }]}>
                  Take Photo
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8259D2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderOption, { backgroundColor: "#F5F0FF", marginBottom: 12 }]}
              activeOpacity={0.85}
              onPress={handleGalleryLaunch}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <Ionicons name="images" size={20} color="#8259D2" />
                <Text style={[styles.genderOptionText, { fontFamily: "Poppins_600SemiBold", color: "#8259D2" }]}>
                  Choose from Gallery
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8259D2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                {
                  backgroundColor: "#FFFFFF",
                  borderWidth: 1,
                  borderColor: "rgba(230,232,240,0.8)",
                  justifyContent: "center",
                },
              ]}
              activeOpacity={0.8}
              onPress={() => setShowUploadModal(false)}
            >
              <Text style={[styles.genderOptionText, { color: "#6B7280" }]}>Cancel</Text>
            </TouchableOpacity>
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
    height: 56,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
    color: "#1F2A5A",
  },
  headerRight: {
    width: 32,
  },
  scroll: {
    paddingBottom: 120,
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
  inputField: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F2A5A",
    padding: 0,
    marginTop: 2,
  },
  addressInputField: {
    minHeight: 44,
    textAlignVertical: "top",
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactSeparator: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#1F2A5A",
    marginHorizontal: 8,
  },
});
