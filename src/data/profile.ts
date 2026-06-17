import type {
    TBonusIncentive,
    TDailySummary,
    TDriverProfile,
    TPerformance,
    TVehicleInfo,
} from "@/types";

export const mockProfile: TDriverProfile = {
  id: "drv_001",
  name: "Rahul Sharma",
  phone: "+919876543210",
  email: "rahul.sharma@gmail.com",
  avatar: "https://i.pravatar.cc/150?u=driver001",
  rating: 4.8,
  totalDeliveries: 1245,
  memberSince: "2024-03-15",
  isVerified: true,
  isOnline: true,
};

export const mockPersonalInfo = {
  firstName: "Rahul",
  lastName: "Sharma",
  phone: "+91 98765 43210",
  email: "rahul.sharma@gmail.com",
  dateOfBirth: "1995-08-12",
  gender: "Male",
  emergencyContact: {
    name: "Priya Sharma",
    phone: "+91 91234 56789",
    relationship: "Sister",
  },
  address: "221B Baker Street, Kolkata,\nWest Bengal - 700001",
};

export const mockVehicleInfo: TVehicleInfo = {
  id: "veh_001",
  type: "scooter",
  make: "Honda",
  model: "Activa 6G",
  year: 2024,
  color: "Red",
  licensePlate: "KA-01-AB-1234",
  isVerified: true,
  image: undefined,
};

export const mockVehicleDetails = {
  registrationNumber: "WB12AB1234",
  insuranceValidTill: "15 Feb 2025",
};

export const mockPerformance: TPerformance = {
  rating: 4.8,
  totalDeliveries: 1245,
  onTimeRate: 97,
  cancellationRate: 1.2,
  acceptanceRate: 95,
  totalDistance: 8500,
  totalHours: 520,
  currentStreak: 12,
  badges: [
    {
      id: "bd_001",
      name: "1000 Delivers",
      icon: "trophy",
      earnedAt: "2024-11-20",
    },
    {
      id: "bd_002",
      name: "Perfect Week",
      icon: "star",
      earnedAt: "2024-10-15",
    },
  ],
};

export const mockBonuses: TBonusIncentive[] = [
  {
    id: "bn_001",
    title: "Weekend Rush",
    description: "Complete 10 deliveries on Saturday & Sunday",
    type: "bonus",
    target: 10,
    progress: 4,
    reward: 500,
    currency: "INR",
    expiresAt: "2024-12-16T23:59:00Z",
    isActive: true,
  },
  {
    id: "bn_002",
    title: "Peak Hour Bonus",
    description: "Deliver during evening peak hours (6-9 PM)",
    type: "challenge",
    target: 5,
    progress: 3,
    reward: 100,
    currency: "INR",
    expiresAt: "2024-12-16T21:00:00Z",
    isActive: true,
  },
  {
    id: "bn_003",
    title: "Earning Guarantee",
    description: "Earn at least ₹1000 on weekdays",
    type: "guarantee",
    target: 1000,
    progress: 600,
    reward: 400,
    currency: "INR",
    expiresAt: "2024-12-16T23:59:00Z",
    isActive: true,
  },
];

export const mockDailySummaries: TDailySummary[] = [
  {
    date: "2024-12-15",
    deliveries: 7,
    distance: 45,
    hours: 6,
    earnings: 840,
    tips: 90,
    bonuses: 0,
    rating: 4.9,
  },
  {
    date: "2024-12-14",
    deliveries: 9,
    distance: 62,
    hours: 8,
    earnings: 1080,
    tips: 130,
    bonuses: 200,
    rating: 4.7,
  },
  {
    date: "2024-12-13",
    deliveries: 11,
    distance: 78,
    hours: 9,
    earnings: 1320,
    tips: 160,
    bonuses: 0,
    rating: 4.8,
  },
];
