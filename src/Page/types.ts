import { ReactNode } from "react";
import { FilterProps, FilterGroupFiltersProps } from "../FilterGroup/types";

export interface PageProps {
  namespace: string;
  tableOptions: {};
  defaultSearchCriteria: { [key: string]: string };
  filters: Array<FilterProps> | FilterGroupFiltersProps;
  controlBar?: (params: Record<string, any>) => ReactNode;
  onComplete?: () => void;
}
