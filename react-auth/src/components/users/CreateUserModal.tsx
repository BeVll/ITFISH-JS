import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Spinner,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { useQueryClient } from "@tanstack/react-query";
import type { CreateUserRequest } from "./types";
import useCreateUser from "../../queries/useCreateUser";
import ToggleTextVisible from "../ui/ToggleTextVisible";
import { useState, type Key } from "react";
import useRoles from "../../queries/useRoles";

export default function CreateUserModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const { createUser } = useCreateUser();
  const [isVisible, setVisible] = useState<boolean>(false);
  const { roles, isLoading: isRolesLoading } = useRoles();

  const validationSchema = z
    .object({
      username: z.string().min(3, "Мінімальна довжина 3 символи").max(32),
      password: z.string().min(6).max(30),
      confirmPassword: z.string().min(6).max(30),
      roleId: z.number(),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Паролі не збігаються",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<CreateUserRequest>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      roleId: 0,
    },
  });

  const onSubmit = async (data: CreateUserRequest) => {
    try {
      createUser(data);
      onClose();

      reset();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onClose={onClose}
        onOpenChange={onOpenChange}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create user
                </ModalHeader>
                <ModalBody>
                  {isRolesLoading ? (
                    <Spinner />
                  ) : (
                    <>
                      <Input
                        {...register("username")}
                        label="Username"
                        placeholder="Enter username"
                        variant="bordered"
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

                      <Autocomplete
                        name="newRoleId"
                        defaultSelectedKey={undefined}
                        selectedKey={watch("roleId").toString()}
                        onSelectionChange={(key: Key | null) => {
                          if (key) {
                            setValue("roleId", parseInt(key?.toString()));
                          }
                        }}
                        className="w-full"
                        label="Select role"
                      >
                        {roles.map((role) => (
                          <AutocompleteItem key={role.id}>
                            {role.name}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
