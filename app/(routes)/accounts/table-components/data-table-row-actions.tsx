"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { accountSchema } from "../table-data/schema";
import { useRouter } from "next/navigation";
import AlertModal from "@/components/modals/alert-modal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import RightViewModalNoTrigger from "@/components/modals/right-view-notrigger";
import { Copy } from "lucide-react";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const router = useRouter();
  const account = accountSchema.parse(row.original);

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const onDelete = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/accounts/set-deleted/${account.id}`, {
        isActive: true,
      });
      toast({
        title: "Hotovo",
        description: "Účet byl smazán.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating account. Please try again.",
      });
    } finally {
      setLoading(false);
      setOpen(false);
      router.refresh();
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Hotovo",
      description: "Privátní kód byl zkopírován do schránky.",
    });
  };

  const onSetActive = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/accounts/set-active/${id}`, {
        isActive: true,
      });
      toast({
        title: "Hotovo",
        description: "Účet byl aktivován.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating account. Please try again.",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const onSetInactive = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/accounts/set-inactive/${id}`, {
        isActive: true,
      });
      toast({
        title: "Hotovo",
        description: "Účet byl deaktivován.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating account. Please try again.",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const onSetSuspended = async (id: string) => {
    setLoading(true);
    try {
      await axios.put(`/api/accounts/set-suspended/${id}`, {
        isActive: true,
      });
      toast({
        title: "Hotovo",
        description: "Účet byl pozastaven.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Something went wrong while activating account. Please try again.",
      });
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[260px]">
          <DropdownMenuItem
            onClick={() => router.push(`/accounts/${account?.id}`)}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setUpdateOpen(true)}>
            Update
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onSetActive(account.id)}>
            Aktivovat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSetInactive(account.id)}>
            Deaktivovat
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSetSuspended(account.id)}>
            Pozastavit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(account.publicKey)}>
            <Copy className="mr-2 w-4 h-4" />
            Kopírovat privátní kód
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
