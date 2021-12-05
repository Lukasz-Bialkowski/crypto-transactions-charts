import { ReactNode } from "react";

import { AsyncStatus } from "../../types/AsyncStatus";

export type TableProps = {
  status: AsyncStatus;
  items: ReactNode[];
  header: ReactNode | ReactNode[];
};
