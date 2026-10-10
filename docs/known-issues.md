# 既知の課題

実装中に気づいたが、今は優先度が低いため後回しにした問題を記録する。
コードと直接は結びつかない、自分用の管理ファイル。

優先度: 高 / 中 / 低

---

## 高

## 中

- **[week2] PATCHのバリデーション未実装**
  `app/api/expenses/[id]/route.js` の `PATCH` は、`update(id, changes)` に渡す`changes`(部分的な更新データ)を一切検証していない。`POST`と同じく`amount`が数値でない/0以下、`category`が指定値以外の場合でも、そのまま`data/expenses.json`に書き込まれてしまう。
  対応方針: `PATCH`ハンドラ内で、既存のexpenseを取得 → `changes`とマージ → マージ後の完全なオブジェクトを`validateExpense`に渡す、という流れにする(`changes`単体を渡すと、部分更新なのに未入力フィールドが誤ってエラー判定されるため)。

## 低

- **[week3] 削除ボタンのdisabled範囲が粗い**
  複数の支出がある時、どれか1つを削除している間、`isDeleting`が共通stateのため他の削除ボタンも全てdisabledになる。UX上は「クリックした項目だけ」disabledにする方が正確。
  対応方針: 削除中の`id`自体をstateで持ち、`ExpenseItem`側で「自分のidと一致するか」を比較してdisabled判定する。
