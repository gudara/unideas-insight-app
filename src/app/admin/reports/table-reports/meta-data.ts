import { ReportStatus } from "@prisma/client";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const statuses = [
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