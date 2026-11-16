export function ProgressBar({ value = 0, label = 'Tiến độ', showValue = true }) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div className="progress">
      <div className="progress__header">
        <span className="label-md">{label}</span>
        {showValue && <span className="label-md">{safeValue}%</span>}
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={safeValue}
      >
        <span className="progress__value" style={{ width: `${safeValue}%` }} />
      </div>
    </div>
  );
}
