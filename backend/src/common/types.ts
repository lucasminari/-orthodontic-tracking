export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface IPaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export enum DashboardMetricType {
  LEADS_TODAY = 'leadsToday',
  PENDING_ATTENTION = 'pendingAttention',
  CONVERSION_RATE = 'conversionRate',
  AVG_RESPONSE_TIME = 'avgResponseTime',
}
