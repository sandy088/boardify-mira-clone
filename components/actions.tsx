"use client";

import {
  DropdownMenuContentProps,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import ConfirmModal from "./confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "@/store/use-rename-modal";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Actions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionProps) => {
  const { mutate, pending } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();
  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch(() => toast.error("Failed to delete board"));
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => {
        toast.success("Link copied to clipboard");
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        side={side}
        sideOffset={sideOffset}
        className=" w-60"
      >
        <DropdownMenuItem onClick={onCopyLink} className=" p-3 cursor-pointer">
          <Link2 className="w-4 h-4 mr-2" />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className=" p-3 cursor-pointer"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          header="Delete Board?"
          description="Are you sure you want to delete this board? This action cannot be undone."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            //   onClick={onDelete}
            variant={"ghost"}
            className=" p-3 text-sm justify-start w-full font-normal cursor-pointer text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-2 text-red-700" />
            Delete Board
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
