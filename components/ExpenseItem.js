import { categoryLabel, formatYen } from "@/lib/categories";

export default function ExpenseItem({
  amount,
  category,
  note,
  date,
  id,
  onDelete,
  isDeleting,
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <div className="text-sm text-gray-500">
          {categoryLabel(category)}・{date}
        </div>
        <div className="text-gray-800">{note}</div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-bold">{formatYen(amount)}</span>
        <button
          onClick={() => onDelete(id)}
          className="text-sm font-medium text-gray-400 transition-colors hover:text-red-600"
          disabled={isDeleting}
        >
          {isDeleting ? "削除中..." : "削除"}
        </button>
      </div>
    </div>
  );
}
