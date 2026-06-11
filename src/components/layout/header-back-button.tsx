import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HeaderBackButtonProps {
  onPress?: () => void;
}

export function HeaderBackButton({ onPress }: HeaderBackButtonProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : navigation.goBack())}
      style={styles.container}
      activeOpacity={0.7}
    >
      <Ionicons name="chevron-back-sharp" size={20} color="#797878" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    borderRadius: 999,
    borderColor: "#E0E0E0",
    borderWidth: 0.5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 3,
  },
});
