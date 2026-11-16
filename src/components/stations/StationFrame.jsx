import { navigate } from '../../routes/routes';
import { Breadcrumb } from '../ui/Breadcrumb';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';

export function StationFrame({
  station,
  progress,
  instructions,
  children,
  feedback,
  onGuide,
  onBack,
  onContinue,
  continueLabel = 'Tiếp tục',
  continueDisabled = false,
}) {
  return (
    <main className="station-page">
      <div className="container">
        <div className="station-page__topbar">
          <Breadcrumb items={[{ label: 'Làng nghề' }, { label: station.title }]} />
          <button className="station-guide-link" onClick={onGuide} type="button">
            ? Xem hướng dẫn
          </button>
        </div>
        <header className="station-page__header">
          <div>
            <p className="eyebrow">Trạm {station.id} / 04</p>
            <h1 className="headline-lg">Trạm {station.id}: {station.title}</h1>
            <p className="body-lg">{station.subtitle}</p>
          </div>
          <div className="station-page__progress">
            <ProgressBar label={`Tiến độ trạm ${station.id}`} value={progress} />
          </div>
        </header>
        <nav className="station-step-tracker" aria-label="Các bước trong trạm">
          {['Xem mẫu', 'Thao tác', 'Kiểm tra', 'Hoàn thành'].map((step, index) => (
            <span className={index === station.id - 1 ? 'is-active' : index < station.id - 1 ? 'is-complete' : ''} key={step}>
              <b>{index + 1}</b>{step}
            </span>
          ))}
        </nav>
        <div className="station-instructions">
          <span className="station-instructions__icon">i</span>
          <p className="body-sm">{instructions}</p>
        </div>
        {children}
        {feedback && (
          <div className={`station-feedback station-feedback--${feedback.type}`} role="status">
            <strong>{feedback.title}</strong>
            <span>{feedback.message}</span>
          </div>
        )}
        <footer className="station-page__actions">
          <Button onClick={onBack} variant="secondary">Quay lại</Button>
          <Button disabled={continueDisabled} onClick={onContinue}>
            {continueLabel}
          </Button>
        </footer>
      </div>
    </main>
  );
}

export function StationCompletion({ station, message, onRestart }) {
  return (
    <section className="station-completion">
      <div className="station-completion__seal">✓</div>
      <p className="eyebrow">Đã hoàn thành trạm {station.id}</p>
      <h2 className="headline-lg">{station.completionTitle}</h2>
      <p className="body-lg">{message}</p>
      <div className="station-completion__actions">
        <Button onClick={onRestart} variant="secondary">Thử lại</Button>
        <Button onClick={() => navigate('/map')}>Về bản đồ làng nghề</Button>
      </div>
    </section>
  );
}
