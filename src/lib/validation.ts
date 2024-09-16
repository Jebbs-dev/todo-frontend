import {z} from "zod"

export const UserFormValidation = z.object({
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

export type UserProps = z.infer<typeof UserFormValidation>


export const UserFormSettingsValidation = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long.",
    }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type UserSettingsProps = z.infer<typeof UserFormSettingsValidation>