export async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(
      error.error || error.message || "APIリクエストに失敗しました！"
    );
  }
  return res.json();
}

export async function getExpenses() {
  return request("/api/expenses");
}

export async function createExpense(expense) {
  return request("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
}

export async function deleteExpense(id) {
  return request(`/api/expenses/${id}`, {
    method: "DELETE",
  });
}

export async function updateExpense(id, expense) {
  return request(`/api/expenses/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense),
  });
}
