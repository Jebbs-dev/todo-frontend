import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { TaskDataTableSkeleton } from "./table/task-data-table-skeleton";

export const HomePageSkeleton = () => {
  return (
    <div className="h-screen p-10">
      <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md">
        <div className="flex flex-row items-center justify-between">
          <div className="w-3/4 md:w-full">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-4 w-[250px] mt-2" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        <Separator className="mt-2" />
        <TaskDataTableSkeleton />
      </div>
    </div>
  );
};
