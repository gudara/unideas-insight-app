import { CompanyStatus } from "@prisma/client";
import { ThumbsDown, ThumbsUp } from "lucide-react";

export const statuses = [
  {
    value: CompanyStatus.Enable,
    label: "Enable",
    icon: ThumbsUp,
  },
  {
    value: CompanyStatus.Disable,
    label: "Disable",
    icon: ThumbsDown,
  },
]