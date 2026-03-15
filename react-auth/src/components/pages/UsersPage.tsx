import {
  Button,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import React, { useMemo, useState, type ChangeEvent } from "react";
import useUsers from "../../queries/useUsers";
import { MdEdit } from "react-icons/md";
import useDeactivateUser from "../../queries/useDeactivateUser";
import EditUserModal from "../users/EditUserModal";
import useActivateUser from "../../queries/useActivateUser";
import { FaPlus } from "react-icons/fa";
import CreateUserModal from "../users/CreateUserModal";

export default function UsersPage() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { users, isLoading } = useUsers();
  const { deactivate } = useDeactivateUser();
  const { activate } = useActivateUser();

  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onOpenChange: onOpenChangeCreate,
    onClose: onCloseCreate,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onOpenChange: onOpenChangeEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const topContent = useMemo(() => {
    return (
      <div className="w-full justify-between gap-2 flex items-center">
        <div className="flex items-center gap-2">
          <Button
            startContent={<FaPlus />}
            color="primary"
            onPress={() => onOpenCreate()}
          >
            Add new
          </Button>
        </div>
      </div>
    );
  }, [onOpenCreate]);

  return (
    <div className="p-5 max-h-full">
      <Table
        topContentPlacement="outside"
        topContent={topContent}
        aria-label="Example static collection table"
        className="overflow-y-scroll max-h-full"
        classNames={{
          wrapper: "overflow-y-scroll max-h-[800px]",
        }}
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn key={"id"} allowsSorting>
            Id
          </TableColumn>
          <TableColumn key={"username"} allowsSorting>
            Username
          </TableColumn>
          <TableColumn key={"role"} allowsSorting>
            Role
          </TableColumn>
          <TableColumn key={"isActive"} allowsSorting>
            IsActive
          </TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>

        <TableBody isLoading={isLoading} loadingContent={<Spinner />}>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.role?.name}</TableCell>
              <TableCell>
                <Switch
                  onValueChange={(isSelected: boolean) => {
                    console.log(isSelected);
                    if (isSelected == false) {
                      deactivate(user.id);
                    } else {
                      activate(user.id);
                    }
                  }}
                  defaultSelected={user.isActive}
                />
              </TableCell>
              <TableCell>
                <Button
                  onPress={() => {
                    console.log(user.id);
                    setSelectedUserId(user.id);
                    onOpenEdit();
                  }}
                  isIconOnly
                >
                  <MdEdit size={20} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users &&
      selectedUserId &&
      users.find((u) => u.id == selectedUserId) &&
      users.find((u) => u.id == selectedUserId)?.role ? (
        <EditUserModal
          isOpen={isOpenEdit}
          onOpenChange={onOpenChangeEdit}
          onClose={onCloseEdit}
          userId={selectedUserId}
          roleId={users.find((u) => u.id == selectedUserId)?.role?.id!}
        />
      ) : (
        <div>fsdf</div>
      )}

      <CreateUserModal
        isOpen={isOpenCreate}
        onOpen={onOpenCreate}
        onOpenChange={onOpenChangeCreate}
        onClose={onCloseCreate}
      />
    </div>
  );
}
