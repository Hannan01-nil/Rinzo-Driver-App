import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View, TouchableOpacity, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { uiStore } from "@/store/ui-store";

export function Toast() {
  const toast = uiStore((state) => state.toast);
  const hideToast = uiStore((state) => state.hideToast);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    if (toast) {
      // Reset animations
      fadeAnim.setValue(0);
      slideAnim.setValue(-40);

      // Animate in
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 2.5 seconds
      const timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -20,
            duration: 250,
            useNativeDriver: true,
          }),
        ]).start(() => {
          hideToast();
        });
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  const isError = toast.type === "error";

  // Harmonic themed colors matching Poppins premium aesthetics
  const bgColor = isSuccess ? "#F0FDF4" : isError ? "#FEF2F2" : "#EFF6FF";
  const borderColor = isSuccess ? "#BBF7D0" : isError ? "#FCA5A5" : "#BFDBFE";
  const iconName = isSuccess
    ? "checkmark-circle"
    : isError
    ? "alert-circle"
    : "information-circle";
  const iconColor = isSuccess ? "#16A34A" : isError ? "#DC2626" : "#2563EB";
  const textColor = isSuccess ? "#14532D" : isError ? "#7F1D1D" : "#1E3A8A";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.content, { backgroundColor: bgColor, borderColor: borderColor }]}>
        <Ionicons name={iconName} size={22} color={iconColor} style={styles.icon} />
        <Text style={[styles.message, { color: textColor }]}>{toast.message}</Text>
        <TouchableOpacity onPress={hideToast} style={styles.closeBtn} activeOpacity={0.7}>
          <Ionicons name="close" size={18} color={textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    right: 20,
    zIndex: 99999,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    lineHeight: 20,
  },
  closeBtn: {
    marginLeft: 8,
    padding: 2,
  },
});
