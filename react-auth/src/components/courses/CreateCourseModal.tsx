import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
  Textarea,
} from "@heroui/react";
import { useForm } from "react-hook-form";
import z from "zod";
import type { CreateCourseRequest } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services/CourseService";
import { useQueryClient } from "@tanstack/react-query";

export default function CreateCourseModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const validationSchema = z.object({
    title: z.string().min(2, "Мінімальна довжина 2 символи").max(50),
    description: z.string().min(6).max(200),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCourseRequest>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data: CreateCourseRequest) => {
    try {
      await CourseService.createCourse(data);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });
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
                  Create course
                </ModalHeader>
                <ModalBody>
                  <Input
                    {...register("title")}
                    label="Title"
                    placeholder="Enter title of course"
                    variant="bordered"
                    errorMessage={errors.title?.message}
                    isInvalid={errors.title != null}
                  />
                  <Textarea
                    {...register("description")}
                    variant="bordered"
                    label="Description"
                    placeholder="Enter description of course"
                    errorMessage={errors.description?.message}
                    isInvalid={errors.description != null}
                  ></Textarea>
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
