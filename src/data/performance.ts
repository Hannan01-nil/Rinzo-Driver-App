export interface SalarySummary {
  month: string;
  amountLabel: string;
  value: string;
  paymentStatus: string;
}

export interface PerformanceStat {
  id: string;
  label: string;
  value: string;
  subLabel?: string;
  iconName: string;
  iconType: "ionicons" | "material";
}

export interface IncentiveData {
  label: string;
  value: string;
  iconName: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  iconName: string;
}

export interface PerformanceDashboardData {
  salarySummary: SalarySummary;
  overviewStats: PerformanceStat[];
  incentive: IncentiveData;
  quickActions: QuickActionItem[];
}

export const mockPerformanceDashboardData: PerformanceDashboardData = {
  salarySummary: {
    month: "June 2026",
    amountLabel: "Current Month Salary",
    value: "₹18,000",
    paymentStatus: "Paid on 30 June",
  },
  overviewStats: [
    {
      id: "attendance",
      label: "Attendance",
      value: "24 / 26",
      subLabel: "Days",
      iconName: "calendar-outline",
      iconType: "ionicons",
    },
    {
      id: "tasks",
      label: "Tasks Completed",
      value: "142",
      iconName: "clipboard-outline",
      iconType: "ionicons",
    },
    {
      id: "pickups",
      label: "Customer Pickups",
      value: "80",
      iconName: "shopping-outline",
      iconType: "material",
    },
    {
      id: "deliveries",
      label: "Customer Deliveries",
      value: "62",
      iconName: "moped",
      iconType: "material",
    },
    {
      id: "transfers",
      label: "Center Transfers",
      value: "34",
      iconName: "office-building-outline",
      iconType: "material",
    },
    {
      id: "on-time",
      label: "On-Time Rate",
      value: "98%",
      iconName: "time-outline",
      iconType: "ionicons",
    },
  ],
  incentive: {
    label: "Performance Incentive",
    value: "₹2,000",
    iconName: "ribbon-outline",
  },
  quickActions: [
    {
      id: "salary",
      title: "Salary Details",
      subtitle: "View salary breakdown and payslip",
      route: "withdraw",
      iconName: "calculator-outline",
    },
    {
      id: "attendance",
      title: "Attendance & Activity",
      subtitle: "View attendance and monthly activity",
      route: "last-7-days",
      iconName: "calendar-check-outline",
    },
  ],
};

export interface BreakdownRowItem {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface PaymentStatusData {
  status: string;
  description: string;
}

export interface SalaryDetailsData {
  month: string;
  amountLabel: string;
  value: string;
  paymentStatusLabel: string;
  breakdown: BreakdownRowItem[];
  paymentStatus: PaymentStatusData;
}

export const mockSalaryDetailsData: SalaryDetailsData = {
  month: "June 2026",
  amountLabel: "Salary Summary",
  value: "₹18,000",
  paymentStatusLabel: "Paid on 30 June",
  breakdown: [
    { label: "Base Salary", value: "₹15,000" },
    { label: "Overtime", value: "₹1,000" },
    { label: "Performance Incentive", value: "₹2,000" },
    { label: "Other Allowances", value: "₹0" },
    { label: "Gross Salary", value: "₹18,000", isHighlight: true },
    { label: "Deductions", value: "₹0" },
    { label: "Net Salary", value: "₹18,000", isHighlight: true },
  ],
  paymentStatus: {
    status: "Paid",
    description: "Salary has been credited to your bank account on 30 June 2026",
  },
};

export interface CalendarDay {
  dayNumber: number;
  isCurrentMonth: boolean;
  status: "present" | "absent" | "leave" | "none" | "today";
}

export interface AttendanceSummary {
  month: string;
  amountLabel: string;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  rate: string;
}

export interface ActivityCardData {
  totalWorkingHours: string;
  averageWorkingHours: string;
}

export interface AttendanceActivityData {
  attendance: AttendanceSummary;
  activity: ActivityCardData;
  calendar: CalendarDay[];
}

export const mockAttendanceActivityData: AttendanceActivityData = {
  attendance: {
    month: "June 2026",
    amountLabel: "Attendance Summary",
    presentDays: 24,
    absentDays: 1,
    leaveDays: 1,
    rate: "96%",
  },
  activity: {
    totalWorkingHours: "186 hrs",
    averageWorkingHours: "8.2 hrs/day",
  },
  calendar: [
    { dayNumber: 26, isCurrentMonth: false, status: "none" },
    { dayNumber: 27, isCurrentMonth: false, status: "none" },
    { dayNumber: 28, isCurrentMonth: false, status: "none" },
    { dayNumber: 29, isCurrentMonth: false, status: "none" },
    { dayNumber: 30, isCurrentMonth: false, status: "none" },
    { dayNumber: 31, isCurrentMonth: false, status: "none" },
    { dayNumber: 1, isCurrentMonth: true, status: "none" },
    { dayNumber: 2, isCurrentMonth: true, status: "present" },
    { dayNumber: 3, isCurrentMonth: true, status: "present" },
    { dayNumber: 4, isCurrentMonth: true, status: "absent" },
    { dayNumber: 5, isCurrentMonth: true, status: "leave" },
    { dayNumber: 6, isCurrentMonth: true, status: "none" },
    { dayNumber: 7, isCurrentMonth: true, status: "none" },
    { dayNumber: 8, isCurrentMonth: true, status: "none" },
    { dayNumber: 9, isCurrentMonth: true, status: "present" },
    { dayNumber: 10, isCurrentMonth: true, status: "present" },
    { dayNumber: 11, isCurrentMonth: true, status: "present" },
    { dayNumber: 12, isCurrentMonth: true, status: "present" },
    { dayNumber: 13, isCurrentMonth: true, status: "present" },
    { dayNumber: 14, isCurrentMonth: true, status: "present" },
    { dayNumber: 15, isCurrentMonth: true, status: "present" },
    { dayNumber: 16, isCurrentMonth: true, status: "present" },
    { dayNumber: 17, isCurrentMonth: true, status: "present" },
    { dayNumber: 18, isCurrentMonth: true, status: "present" },
    { dayNumber: 19, isCurrentMonth: true, status: "present" },
    { dayNumber: 20, isCurrentMonth: true, status: "present" },
    { dayNumber: 21, isCurrentMonth: true, status: "present" },
    { dayNumber: 22, isCurrentMonth: true, status: "present" },
    { dayNumber: 23, isCurrentMonth: true, status: "present" },
    { dayNumber: 24, isCurrentMonth: true, status: "present" },
    { dayNumber: 25, isCurrentMonth: true, status: "present" },
    { dayNumber: 26, isCurrentMonth: true, status: "present" },
    { dayNumber: 27, isCurrentMonth: true, status: "present" },
    { dayNumber: 28, isCurrentMonth: true, status: "present" },
    { dayNumber: 29, isCurrentMonth: true, status: "present" },
    { dayNumber: 30, isCurrentMonth: true, status: "today" },
    { dayNumber: 1, isCurrentMonth: false, status: "none" },
    { dayNumber: 2, isCurrentMonth: false, status: "none" },
    { dayNumber: 3, isCurrentMonth: false, status: "none" },
    { dayNumber: 4, isCurrentMonth: false, status: "none" },
    { dayNumber: 5, isCurrentMonth: false, status: "none" },
    { dayNumber: 6, isCurrentMonth: false, status: "none" },
  ],
};
