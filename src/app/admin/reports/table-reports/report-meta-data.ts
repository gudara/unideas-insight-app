
import { ReportStatus } from "@prisma/client";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export interface ReportStatusObj {
  label: ReportStatus;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export const reportStatuses: ReportStatusObj[] = [
  {
    value: ReportStatus.Enable,
    label: "Enable",
    icon: ThumbsUp,
  },
  {
    value: ReportStatus.Disable,
    label: "Disable",
    icon: ThumbsDown,
  },
]