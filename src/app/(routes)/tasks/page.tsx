"use client";

// import Layout from "./layout";
import { redirect } from "next/navigation";
import { useGetUserAuthStatus } from "@/queries/auth/get-user-status";

import { useGetUser } from "@/queries/user/fetch-user";
import { useGetTask } from "@/queries/task/get-task";
import { LogOut, Settings, User } from "lucide-react";
import Image from "next/image";

import { DataTable } from "@/modules/tasks/components/table/task-data-table";
import { Separator } from "@/components/ui/separator";

import { columns as taskColumns } from "@/modules/tasks/components/table/task-columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogoutUser } from "@/mutations/auth/logout-user";

const Home = () => {
  const { data: authenticatedUser, isPending } = useGetUserAuthStatus();
  const { data: currentUser } = useGetUser();
  const { data: tasks } = useGetTask();
  const { mutateAsync: logoutUser } = useLogoutUser();

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
    );
  }

  if (!authenticatedUser) {
    redirect("/auth");
  }

  return (
    <>
      {authenticatedUser && (
        <div className="h-screen p-10">
          <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md bg-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  Welcome back {currentUser?.name}!{/* Welcome back! */}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Here's a list of your tasks for this month!
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex rounded-full h-10 w-10 items-center justify-around">
                  <Image
                    src="/images/avatar.png"
                    alt="User avatar"
                    className="h-10 w-10 rounded-full"
                    width={20}
                    height={20}
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>
                    <h3>{currentUser?.name}</h3>
                    <p className="font-normal text-xs">{currentUser?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-black/10" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>User Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-black/10" />
                  <DropdownMenuItem onClick={()=>logoutUser()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator className="mt-2" />
            {tasks && (
              <DataTable columns={taskColumns} data={tasks} searchkey="title" />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
