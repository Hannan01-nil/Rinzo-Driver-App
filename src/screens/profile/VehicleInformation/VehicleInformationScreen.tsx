import { useState } from "react";
import { HeaderBackButton } from "@/components/layout/header-back-button";
import { ScreenWrapper } from "@/components/layout/screen-wrapper";
import { Card } from "@/components/ui/card";
import { mockVehicleInfo, mockVehicleDetails } from "@/data/profile";
import { useProfile } from "@/hooks";
import { spacing } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { uiStore } from "@/store/ui-store";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  Modal,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const CARD_RADIUS = 18;

export function VehicleInformationScreen() {
  const { vehicle, updateVehicleImage } = useProfile();
  const navigation = useNavigation();
  const [showUploadModal, setShowUploadModal] = useState(false);

  const data = {
    type: vehicle?.type ?? mockVehicleInfo.type,
    model: vehicle?.model ?? mockVehicleInfo.model,
    color: vehicle?.color ?? mockVehicleInfo.color,
    licensePlate: vehicle?.licensePlate ?? mockVehicleInfo.licensePlate,
    isVerified: vehicle?.isVerified ?? mockVehicleInfo.isVerified,
    registrationNumber: mockVehicleDetails.registrationNumber,
    insuranceValidTill: mockVehicleDetails.insuranceValidTill,
  };

  const handleCameraLaunch = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera permission is required to capture a photo.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await updateVehicleImage(result.assets[0].uri);
        uiStore.getState().showToast("Vehicle photo uploaded successfully!", "success");
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
        Alert.alert("Permission Denied", "Gallery permission is required to select a photo.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.[0]?.uri) {
        await updateVehicleImage(result.assets[0].uri);
        uiStore.getState().showToast("Vehicle photo selected successfully!", "success");
      }
    } catch (error) {
      console.error("Gallery launching error:", error);
    } finally {
      setShowUploadModal(false);
    }
  };

  const handleImageSelect = () => {
    setShowUploadModal(true);
  };

  return (
    <ScreenWrapper noPadding>
      <View style={styles.header}>
        <HeaderBackButton />
        <Text style={styles.headerTitle}>Vehicle Information</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Card */}
        <View style={styles.content}>
          <View style={styles.heroCard}>
            {vehicle.image ? (
              <>
                <Image source={{ uri: vehicle.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                <View style={styles.imageOverlay} />
              </>
            ) : (
              <View style={styles.heroImageWrap}>
                <Ionicons name="bicycle-outline" size={110} color="#6BB5B8" />
              </View>
            )}
            <View style={styles.heroTopRight}>
              <View style={styles.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#16A34A" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
              <Text style={[styles.activeLabel, vehicle.image && styles.activeLabelLight]}>Active Vehicle</Text>
            </View>
          </View>

          {/* Detail Cards */}
          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Vehicle Type</Text>
            <Text style={styles.value}>
              {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
            </Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Registration Number</Text>
            <Text style={styles.value}>{data.registrationNumber}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Model</Text>
            <Text style={styles.value}>{data.model}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Color</Text>
            <Text style={styles.value}>{data.color}</Text>
          </Card>

          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Insurance Valid Till</Text>
            <Text style={styles.value}>{data.insuranceValidTill}</Text>
          </Card>

          {/* Vehicle Photo Section */}
          <Card style={styles.fieldCard}>
            <Text style={styles.label}>Vehicle Photo</Text>
            <View style={styles.photoRow}>
              {vehicle.image ? (
                <View style={styles.photoContainer}>
                  <Image source={{ uri: vehicle.image }} style={styles.photoPreview} />
                  <View style={styles.photoActions}>
                    <TouchableOpacity style={styles.changeBtn} onPress={handleImageSelect}>
                      <Ionicons name="camera-outline" size={16} color="#8259D2" />
                      <Text style={styles.changeBtnText}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => {
                        updateVehicleImage(undefined);
                        uiStore.getState().showToast("Vehicle photo removed!", "info");
                      }}
                    >
                      <Ionicons name="trash-outline" size={18} color="#DC3545" />
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <TouchableOpacity style={styles.uploadPlaceholder} onPress={handleImageSelect}>
                  <Ionicons name="cloud-upload-outline" size={28} color="#8259D2" />
                  <Text style={styles.uploadText}>Upload Vehicle Image</Text>
                  <Text style={styles.uploadSubtext}>Supports JPG, PNG (Max 5MB)</Text>
                </TouchableOpacity>
              )}
            </View>
          </Card>

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.saveWrap}
            onPress={() => {
              uiStore.getState().showToast("Vehicle info updated successfully!", "success");
              navigation.goBack();
            }}
          >
            <LinearGradient
              colors={["#8259D2", "#8259D2"]}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>Update Vehicle Info</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
          <Pressable style={styles.sheetContainer} onPress={(e) => e.stopPropagation()}>
            <Text style={styles.sheetTitle}>Upload Vehicle Photo</Text>
            
            <TouchableOpacity
              style={styles.sheetOption}
              activeOpacity={0.85}
              onPress={handleCameraLaunch}
            >
              <View style={styles.sheetOptionLeft}>
                <Ionicons name="camera" size={20} color="#8259D2" />
                <Text style={styles.sheetOptionText}>
                  Take Photo
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8259D2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetOption}
              activeOpacity={0.85}
              onPress={handleGalleryLaunch}
            >
              <View style={styles.sheetOptionLeft}>
                <Ionicons name="images" size={20} color="#8259D2" />
                <Text style={styles.sheetOptionText}>
                  Choose from Gallery
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#8259D2" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.sheetCancelOption}
              activeOpacity={0.8}
              onPress={() => setShowUploadModal(false)}
            >
              <Text style={styles.sheetCancelText}>Cancel</Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  heroCard: {
    backgroundColor: "#C8F1F3",
    borderRadius: 24,
    height: 200,
    marginBottom: 20,
    position: "relative",
    overflow: "hidden",
  },
  heroTopRight: {
    position: "absolute",
    top: 14,
    right: 14,
    alignItems: "flex-end",
    zIndex: 2,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFF7E6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    gap: 4,
    marginBottom: 4,
  },
  verifiedText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
    color: "#16A34A",
  },
  activeLabel: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#374151",
  },
  heroImageWrap: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "60%",
    height: "85%",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    paddingLeft: 12,
    paddingBottom: 8,
  },
  fieldCard: {
    marginBottom: 14,
    borderRadius: CARD_RADIUS,
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontSize: 13,
    color: "#98A2B3",
    marginBottom: 4,
  },
  value: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#27315B",
  },
  saveWrap: {
    marginTop: 8,
    marginBottom: spacing.sm,
  },
  saveButton: {
    height: 56,
    borderRadius: 20,
    marginTop: 5,
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
  activeLabelLight: {
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  photoRow: {
    marginTop: 8,
  },
  photoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  photoPreview: {
    width: 80,
    height: 45,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  photoActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  changeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "#8259D2",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  changeBtnText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
    color: "#8259D2",
  },
  deleteBtn: {
    padding: 6,
  },
  uploadPlaceholder: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#8259D2",
    backgroundColor: "#FAF9FF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
    color: "#8259D2",
    marginTop: 6,
  },
  uploadSubtext: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 32,
    paddingHorizontal: 20,
  },
  sheetTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#1F2A5A",
    textAlign: "center",
    marginBottom: 16,
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F5F0FF",
    marginBottom: 12,
  },
  sheetOptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sheetOptionText: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#8259D2",
  },
  sheetCancelOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(230,232,240,0.8)",
  },
  sheetCancelText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#6B7280",
  },
});
