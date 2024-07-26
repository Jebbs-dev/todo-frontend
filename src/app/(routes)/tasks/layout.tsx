"use client";

import { useGetUserAuthStatus } from "@/queries/auth/get-user-status";
import { useRouter } from "next/navigation";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const { data: authenticatedUser, isPending } = useGetUserAuthStatus();

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
    router.replace("/auth");
    return null; // Prevent the component from rendering
  }

  return (
    <div className="bg-[#060f17] h-screen">
      {children}
    </div>
  );
};

export default Layout;
