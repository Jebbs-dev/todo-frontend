"use client";

// import Layout from "./layout";
import { redirect, useRouter } from "next/navigation";

import { useGetUser } from "@/queries/user/get-user";
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
import { HomePageSkeleton } from "@/modules/tasks/components/task-homepage-skeleton";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { removeLocalStorage } from "@/utils/storage";

const Home = () => {
  const router = useRouter();

  const { data: authenticatedUser, isPending: isAuthPending } = useGetUser();
  const { data: tasks, isFetching: isTasksFetching } = useGetTask();

  if (isAuthPending) {
    return <HomePageSkeleton />;
  }

  if (!authenticatedUser) {
    redirect("/auth");
  }

  const handleLogout = () => {
    if (authenticatedUser) {
      removeLocalStorage("jwtToken");
      toast.success("Logged out successfully!");

      router.push("/auth");
      router.refresh();
    } else toast.error("Something went wrong!");
  };

  return (
    <>
      {authenticatedUser && (
        <div className="h-screen p-10 ">
          <div className="mx-3 px-3 md:mx-0 md:px-10 py-4 border rounded-md">
            <div className="flex flex-row items-center justify-between">
              <div className="w-3/4 md:w-full">
                <h2 className="text-2xl font-bold tracking-tight text-black">
                  Welcome back {authenticatedUser?.name}!{/* Welcome back! */}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Here&apos;s a list of your tasks for this month!
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
                    <h3>{authenticatedUser?.name}</h3>
                    <p className="font-normal text-xs">
                      {authenticatedUser?.email}
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-black/10" />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <Link href="settings">
                        User Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="bg-black/10" />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Separator className="mt-2" />
            <DataTable columns={taskColumns} data={tasks} searchkey="title" />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
