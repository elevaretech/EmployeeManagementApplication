export interface ChartPayloadItem {
  value?: number;
  name?: string;
  dataKey?: string;
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
}

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: ChartPayloadItem[];
  className?: string;
  indicator?: "dot" | "line" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  label?: string | number;
  labelFormatter?: (label: string | number, payload: ChartPayloadItem[]) => React.ReactNode;
  labelClassName?: string;
  formatter?: (value: number, name: string, props: ChartPayloadItem, index: number) => React.ReactNode;
  nameKey?: string;
  labelKey?: string;
}
