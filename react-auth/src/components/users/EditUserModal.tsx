import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Textarea,
  Spinner,
  Autocomplete,
  AutocompleteItem,
} from "@heroui/react";
import { useEffect, type Key } from "react";
import { useForm } from "react-hook-form";
import z, { int32, number } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services/CourseService";
import { useQueryClient } from "@tanstack/react-query";
import useCourseById from "../../queries/useCourseById";
import type { EditUserRoleRequest } from "./types";
import { UserService } from "../../services/UserService";
import useRoles from "../../queries/useRoles";

export default function EditUserModal({
  isOpen,
  onOpenChange,
  onClose,
  userId,
  roleId,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: number;
  roleId: number;
}) {
  const { roles, isLoading } = useRoles();

  const queryClient = useQueryClient();

  const validationSchema = z.object({
    newRoleId: z.number(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EditUserRoleRequest>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      newRoleId: 1,
    },
  });
  console.log("fdasfsadf");

  useEffect(() => {
    console.log("fdasfsadf");
    setValue("newRoleId", roleId);
  }, [roleId, userId, setValue]);

  const onSubmit = async (data: EditUserRoleRequest) => {
    try {
      await UserService.changeRole(userId, data.newRoleId);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
      reset();
    } catch (err) {
      console.log(err);
    }
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
                  Change role
                </ModalHeader>
                <ModalBody>
                  <>
                    {!isLoading ? (
                      <Autocomplete
                        name="newRoleId"
                        defaultSelectedKey={watch("newRoleId").toString()}
                        selectedKey={watch("newRoleId").toString()}
                        onSelectionChange={(key: Key | null) => {
                          if (key) {
                            setValue("newRoleId", parseInt(key?.toString()));
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
                    ) : (
                      <Spinner />
                    )}
                  </>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Save
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
