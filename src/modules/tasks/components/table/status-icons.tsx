import { FunctionComponent } from "react";
import { Task } from "../../../../../types";
import { Timer, CircleHelp, Circle, CircleX, CircleCheck } from "lucide-react";

interface StatusIconsProps {
  data: Task;
}

export const StatusIcons: FunctionComponent<StatusIconsProps> = ({ data }) => {
  return (
    <div className="inline-flex items-center">
      {data.status === "Backlog" && <CircleHelp className="mr-2 h-4 w-4" />}
      {data.status === "Todo" && <Circle className="mr-2 h-4 w-4" />}
      {data.status === "In Progress" && <Timer className="mr-2 h-4 w-4" />}
      {data.status === "Done" && <CircleCheck className="mr-2 h-4 w-4" />}
      {data.status === "Cancelled" && <CircleX className="mr-2 h-4 w-4" />}
      {data.status}
    </div>
  );
};


