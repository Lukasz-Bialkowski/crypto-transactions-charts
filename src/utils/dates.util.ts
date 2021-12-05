import { format } from "date-fns";

export const DATE_FORMAT = "MMM dd yyyy";

export const formatDate = (timestamp: number) =>
  timestamp ? format(new Date(timestamp), DATE_FORMAT) : "";
