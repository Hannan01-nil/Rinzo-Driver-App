export interface SummaryStat {
  id: string;
  label: string;
  value: string;
  icon: string;
  isEarnings?: boolean;
}

export interface DailySummaryReport {
  reportDate: string;
  summaryStats: SummaryStat[];
  performanceScore: string;
}

export const mockDailySummaryData: DailySummaryReport = {
  reportDate: "24 Apr 2024",
  summaryStats: [
    {
      id: "orders",
      label: "Orders Completed",
      value: "12",
      icon: "car-outline",
    },
    {
      id: "distance",
      label: "Distance Travelled",
      value: "18.4 km",
      icon: "map-outline",
    },
    {
      id: "hours",
      label: "Hours Online",
      value: "7h 25m",
      icon: "time-outline",
    },
    {
      id: "earnings",
      label: "Earnings",
      value: "₹950",
      icon: "cash-outline",
      isEarnings: true,
    },
    {
      id: "cancelled",
      label: "Cancelled Orders",
      value: "0",
      icon: "warning-outline",
    },
  ],
  performanceScore: "98%",
};
