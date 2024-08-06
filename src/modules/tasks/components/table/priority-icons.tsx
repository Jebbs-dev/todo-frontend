import { FunctionComponent } from "react";
import { Task } from "../../../../../types";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";

interface PriorityIconsProps {
  data: Task;
}

export const PriorityIcons: FunctionComponent<PriorityIconsProps> = ({ data }) => {
  return (
    <div className="inline-flex items-center">
      {data.priority === "Medium" && <ArrowRight className="mr-2 h-4 w-4" />}
      {data.priority === "Low" && <ArrowDown className="mr-2 h-4 w-4" />}
      {data.priority === "High" && <ArrowUp className="mr-2 h-4 w-4" />}
      {data.priority}
    </div>
  );
};

