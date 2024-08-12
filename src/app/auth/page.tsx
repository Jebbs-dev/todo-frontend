"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { AuthForm } from "@/modules/authentication/components/forms/auth-form";


import { useRouter } from "next/navigation";
import React from "react";
import { useGetUser } from "@/queries/user/get-user";

const AuthPage = () => {
  const [variant, setVariant] = useState("login");

  const router = useRouter();
  const { data: authenticatedUser, isLoading } = useGetUser();

  if (isLoading) {
    return <p>Loading...</p>; // You can customize this loading state as needed
  }

  if (authenticatedUser) {
    router.replace("/tasks");
  }
 

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  // const widgets = [
  //   { name: "google", icon: FcGoogle },
  //   { name: "discord", icon: FaDiscord },
  //   { name: "github", icon: FaGithub },
  // ];

  return (
    <div className="w-full h-full bg-[#060f17] flex flex-col md:bg-[url('/images/auth-bg.jpg')] bg-cover md:grid md:grid-cols-2">
      <div className="relative w-32 mx-auto md:h-full md:w-full">
        <Image
          src={"/images/logo.png"}
          alt="logo"
          width={200}
          height={200}
          className="fixed "
        />
      </div>
      <div className="h-[100vh] lg:h-[900px] md:bg-black md:bg-opacity-70 flex text-white text-sm">
        <div className="w-[80%] mx-auto flex flex-col my-16 space-y-2 lg:w-[50%] lg:h-[50%] md:my-auto ">
          <h1 className="text-3xl font-semibold text-center mb-3">
            {variant === "login"
              ? "Sign in to your account"
              : "Create an Account"}
          </h1>
          <p className="text-center text-neutral-400 font-extralight">
            {variant === "login"
              ? "Enter your email and password below to sign in to your account"
              : "Enter your name, email and password below to create an account"}
          </p>
          <div className="flex flex-col text-neutral-300">
            <AuthForm variant={variant} />

            <div className="flex h-5 justify-center items-center text-sm my-7">
              <div className="w-[25%] lg:w-[31%]">
                <Separator orientation="horizontal" />
              </div>
              <div className="w-1/2">
                <div className="text-xs text-center">OR CONTINUE WITH</div>
              </div>
              <div className="w-[25%] lg:w-[31%]">
                <Separator orientation="horizontal" />
              </div>
            </div>

            <div className="flex space-x-10 justify-center mb-7">
              {/* {widgets.map((widget)=>( */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={32} />
              </div>

              {/* ))} */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaDiscord size={32} color="#5764f2" />
              </div>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={32} color="black" />
              </div>
            </div>

            <div className="flex justify-center items-center">
              <p className="text-neutral-400">
                {variant === "login"
                  ? "Don't have an account?"
                  : "Have an account?"}{" "}
                <span
                  onClick={toggleVariant}
                  className="underline hover:text-white hover:cursor-pointer"
                >
                  {variant === "login"
                    ? "Click to create an account."
                    : "Click to sign in"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
