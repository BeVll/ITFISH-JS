import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Pagination,
  Spinner,
  DatePicker,
  type DateValue,
  type SortDescriptor,
  Tabs,
  Tab,
} from "@heroui/react";
import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type Key,
  type KeyboardEvent,
} from "react";
import { IoReload } from "react-icons/io5";
import useCourses from "../../queries/useCourses";
import { FaPlus, FaMinus } from "react-icons/fa";
import CreateCourseModal from "../courses/CreateCourseModal";
import moment from "moment";
import { HiOutlineTrash } from "react-icons/hi";
import useDeleteCourse from "../../queries/useDeleteCourse";
import { MdEdit } from "react-icons/md";
import EditCourseModal from "../courses/EditCourseModal";
import { parseDate } from "@internationalized/date";
import { useAuth } from "../../providers/AuthProvider";
import useEnrollCourse from "../../queries/useEnrollCourse";
import useMyCourses from "../../queries/useMyCourses";
import useUnEnrollCourse from "../../queries/useUnEnrollCourse";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [fromDate, setFromDate] = useState<DateValue>(
    parseDate(moment("2025-12-01").utc().format("yyyy-MM-DD"))
  );

  const [selectedTab, setSelectedTab] = useState<Key>("all");

  const { user } = useAuth();

  const [sort, setSort] = useState<SortDescriptor>({
    direction: "ascending",
    column: "id",
  });

  const [toDate, setToDate] = useState<DateValue | null | undefined>(null);

  const { pageSize, totalCount, courses, isLoading, refetch } = useCourses(
    sort.column.toString(),
    sort.direction,
    searchQuery,
    selectedPage,
    moment(fromDate.toString()).utc().toISOString(),
    moment(toDate?.toString()).utc().toISOString()
  );

  const {
    courses: myCourses,
    isLoading: isLoadingMyCourses,
    refetch: refetchMyCourses,
  } = useMyCourses();

  const deleteCourse = useDeleteCourse();
  const { enroll } = useEnrollCourse();
  const { unenroll } = useUnEnrollCourse();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onOpenChange: onOpenChangeDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [selectedCourseId, setSelectedCourseId] = useState<number>(0);

  useEffect(() => {
    console.log(fromDate);
    console.log(user);
    refetch();
  }, [selectedPage, refetch, fromDate, toDate, sort]);

  const topContent = useMemo(() => {
    return (
      <div className="w-full justify-between gap-2 flex items-center">
        <div className="flex items-center gap-2">
          <Input
            label="Search"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSearchQuery(e.target.value);
            }}
            variant="bordered"
            size="sm"
            className="max-w-[300px] rounded-xl"
            onKeyDown={(e: KeyboardEvent) => {
              if (e.key == "Enter") {
                refetch();
              }
            }}
          />
          <Button
            color="primary"
            onPress={() => {
              refetch();
            }}
            className="rounded-xl"
          >
            Search
          </Button>
        </div>

        <div className="justify-end gap-2 w-full flex items-center">
          <Tabs
            selectedKey={selectedTab}
            onSelectionChange={setSelectedTab}
            aria-label="Tabs radius"
          >
            <Tab key="all" title="All" />
            <Tab key="my" title="My" />
          </Tabs>

          <DatePicker
            className="max-w-[150px]"
            label={"From date"}
            labelPlacement={"inside"}
            size="sm"
            value={fromDate}
            onChange={(value: DateValue) => {
              setFromDate(value);
            }}
          />

          <DatePicker
            className="max-w-[150px]"
            label={"To date"}
            labelPlacement={"inside"}
            size="sm"
            value={toDate}
            onChange={(value: DateValue) => {
              setToDate(value);
            }}
          />

          <Button onPress={() => refetch()}>
            <IoReload />
          </Button>
          <Button
            startContent={<FaPlus />}
            color="primary"
            onPress={() => onOpen()}
          >
            Add new
          </Button>
        </div>
      </div>
    );
  }, [refetch, onOpen, fromDate, toDate, selectedTab]);

  return (
    <div className="p-5">
      <Table
        topContentPlacement="outside"
        topContent={topContent}
        aria-label="Example static collection table"
        bottomContent={
          pageSize > 0 && selectedTab == "all" ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={selectedPage}
                total={Math.ceil(totalCount / pageSize)}
                onChange={(page) => {
                  setSelectedPage(page);
                }}
              />
            </div>
          ) : null
        }
        sortDescriptor={sort}
        onSortChange={(descriptor: SortDescriptor) => {
          setSort(descriptor);
        }}
      >
        <TableHeader>
          <TableColumn key={"id"} allowsSorting>
            Id
          </TableColumn>
          <TableColumn key={"title"} allowsSorting>
            Title
          </TableColumn>
          <TableColumn key={"description"} allowsSorting>
            Description
          </TableColumn>
          <TableColumn key={"date"} allowsSorting>
            Created At
          </TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isLoading}
          items={selectedTab == "all" ? courses ?? [] : myCourses ?? []}
          loadingContent={<Spinner />}
          style={{ overflowY: "auto" }}
        >
          {(course) => {
            return (
              <TableRow key={course.id}>
                <TableCell>{course.id}</TableCell>
                <TableCell>{course.title}</TableCell>
                <TableCell>{course.description}</TableCell>
                <TableCell>
                  {moment(course.createdAt).format("DD.MM.yyyy")}
                </TableCell>
                <TableCell className="gap-2 flex">
                  {user.role == "admin" && (
                    <Button
                      onPress={() => {
                        setSelectedCourseId(course.id);
                        onOpenEdit();
                      }}
                      isIconOnly
                    >
                      <MdEdit size={20} />
                    </Button>
                  )}
                  {user.role == "admin" && (
                    <Button
                      color="danger"
                      onPress={() => {
                        setSelectedCourseId(course.id);
                        onOpenDelete();
                      }}
                      isIconOnly
                    >
                      <HiOutlineTrash size={20} />
                    </Button>
                  )}

                  {user.role == "student" && selectedTab != "my" && (
                    <Button
                      color="success"
                      onPress={() => {
                        setSelectedCourseId(course.id);
                        enroll(course.id);
                      }}
                      isIconOnly
                    >
                      <FaPlus size={20} />
                    </Button>
                  )}

                  {user.role == "student" && selectedTab == "my" && (
                    <Button
                      color="danger"
                      onPress={() => {
                        setSelectedCourseId(course.id);
                        unenroll(course.id);
                      }}
                      isIconOnly
                    >
                      <FaMinus size={20} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>

      <CreateCourseModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />

      {isOpenEdit && (
        <EditCourseModal
          isOpen={isOpenEdit}
          onOpenChange={onOpenChangeEdit}
          onClose={onCloseEdit}
          courseId={selectedCourseId}
        />
      )}

      <Modal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Видалення курсу
              </ModalHeader>
              <ModalBody>
                Чи Ви впевнені, що бажаєте видалити цей курс?
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Скасувати
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    deleteCourse.delete(selectedCourseId);
                    onCloseDelete();
                  }}
                >
                  Видалити
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
