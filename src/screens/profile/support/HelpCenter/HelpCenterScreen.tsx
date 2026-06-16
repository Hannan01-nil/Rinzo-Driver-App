import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "@/components/layout/header-back-button";

export function HelpCenterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "payments",
      title: "Payments",
      subtitle: "Earnings, wallet & cashouts",
      icon: require("@/assets/images/help_payments.png"),
    },
    {
      id: "orders",
      title: "Orders",
      subtitle: "Pickups & delivery issues",
      icon: require("@/assets/images/help_orders.png"),
    },
    {
      id: "documents",
      title: "Documents",
      subtitle: "Verification & uploads",
      icon: require("@/assets/images/help_documents.png"),
    },
    {
      id: "account",
      title: "Account",
      subtitle: "Login, profile & settings",
      icon: require("@/assets/images/help_account.png"),
    },
    {
      id: "general",
      title: "General",
      subtitle: "App info & common questions",
      icon: require("@/assets/images/help_general.png"),
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryPress = (categoryId: string) => {
    // Navigate to specific category or ContactSupport for now
    navigation.navigate("support/contact");
  };

  const handleLiveSupportPress = () => {
    navigation.navigate("support/contact");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <HeaderBackButton />
          <Text style={styles.headerTitle}>Help Center</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Subheader */}
        <Text style={styles.subheaderText}>
          How can we help you today, Partner?
        </Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for help topics"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Category List */}
        {filteredCategories.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={styles.emptySubtitle}>
              We couldn't find any help topics for "{searchQuery}".
            </Text>
          </View>
        ) : (
          <View style={styles.categoriesContainer}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Image
                  source={category.icon}
                  style={styles.cardIcon}
                  resizeMode="contain"
                />

                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{category.title}</Text>
                  <Text style={styles.cardSubtitle}>{category.subtitle}</Text>
                </View>

                <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Live Support Banner */}
        <TouchableOpacity
          style={styles.bannerContainer}
          activeOpacity={0.9}
          onPress={handleLiveSupportPress}
        >
          <Image
            source={require("@/assets/images/Help_man.png")}
            style={styles.bannerImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  subheaderText: {
    fontFamily: "Poppins_500Medium",
    fontSize: 16,
    color: "#4B4458",
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    marginHorizontal: 16,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins_400Regular",
    fontSize: 15,
    color: "#111827",
    padding: 0, // Reset default padding on Android
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFF0F6",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardIcon: {
    width: 44,
    height: 44,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 16,
    color: "#111827",
  },
  cardSubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  bannerContainer: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.01,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  bannerImage: {
    width: "100%",
    height: 150,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 18,
    color: "#111827",
    marginTop: 12,
    marginBottom: 4,
  },
  emptySubtitle: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
