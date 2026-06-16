import { HeaderBackButton } from "@/components/layout/header-back-button";
import { CommonActions, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ProfileStackParamList } from "@/types/navigation";
import { useState, useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function ReportIssueScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ProfileStackParamList>>();
  const [selectedType, setSelectedType] = useState("customer_unavailable");
  const [description, setDescription] = useState("");
  const inputRef = useRef<TextInput>(null);

  const issueTypes = [
    { id: "customer_unavailable", label: "Customer Unavailable" },
    { id: "wrong_address", label: "Wrong Address" },
    { id: "items_missing", label: "Order Items Missing" },
    { id: "payment_issue", label: "Payment Issue" },
    { id: "vehicle_problem", label: "Vehicle Problem" },
    { id: "other_issue", label: "Other Issue" },
  ];

  const handleSubmit = () => {
    const ticketId = `#REP-${Math.floor(10000 + Math.random() * 90000)}-ZV`;
    console.log("handleSubmit: Navigating with ticketId", ticketId);
    try {
      navigation.navigate("support/report-submitted", { ticketId });
    } catch (error: any) {
      console.error("Navigation error:", error);
      Alert.alert("Navigation Error", error?.message || String(error));
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Report Issue</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Select Issue Type */}
          <Text style={styles.sectionTitle}>Select Issue Type</Text>
          <View style={styles.optionsContainer}>
            {issueTypes.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionCard}
                activeOpacity={0.7}
                onPress={() => setSelectedType(item.id)}
              >
                <Text style={styles.optionLabel}>{item.label}</Text>

                {/* Custom Radio Button */}
                <View
                  style={[
                    styles.radioCircle,
                    selectedType === item.id && styles.radioCircleSelected,
                  ]}
                >
                  {selectedType === item.id && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Describe the Issue */}
          <Text style={styles.sectionTitle}>Describe the issue</Text>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.inputContainer,
              description.length === 0 && styles.inputContainerCentered,
            ]}
            onPress={() => inputRef.current?.focus()}
          >
            <TextInput
              ref={inputRef}
              style={[
                styles.textInput,
                description.length > 0 && styles.textInputTopAligned,
              ]}
              multiline
              placeholder="Please provide more details about the issue you are facing..."
              placeholderTextColor="#6B7280"
              value={description}
              onChangeText={(text) => {
                if (text.length <= 250) {
                  setDescription(text);
                }
              }}
              textAlignVertical={description.length === 0 ? "center" : "top"}
            />
          </TouchableOpacity>
          <Text style={styles.charCount}>{description.length}/250</Text>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.8}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Submit Report</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F8F7FC",
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#F8F7FC",
    borderBottomWidth: 1,
    borderBottomColor: "#ECEAF3",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 22,
    color: "#111827",
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#111827",
    marginTop: 14,
    marginBottom: 12,
    marginLeft: 10,
  },
  optionsContainer: {
    marginBottom: 8,
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  optionLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 15,
    color: "#111827",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#C7C7CC",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  radioCircleSelected: {
    borderColor: "#8259D2",
    backgroundColor: "#8259D2",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  inputContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    minHeight: 150,
    paddingHorizontal: 24,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  inputContainerCentered: {
    justifyContent: "center",
  },
  textInput: {
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "#111827",
    padding: 0, // Reset default padding
  },
  textInputTopAligned: {
    minHeight: 118,
    textAlignVertical: "top",
  },
  charCount: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#4A4452",
    textAlign: "right",
    marginTop: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#8259D2",
    borderRadius: 16,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8259D2",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  submitButtonText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
