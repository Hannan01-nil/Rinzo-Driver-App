export interface StatItem {
  id: string;
  label: string; // e.g. "ACCEPTANCE"
  value: string; // e.g. "98%"
  icon: string; // e.g. "checkmark-circle"
  status: string; // e.g. "Excellent"
  statusBg: string; // e.g. "#DDF6E4"
  statusColor: string; // e.g. "#16A34A"
}

export interface ChartBarData {
  day: string; // e.g. "MON"
  value: number; // e.g. 40
  color: string; // e.g. "#D9D0F2"
}

export interface PerformanceSummary {
  weeklyStats: StatItem[];
  chartData: ChartBarData[];
}

export const mockPerformanceData: PerformanceSummary = {
  weeklyStats: [
    {
      id: "acceptance",
      label: "ACCEPTANCE",
      value: "98%",
      icon: "checkmark-circle",
      status: "Excellent",
      statusBg: "#DDF6E4",
      statusColor: "#16A34A",
    },
    {
      id: "completion",
      label: "COMPLETION",
      value: "97%",
      icon: "checkmark-done-circle",
      status: "Excellent",
      statusBg: "#DDF6E4",
      statusColor: "#16A34A",
    },
    {
      id: "on-time",
      label: "ON-TIME",
      value: "95%",
      icon: "time-outline",
      status: "Excellent",
      statusBg: "#DDF6E4",
      statusColor: "#16A34A",
    },
    {
      id: "rating",
      label: "RATING",
      value: "4.9",
      icon: "star",
      status: "Excellent",
      statusBg: "#DDF6E4",
      statusColor: "#16A34A",
    },
  ],
  chartData: [
    { day: "MON", value: 40, color: "#D9D0F2" },
    { day: "TUE", value: 60, color: "#D9D0F2" },
    { day: "WED", value: 50, color: "#D9D0F2" },
    { day: "THU", value: 85, color: "#9D84D6" },
    { day: "FRI", value: 75, color: "#9D84D6" },
    { day: "SAT", value: 95, color: "#7E57E5" },
    { day: "SUN", value: 100, color: "#6D46D9" },
  ],
};
