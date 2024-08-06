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

import { FaDotCircle } from "react-icons/fa";

import { useCreateUser } from "@/mutations/user/add-user";
import { useAuthenticateUser } from "@/mutations/auth/authenticate-user";
import toast from "react-hot-toast";
import { FunctionComponent } from "react";

interface AuthFormProps {
  variant: string;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    })
    .optional(),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z
    .string()
    .min(4, {
      message: "Password must be at least 4 characters long.",
    })
    .max(10, {
      message: "Password must be no more than 10 characters long.",
    }),
});

const signupDefaultValues = {
  name: "",
  email: "",
  password: "",
};

const loginDefaultValues = {
  email: "",
  password: "",
};

export type UserProps = z.infer<typeof formSchema>;

export const AuthForm: FunctionComponent<AuthFormProps> = ({ variant }) => {
  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: authenticateUser } = useAuthenticateUser();

  // const toastMessage = variant === "login" ? "Logged in successfully!" : "Account created successfully!"

  const form = useForm<UserProps>({
    resolver: zodResolver(formSchema),
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
