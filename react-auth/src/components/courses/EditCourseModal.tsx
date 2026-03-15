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
} from "@heroui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import type { EditCourseRequest } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CourseService } from "../../services/CourseService";
import { useQueryClient } from "@tanstack/react-query";
import useCourseById from "../../queries/useCourseById";

export default function EditCourseModal({
  isOpen,
  onOpenChange,
  onClose,
  courseId,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  courseId: number;
}) {
  const queryClient = useQueryClient();

  const { course, isLoading } = useCourseById(courseId);

  const validationSchema = z.object({
    title: z.string().min(2, "Мінімальна довжина 2 символи").max(50),
    description: z.string().min(6).max(200),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EditCourseRequest>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: course?.title,
      description: course?.description,
    },
  });

  useEffect(() => {
    if (course) {
      setValue("title", course?.title);
      setValue("description", course?.description);
    } else {
      setValue("title", "");
      setValue("description", "");
    }
  }, [isLoading, course, setValue]);

  const onSubmit = async (data: EditCourseRequest) => {
    try {
      await CourseService.editCourse(courseId, data);
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
                  Edit course
                </ModalHeader>
                <ModalBody>
                  {isLoading ? (
                    <Spinner />
                  ) : (
                    <>
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
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button isDisabled={isLoading} color="primary" type="submit">
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
