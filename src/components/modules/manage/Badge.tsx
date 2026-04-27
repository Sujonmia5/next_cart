import { Badge } from "@/components/ui/badge";

export const PriorityBadge = ({
  priority,
}: {
  priority: string | undefined;
}) => {
  if (priority === "high") {
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-semibold text-[11px] px-2 py-0.5 rounded-full hover:bg-emerald-500/10"
      >
        High
      </Badge>
    );
  }
  if (priority === "medium") {
    return (
      <Badge
        variant="outline"
        className="bg-amber-500/10 text-amber-400 border-amber-500/20 font-semibold text-[11px] px-2 py-0.5 rounded-full hover:bg-amber-500/10"
      >
        Medium
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="bg-rose-500/10 text-rose-400 border-rose-500/20 font-semibold text-[11px] px-2 py-0.5 rounded-full hover:bg-rose-500/10"
    >
      Low
    </Badge>
  );
};
