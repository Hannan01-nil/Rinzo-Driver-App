export interface DailyDetailsOrder {
  id: string;
  orderNumber: string; // e.g. "#8832"
  restaurant: string; // e.g. "Burger King"
  itemsCount: number; // e.g. 2
  pickupTime: string; // e.g. "12:45 PM"
  dropoffTime: string; // e.g. "01:12 PM"
  amount: number; // e.g. 145
}

export interface DailyDetailsSummary {
  date: string; // e.g. "24 Apr 2024"
  totalEarnings: number; // e.g. 950
  basePay: number; // e.g. 720
  tips: number; // e.g. 110
  incentives: number; // e.g. 120
  avgDeliveryTime: string; // e.g. "24 min"
  avgDeliveryStatus: string; // e.g. "3m faster than avg"
  idleTime: string; // e.g. "42 min"
  idleStatus: string; // e.g. "Within target range"
  orders: DailyDetailsOrder[];
  achievementTitle: string; // e.g. "Great Hustle Today!"
  achievementSubtitle: string; // e.g. "You're in the top 10% of earners in your area."
}

export const mockDailyDetails: DailyDetailsSummary = {
  date: "24 Apr 2024",
  totalEarnings: 950,
  basePay: 720,
  tips: 110,
  incentives: 120,
  avgDeliveryTime: "24 min",
  avgDeliveryStatus: "3m faster than avg",
  idleTime: "42 min",
  idleStatus: "Within target range",
  achievementTitle: "Great Hustle Today!",
  achievementSubtitle: "You're in the top 10% of earners in your area.",
  orders: [
    {
      id: "order_1",
      orderNumber: "#8832",
      restaurant: "Burger King",
      itemsCount: 2,
      pickupTime: "12:45 PM",
      dropoffTime: "01:12 PM",
      amount: 145,
    },
    {
      id: "order_2",
      orderNumber: "#8845",
      restaurant: "The Salad Bar",
      itemsCount: 1,
      pickupTime: "01:30 PM",
      dropoffTime: "01:52 PM",
      amount: 85,
    },
    {
      id: "order_3",
      orderNumber: "#8859",
      restaurant: "Sushi Zen",
      itemsCount: 4,
      pickupTime: "02:15 PM",
      dropoffTime: "02:45 PM",
      amount: 210,
    },
  ],
};
