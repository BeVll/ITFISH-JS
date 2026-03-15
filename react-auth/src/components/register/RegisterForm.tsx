import React from "react";
import type { RegisterRequest } from "./types";
import { Button, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { AuthService } from "../../services/AuthService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ToggleTextVisible from "../ui/ToggleTextVisible";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = z
    .object({
      username: z.string().min(3, "Мінімальна довжина 3 символи").max(32),
      password: z.string().min(6).max(30),
      confirmPassword: z.string().min(6).max(30),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Паролі не збігаються",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (data: RegisterRequest) => {
    try {
      await AuthService.register(data.username, data.password);
      toast.success("Успішно зареєстровано!", { theme: "dark" });
      navigate("/login");
    } catch (err) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, { theme: "dark" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[40px]">Sign up</h1>
        <Input
          {...register("username")}
          label="Username"
          type="text"
          errorMessage={errors.username?.message}
          isInvalid={errors.username != null}
        />
        <Input
          {...register("password")}
          label="Password"
          type={isVisible ? "text" : "password"}
          endContent={
            <ToggleTextVisible
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
          }
          errorMessage={errors.password?.message}
          isInvalid={errors.password != null}
        />
        <Input
          {...register("confirmPassword")}
          label="Confirm password"
          type={isVisible ? "text" : "password"}
          endContent={
            <ToggleTextVisible
              isVisible={isVisible}
              toggleVisibility={toggleVisibility}
            />
          }
          errorMessage={errors.confirmPassword?.message}
          isInvalid={errors.confirmPassword != null}
        />
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          color="primary"
        >
          Sign up
        </Button>
        <Link />
      </div>
    </form>
  );
}
