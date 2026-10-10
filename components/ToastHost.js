export default function ToastHost({ toast }) {
  if (!toast) return null;

  return (
    <div role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}
