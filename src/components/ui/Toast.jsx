export function Toast({ message, tone = 'success', onClose }) {
  if (!message) return null;

  return (
    <div aria-live="polite" className={`toast toast--${tone}`} role="status">
      <span>{message}</span>
      {onClose && <button aria-label="Đóng thông báo" onClick={onClose} type="button">×</button>}
    </div>
  );
}
