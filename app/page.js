"use client";
import { useState, useEffect } from "react";
import ExpenseList from "@/components/ExpenseList";
import ExpenseForm from "@/components/ExpenseForm";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      if (res.ok) {
        setExpenses(data);
      } else {
        throw new Error("例外が発生");
      }
    } catch (e) {
      setError(`${e.message}, エラーが出ました！`);
    } finally {
      setLoading(false);
    }
  }

  // const handleAdd = (newExpense) => {
  //   setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
  // };
  async function handleAdd(newExpense) {
    setIsSaving(true);
    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      });

      if (res.ok) {
        load(); //追加できたので、全部を撮り直す
      } else {
        console.error("追加に失敗しました。");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
    }
  }

  // const handleDelete = (id) => {
  //   setExpenses((prevExpenses) =>
  //     prevExpenses.filter((expense) => expense.id !== id)
  //   );
  // };

  async function handleDelete(id) {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        load();
      } else {
        console.error("削除に失敗しました");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsDeleting(false);
    }
  }

  let content;

  if (loading) {
    content = <p>読み込み中...</p>;
  } else if (error) {
    content = <p>{error}</p>;
  } else {
    content = (
      <div className="space-y-8">
        <ExpenseList
          expenses={expenses}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
        <ExpenseForm onAdd={handleAdd} isSaving={isSaving} />
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="text-3xl font-bold">支出管理</h1>
      <p className="mt-2 text-gray-600">このアプリは動いています。</p>
      <hr className="my-6 border-gray-200" />
      {content}
    </main>
  );
}
