interface SeverityCounts {
  sev1: number;
  sev2: number;
  sev3: number;
  sev4: number;
}

export interface AlertsFlow {
  [probeName: string]: SeverityCounts;
}
