import { ReactNode } from "react";

export type TableProps = {
  loading: boolean;
  error?: boolean;
  items: ReactNode[];
  header: ReactNode | ReactNode[];
};
