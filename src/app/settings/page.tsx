"use client";

import { Separator } from "@/components/ui/separator";
import SettingsForm from "@/modules/user/settings/components/settings-form";

import { useGetUser } from "@/queries/user/get-user";
import { User } from "../../../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Settings = () => {
  const { data: userData } = useGetUser();

  return (
    <div className="h-screen p-10">
      <div className="mx-3 px-3 md:mx-0 md:px-10 py-4">
        <section className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-black">
              Settings
            </h2>
            <p>Manage your account settings and set e-mail preferences.</p>
          </div>

          <Button asChild className="hover:bg-gray-600 mt-2">
            <Link href="/">Back to Home</Link>
          </Button>
        </section>
        <Separator className="my-5" />

        <section>
          <div className="max-w-[780px]">
            <div className="mb-5">
              <h2 className="text-xl font-semibold tracking-tight text-black">
                Account
              </h2>
              <p className="font-normal text-sm">
                Update your account settings here.
              </p>
            </div>
            <Separator className="my-5 max-w-lg" />
            <SettingsForm userData={userData as User} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
