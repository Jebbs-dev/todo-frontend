
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"

import toast from "react-hot-toast";

import { UserFormSettingsValidation, UserSettingsProps } from "@/lib/validation";

import { useUpdateUser } from "@/modules/user/mutations/update-user";
import { User } from "../../../../../types";

interface SettingsForm {
  userData: User;
}

const SettingsForm = ({ userData }: SettingsForm) => {
  const userId = userData?._id;

  const { mutateAsync: updateUser } = useUpdateUser(userId);

  const form = useForm<UserSettingsProps>({
    resolver: zodResolver(UserFormSettingsValidation),
    defaultValues: userData,
  });

  const handleUpdateUserData = async (values: UserSettingsProps) => {
    try {
      await updateUser(values);

      toast.success("User data updated successfully");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateUserData)}
        className="space-y-4 max-w-lg"
      >
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    // placeholder="This is a Name"
                    {...field}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name. You can change it here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    // placeholder="This is a Name"
                    {...field}
                    className="bg-transparent"
                  />
                </FormControl>
                <FormDescription>
                  You can manage verified email addresses in your email
                  settings.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          // onClick={updateUserData}
          className="hover:bg-gray-600 mt-2"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
