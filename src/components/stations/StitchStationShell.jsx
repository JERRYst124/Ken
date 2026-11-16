import { navigate } from '../../routes/routes';

export function StitchStationShell({ station, children }) {
  return (
    <main className="stitch-workspace">
      <div className="stitch-workspace__crumb">
        <span>⌂ Làng nghề Chàng Sơn</span><b>/</b><strong>{station.title}</strong>
        <span className="stitch-workspace__tag">{station.tag}</span>
      </div>
      <section className="stitch-workspace__hero">
        <div>
          <span className="stitch-workspace__eyebrow">{station.badge}</span>
          <h1>{station.heading}</h1>
          <p>{station.description}</p>
        </div>
        {station.seal && <div className="stitch-workspace__seal"><b>扇</b><span>TRIỆN KÉN CHÀNG SƠN<small>Khung Quạt Thạch Thất</small></span></div>}
        <div className="stitch-workspace__progress"><span className="stitch-workspace__progress-icon">✦</span><div><span>Tiến trình làm quạt</span><b>{station.progress}</b><small>{station.progressNote ?? 'Hành trình di sản'}</small><i><em style={{ width: station.progressWidth }} /></i></div></div>
      </section>
      {children}
      <div className="stitch-workspace__footer-actions">
        <button onClick={() => navigate(station.back)} type="button">← Quay lại</button>
        <button onClick={() => navigate(station.next)} type="button">Tiếp tục hành trình →</button>
      </div>
    </main>
  );
}

export function StitchStageBar({ active = 1, labels }) {
  return <div className="stitch-stage-bar">{labels.map((label, index) => <span className={index + 1 === active ? 'is-active' : index + 1 < active ? 'is-complete' : ''} key={label}><b>{index + 1}</b>{label}</span>)}</div>;
}
