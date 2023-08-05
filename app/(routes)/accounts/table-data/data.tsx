import {
  TrashIcon,
  PauseIcon,
  PlayIcon,
  StopIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "active",
    label: "Active",
    icon: PlayIcon,
  },
  {
    value: "inactive",
    label: "Inactive",
    icon: StopIcon,
  },
  {
    value: "suspended",
    label: "Suspended",
    icon: PauseIcon,
  },
  {
    value: "deleted",
    label: "Deleted",
    icon: TrashIcon,
  },
];
