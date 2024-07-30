"use client";

// import Layout from "./layout";
import { redirect, useRouter } from "next/navigation";
import { useGetUserAuthStatus } from "@/queries/auth/get-user-status";

import { useGetUser } from "@/queries/user/fetch-user";
import { useGetTask } from "@/queries/task/get-task";
import { TaskClient } from "@/modules/tasks/components/client";
import { Divide } from "lucide-react";

const Home = () => {

  const { data: authenticatedUser, isPending } = useGetUserAuthStatus();
  const { data: currentUser } = useGetUser();
  const { data: tasks } = useGetTask();

  if (isPending) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="border border-slate-200 shadow rounded-md p-4 max-w-sm w-full mx-auto my-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-400 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-400 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ); // You can customize this loading state as needed
  }

  if (!authenticatedUser) {
    redirect("/auth");
  }

  // if (tasks) console.log(tasks); // log the tasks data for debugging purposes

  return (
    <>
      {authenticatedUser && (
        <div className="h-screen p-20">
          <h1 className="text-4xl text-black">Welcome</h1>
          <TaskClient currentUser={currentUser} tasks={tasks}  /> 
        </div>
      )}
    </>
  );
};

export default Home;
