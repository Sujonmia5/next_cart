import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteDialog({
  deleteId,
  setDeleteId,
  handleDelete,
}: {
  deleteId: string | null;
  setDeleteId: (id: string | null) => void;
  handleDelete: () => void;
}) {
  return (
    <AlertDialog
      open={!!deleteId}
      onOpenChange={(o) => !o && setDeleteId(null)}
    >
      <AlertDialogContent className="bg-[#13141c] border border-white/[0.08] max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Delete Product
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/60">
            Are you sure you want to delete this product? This action cannot be
            undone and the product will be permanently removed from your store.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="bg-[#1a1b26] border-white/[0.08] text-white hover:bg-white/5 hover:text-white rounded-xl h-10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-rose-600 hover:bg-rose-500 text-white rounded-xl h-10"
          >
            Delete Product
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
