import { Timer, CircleHelp, Circle, CircleX, CircleCheck, LucideIcon } from "lucide-react";

export type Status = {
  value: string
  label: string
  icon: LucideIcon
}

export const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
]