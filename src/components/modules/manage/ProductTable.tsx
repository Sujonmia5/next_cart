import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types/product.interface";
import { PriorityBadge } from "./Badge";
import { Eye, Package } from "lucide-react";
import Image from "next/image";
import TableAction from "./TableAction";

const ProductTable = ({
  productsData,
  handleDelete,
}: {
  productsData: TProduct[];
  handleDelete: (id: string) => void;
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader className="bg-[#0f1117]/50 border-b border-white/[0.06]">
          <TableRow className="hover:bg-transparent border-none">
            <TableHead className="text-[11px] uppercase tracking-widest text-white/40 font-semibold h-11 px-6">
              Product
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-widest text-white/40 font-semibold h-11">
              Price
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-widest text-white/40 font-semibold h-11">
              Priority
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-widest text-white/40 font-semibold h-11">
              Created At
            </TableHead>
            <TableHead className="text-[11px] uppercase tracking-widest text-white/40 font-semibold h-11 text-right px-6">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData.map((product: TProduct) => (
            <TableRow
              key={String(product._id)}
              className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
            >
              <TableCell className="px-6 py-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#1a1b26] border border-white/[0.08] flex items-center justify-center overflow-hidden shadow-sm">
                    {product.imageUrl?.[0] ? (
                      <Image
                        width={50}
                        height={50}
                        src={product.imageUrl[0]}
                        alt={product.title}
                      />
                    ) : (
                      <Package className="text-white/40" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90 group-hover:text-violet-400 transition-colors">
                      {product.title}
                    </p>
                    <p className="text-[11px] text-white/30 truncate max-w-[150px] mt-0.5">
                      {product.shortDescription || "No description"}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-head text-sm font-bold text-white">
                ${product.price?.toFixed(2) || "0.00"}
              </TableCell>
              <TableCell>
                <PriorityBadge priority={product.priority} />
              </TableCell>
              <TableCell className="text-sm text-white/60">
                {product.createdAt
                  ? new Date(product.createdAt).toLocaleDateString()
                  : "-"}
              </TableCell>
              <TableCell className="px-6 text-right">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 hover:bg-violet-500 hover:text-white transition-all">
                    <Eye size={14} />
                  </button>
                  <TableAction
                    handleDelete={handleDelete}
                    productId={String(product._id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
          {productsData.length === 0 && (
            <TableRow className="border-none hover:bg-transparent">
              <TableCell
                colSpan={6}
                className="h-32 text-center text-white/40 text-sm"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
