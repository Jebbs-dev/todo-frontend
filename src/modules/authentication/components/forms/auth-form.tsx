import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useCreateUser } from "@/modules/user/mutations/add-user";
import { useAuthenticateUser } from "@/modules/authentication/mutations/authenticate-user";
import toast from "react-hot-toast";
import { FunctionComponent } from "react";
import { UserFormValidation, UserProps } from "@/lib/validation";

interface AuthFormProps {
  variant: string;
}

const signupDefaultValues = {
  name: "",
  email: "",
  password: "",
};

const loginDefaultValues = {
  email: "",
  password: "",
};

export const AuthForm: FunctionComponent<AuthFormProps> = ({ variant }) => {
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: authenticateUser } = useAuthenticateUser();

  // const toastMessage = variant === "login" ? "Logged in successfully!" : "Account created successfully!"

  const form = useForm<UserProps>({
    resolver: zodResolver(UserFormValidation),
    defaultValues:
      variant === "login" ? loginDefaultValues : signupDefaultValues,
  });

  const login = async (values: UserProps) => {
    try {
      await authenticateUser(values);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const register = async (values: UserProps) => {
    try {
      await createUser(values);
      toast.success("Account created successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={
            variant === "login"
              ? form.handleSubmit(login)
              : form.handleSubmit(register)
          }
          className="space-y-4"
        >
          {variant === "register" && (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jack Smith"
                      {...field}
                      className="bg-transparent"
                    />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="user@example.com"
                    {...field}
                    className="bg-transparent"
                  />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    type="password"
                    {...field}
                    className="bg-transparent"
                  />
                </FormControl>
                {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-white w-full text-black hover:bg-gray-400 mt-2"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
