export const colors = {
  primary: "#8259D2",
  primaryDark: "#6A44B8",
  primaryLight: "#A384DF",

  secondary: "#FF6B35",
  secondaryDark: "#D4551A",
  secondaryLight: "#FF9F6E",

  success: "#28A745",
  successLight: "#D4EDDA",
  warning: "#FFC107",
  warningLight: "#FFF3CD",
  error: "#DC3545",
  errorLight: "#F8D7DA",
  info: "#17A2B8",

  background: "#FFFFFF",
  backgroundSecondary: "#FFFFFF",
  backgroundTertiary: "#FFFFFF",

  text: "#1A1A2E",
  textSecondary: "#6C757D",
  textTertiary: "#ADB5BD",
  textInverse: "#FFFFFF",

  border: "#DEE2E6",
  borderLight: "#E9ECEF",
  divider: "#F0F0F0",

  tabInactive: "#ADB5BD",
  tabActive: "#8259D2",

  overlay: "rgba(0, 0, 0, 0.5)",
  shadow: "rgba(0, 0, 0, 0.08)",

  online: "#28A745",
  offline: "#DC3545",
  transit: "#FFC107",

  card: "#FFFFFF",
  cardBorder: "#E9ECEF",
  inputBackground: "#F8F9FA",
  inputBorder: "#DEE2E6",
  inputFocusBorder: "#8259D2",
  placeholder: "#ADB5BD",
} as const;

export type TColorKey = keyof typeof colors;
