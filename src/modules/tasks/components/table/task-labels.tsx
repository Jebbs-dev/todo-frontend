import { FunctionComponent } from "react";
import { Task } from "../../../../../types";
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import useLabelStore from "@/store/useTaskLabel";

interface TaskLabelProps {
  data: Task;
}

export const TaskLabel: FunctionComponent<TaskLabelProps> = ({ data }) => {
  const labelStore = useLabelStore();

  const label = labelStore.labels[data._id] || "Bug";

  return (
    <div className="inline-flex items-center">
      <span className="p-1 border mr-2 rounded-md border-muted-foreground text-xs font-semibold">
        {label}
      </span>
      {data.title}
    </div>
  );
};
