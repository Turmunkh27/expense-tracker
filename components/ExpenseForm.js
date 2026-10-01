import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";

export default function ExpenseForm({ onAdd, isSaving }) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const newExpense = {
          id: crypto.randomUUID(),
          amount: Number(amount),
          note: note,
          category: category,
          date: new Date().toISOString().slice(0, 10),
        };
        onAdd(newExpense);
        setAmount("");
        setNote("");
        setCategory("");
      }}
      className="mx-auto flex max-w-2xl flex-col gap-3 rounded-lg border border-gray-200 p-4"
    >
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="金額"
        className="rounded border border-gray-300 px-3 py-2"
      ></input>
      <input
        type="text"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="メモ"
        className="rounded border border-gray-300 px-3 py-2"
      ></input>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="rounded border border-gray-300 px-3 py-2"
      >
        <option value="">カテゴリを選択してください</option>
        {CATEGORIES.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="rounded bg-gray-900 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-800"
        disabled={isSaving}
      >
        {isSaving ? "保存中..." : "追加"}
      </button>
    </form>
  );
}
