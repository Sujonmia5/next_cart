"use client";
import { Trash2, Edit2 } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import DeleteDialog from "./Dialog";

const TableAction = ({
  handleDelete,
  productId,
}: {
  handleDelete: (id: string) => void;
  productId: string;
}) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const confirmDelete = () => {
    if (deleteId) {
      startTransition(() => {
        handleDelete(deleteId);
        setDeleteId(null);
      });
    }
  };

  return (
    <>
      <Link
        href={`/dashboard/items/manage/${productId}`}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all"
      >
        <Edit2 size={14} />
      </Link>
      <button
        onClick={() => setDeleteId(productId)}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
        disabled={isPending}
      >
        <Trash2 size={14} />
      </button>

      <DeleteDialog
        deleteId={deleteId}
        setDeleteId={setDeleteId}
        handleDelete={confirmDelete}
      />
    </>
  );
};

export default TableAction;
