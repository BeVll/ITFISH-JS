import { Button, Input, Link } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import type { LoginRequest } from "./types";
import { toast } from "react-toastify";
import React from "react";
import ToggleTextVisible from "../ui/ToggleTextVisible";
import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [isVisible, setIsVisible] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validationSchema = z.object({
    username: z.string().min(3, "Мінімальна довжина 3 символи").max(32),
    password: z.string().min(6).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginRequest>({
    resolver: zodResolver(validationSchema),
  });
  const onSubmit = async (data: LoginRequest) => {
    try {
      await login(data.username, data.password);
      navigate("/");
    } catch (err: unknown) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message, { theme: "dark" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[40px]">Log in</h1>
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
        <Button
          type="submit"
          isLoading={isSubmitting}
          fullWidth
          color="primary"
        >
          Log in
        </Button>
        {/* <Link href="/register">Sign up</Link> */}
      </div>
    </form>
  );
}
