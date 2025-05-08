import { FunctionComponent } from "react";
import { Task } from "../../../../../types";
import useLabelStore from "@/store/useTaskLabel";

interface TaskLabelProps {
  data: Task;
}

export const TaskLabel: FunctionComponent<TaskLabelProps> = ({ data }) => {
  const labelStore = useLabelStore();

  // const label = labelStore.labels[data._id] || "personal";

  return (
    <div className="inline-flex items-center">
      <span className="p-1 border mr-2 rounded-md border-muted-foreground text-xs font-semibold">
        {data.label}
      </span>
      {data.title}
    </div>
  );
};
