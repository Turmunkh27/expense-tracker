import { useState } from "react";
import ExpenseItem from "@/components/ExpenseItem";
import { formatYen, CATEGORIES } from "@/lib/categories";

export default function ExpenseList({ expenses, onDelete, isDeleting }) {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredExpenses =
    categoryFilter === "all"
      ? expenses
      : expenses.filter((expense) => expense.category === categoryFilter);

  const total = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoryFilter("all")}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            categoryFilter === "all"
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          すべて
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategoryFilter(c.value)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              categoryFilter === c.value
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {expenses.length === 0 ? (
        <p className="py-8 text-center text-gray-500">まだ支出がありません</p>
      ) : filteredExpenses.length === 0 ? (
        <p className="py-8 text-center text-gray-500">
          このカテゴリの支出はありません
        </p>
      ) : (
        <div className="space-y-2">
          {filteredExpenses.map((expense) => (
            <ExpenseItem
              amount={expense.amount}
              category={expense.category}
              note={expense.note}
              date={expense.date}
              key={expense.id}
              id={expense.id}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-bold">
        <span>合計</span>
        <span>{formatYen(total)}</span>
      </div>
    </div>
  );
}
