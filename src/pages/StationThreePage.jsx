import { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { navigate } from '../routes/routes';
import { markStationCompleted } from '../data/journeyProgress';

const processPhotos = [
  { label: 'Thao tác 1', title: 'Phết hồ nếp lên 28 nan tre', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0le1CbsVAa8Kz9GM_m8H-7SRUA9vJy0bvfCqnErg2hVw2EBeJS9rW1DHGnI7ct8e93RvEWwgIR-V7kZlfnplXNvnhZJxiyf67RaR3J8MajNt4x8KVovIY8yzxP8CgyDXoefLcdV1s2kIaaYgkODXmCVEzyuJ00zoR530s6IZsCvAQ48kojIXqt-IMtImzZuWgGA_r86a0nYWT2uJluDqG0anMmjXlPl4SXSgb-1zW' },
  { label: 'Thao tác 2', title: 'Căng lụa tơ tằm Nha Xá', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSkr8C51mKKLtA-48nPVIPcRwCOnDYwDXGbNka70xZLSWHdDaXC-fDqXQZSAxvt81Yfvi3Erh4-Qg_IAYjvwOxmgxYrnAD58cFU04Rotk33-Q6SEon_QFiSVYiX8_oW_NGxCXpr_BNza-Zl5o09VEFSHYyWyInwF9GDTccFIDc8cWl85aKKMXqdPpWBrT39u5loiFPQkD5vsoVdwqh1LWlv5PvMX0GDh3OEcyy-GNy' },
  { label: 'Thao tác 3', title: 'Miết phẳng và sấy se mặt lụa', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7NtW4BX7NYpzjo1TI6LF_oFTCFZh0OnstdtA_aryZSv5X7aP4_90ugcKndyZyzZ2uyNo_NDddHm_mZb21Z5g4HpqaArEJxfhFnaOVYGFOWqKN1zmwHrD9lvFGhAeALCfhHQxNWZEll0poxPwMVjCDdw-kOVxikLr1VoJUz6lvbvIIRMN6IEp7nIx_D53bn9gANu7U80Kqux1Vmni1VBP9ZXlIa8HeRfefkQ5RmvW4' },
];

const artisanVideo = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbEPOaMzNR6Nhw8qcoeevQiAOwhxLhUPvHDRQ5CWSdcRVok-AVCPYFHhIfGUDrbogRYuaMQqMQWxoOq2I90kLY4eGEk6b_t8mZk9R3eNqmxxsnLSHwC0LsAHrH29KykGQ5ApjoC1yV3RFqdCs9LtidrjsQkPAaYzVws-gfo3pnUu0QyxY-nX3t6K7a5VlBhkf6Wq4HpqEb-EjP8VmNz-HOEU9_nVBdIIaOFfJfVmvN';
const ribXs = [40, 60, 95, 140, 195, 250, 300, 350, 405, 460, 505, 540, 560];
const ribYs = [295, 240, 185, 135, 95, 70, 60, 70, 95, 135, 185, 240, 295];

export function StationThreePage() {
  const [glued, setGlued] = useState([]);
  const [fabric, setFabric] = useState(false);
  const [tool, setTool] = useState('brush');
  const [silkProgress, setSilkProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [isBrushing, setIsBrushing] = useState(false);
  const phase = done ? 'done' : fabric ? 'silk' : 'glue';

  const reset = () => {
    setGlued([]);
    setFabric(false);
    setSilkProgress(0);
    setDone(false);
    setTool('brush');
    setIsBrushing(false);
  };

  const isOnFanSurface = (event) => {
    const svg = event.currentTarget.querySelector('svg');
    if (!svg || !svg.contains(event.target)) return false;
    const bounds = svg.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 600;
    const y = ((event.clientY - bounds.top) / bounds.height) * 320;
    const outerDistance = ((x - 300) ** 2) + ((y - 250) ** 2);
    const innerDistance = ((x - 300) ** 2) + ((y - 268) ** 2);
    return outerDistance <= 245 ** 2 && innerDistance >= 170 ** 2 && y <= 270;
  };

  const handleCanvasPointer = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    if (phase === 'glue' && tool === 'brush' && (event.type === 'pointerdown' || isBrushing)) {
      if (!isOnFanSurface(event)) return;
      const zone = Math.max(0, Math.min(5, Math.floor((x / bounds.width) * 6)));
      setGlued((current) => [...new Set([...current, zone])]);
    }
    if (phase === 'silk' && tool === 'smoother') {
      if (!isOnFanSurface(event)) return;
      const svg = event.currentTarget.querySelector('svg');
      const svgBounds = svg.getBoundingClientRect();
      const svgX = ((event.clientX - svgBounds.left) / svgBounds.width) * 600;
      const progress = Math.round(((svgX - 60) / 480) * 100);
      setSilkProgress((current) => Math.min(100, Math.max(current, progress)));
    }
  };

  const gluePercent = Math.round(glued.length / 6 * 100);

  return (
    <main className="rebuilt-station station-three-rebuilt">
      <StationTop title="Trạm 3: Dán mặt quạt" progress="2/4" />
      <section className="rebuilt-hero rebuilt-hero-three">
        <div>
          <span>▣ KỸ NGHỆ HỒ NẾP & LỤA TƠ TẰM NHA XÁ</span>
          <h1>Trạm 3: DÁN MẶT QUẠT — <em>Hoàn thiện mặt lụa óng ả</em></h1>
          <p>Khác với việc chuốt xếp xương nan ở Trạm 2, dán mặt quạt đòi hỏi đôi bàn tay nhạy cảm: quét đều lớp hồ nếp quấy truyền thống trên nan tre, đặt mặt lụa đỏ son Nha Xá lên khung và miết sạch bọt khí để mặt quạt căng mịn.</p>
        </div>
        <Stage steps={['Xem mẫu', 'Phết keo nếp', 'Dán lụa lên quạt', 'Hoàn thành']} active={phase === 'glue' ? 2 : phase === 'silk' ? 3 : 4} />
      </section>

      <div className="three-main">
        <section className="three-left">
          <div className="rebuilt-card glue-board">
            <header>
              <strong>● {phase === 'glue' ? 'Bước 2: Phết keo nếp phủ kín nan tre' : phase === 'silk' ? 'Bước 3: Căn & Miết lụa tơ tằm Nha Xá' : 'Bước 4: Hoàn thành dán lụa mặt quạt'}</strong>
              <div>
                <button className={tool === 'brush' ? 'selected' : ''} onClick={() => setTool('brush')} type="button">🖌 Cọ đuôi ngựa</button>
                <button
                  className={tool === 'fabric' ? 'selected' : ''}
                  disabled={phase === 'glue' && gluePercent < 100}
                  onClick={() => {
                    if (phase === 'glue' && gluePercent === 100) {
                      setFabric(true);
                      setTool('smoother');
                    }
                  }}
                  type="button"
                >
                  ▣ Lụa son Nha Xá
                </button>
                <button className={tool === 'smoother' ? 'selected' : ''} onClick={() => setTool('smoother')} type="button">▣ Bàn miết nan</button>
                <button onClick={reset} type="button">↻</button>
              </div>
            </header>

            <div className={`glue-canvas is-${phase}`}>
              <div className="glue-hud">
                <span>◉ {phase === 'glue' ? 'Nhấn giữ chuột và rê cọ trên quạt để quét lớp hồ bột quấy đều từ sống nan ra ngoài.' : phase === 'silk' ? `Rê chuột trên bề mặt quạt bằng bàn miết để vuốt sạch khí. Độ miết: ${silkProgress}%` : 'Mặt quạt đã căng phẳng, keo nếp kết dính hoàn hảo.'}</span>
                <b>{phase === 'silk' ? 'Độ miết lụa' : 'Độ phủ keo'}: {phase === 'silk' ? silkProgress : gluePercent}%</b>
              </div>

              <div
                className={`glue-fan tool-${tool}`}
                onPointerDown={(event) => {
                  if (phase === 'glue' && tool === 'brush' && !isOnFanSurface(event)) return;
                  setIsBrushing(true);
                  handleCanvasPointer(event);
                }}
                onPointerLeave={() => setIsBrushing(false)}
                onPointerMove={handleCanvasPointer}
                onPointerUp={() => setIsBrushing(false)}
              >
                <svg viewBox="0 0 600 320" aria-label="Khung quạt mô phỏng" role="img">
                  <defs>
                    <linearGradient id="glue-shine" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#fdc97c" stopOpacity="0.9" />
                      <stop offset="50%" stopColor="#ffddb0" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#7d5714" stopOpacity="0.4" />
                    </linearGradient>
                    <radialGradient id="silk-pattern" cx="50%" cy="100%" r="90%">
                      <stop offset="0%" stopColor="#8f2924" />
                      <stop offset="45%" stopColor="#6f1110" />
                      <stop offset="90%" stopColor="#410003" />
                    </radialGradient>
                    <filter id="silk-shadow" x="-10%" y="-10%" width="120%" height="120%">
                      <feDropShadow dx="0" dy="6" floodColor="#382f27" floodOpacity="0.25" stdDeviation="6" />
                    </filter>
                  </defs>
                  <circle cx="300" cy="305" fill="#614000" r="14" />
                  <circle cx="300" cy="305" fill="#ffddb0" r="9" />
                  <circle cx="300" cy="305" fill="#6f1110" r="4" />
                  <g stroke="var(--bamboo-dark)" strokeLinecap="round">
                    {ribXs.map((x, index) => <line key={x} strokeWidth={index === 0 || index === 6 || index === 12 ? 4.5 : 3.5} x1="300" y1="305" x2={x} y2={ribYs[index]} />)}
                  </g>
                  <path d="M60 250A245 245 0 0 1 540 250L460 268A170 170 0 0 0 140 268Z" fill="url(#glue-shine)" opacity="0.85" />
                  {fabric && <g filter="url(#silk-shadow)"><path d="M40 295A260 260 0 0 1 560 295L470 295A170 170 0 0 0 130 295Z" fill="url(#silk-pattern)" opacity="0.96" /><path d="M40 295A260 260 0 0 1 560 295L470 295A170 170 0 0 0 130 295Z" fill="none" stroke="#fdc97c" strokeWidth="1" opacity="0.4" /></g>}
                  <path d="M50 285L300 55L550 285" fill="none" stroke="#f1be72" strokeDasharray="4" strokeWidth="1.5" opacity={phase === 'silk' ? 1 : 0} />
                  {phase !== 'glue' && <g fill="#6f1110" stroke="#fff" strokeWidth="2"><circle cx="50" cy="285" r="7" /><circle cx="300" cy="55" r="7" /><circle cx="550" cy="285" r="7" /></g>}
                  {tool === 'smoother' && phase === 'silk' && <g transform="translate(390 155)"><rect fill="#7d5714" height="18" rx="3" width="70" /><rect fill="#fdc97c" height="6" rx="1" width="62" x="4" y="16" /><text fill="#fff8f5" fontFamily="'Be Vietnam Pro'" fontSize="7" fontWeight="bold" textAnchor="middle" x="35" y="12">BÀN MIẾT</text></g>}
                  <circle cx="300" cy="305" r="15" fill="var(--bamboo-dark)" />
                </svg>
                {phase !== 'glue' && <div className="glue-zone-markers" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <i className={glued.includes(index) ? 'active' : ''} key={index} />)}</div>}
                {phase === 'silk' && <button className="silk-overlay" disabled={silkProgress < 100} onClick={() => { markStationCompleted(3); setDone(true); }} type="button">✓ {silkProgress < 100 ? 'Rê bàn miết trên mặt lụa' : 'Xác nhận đã miết lụa lên quạt'}</button>}
              </div>

              <div className="glue-action">
                <span>● Lụa Tơ Tằm Đỏ Son Nha Xá　 ● Hồ Nếp Cái Hoa Vàng Quấy Dẻo</span>
                <button
                  disabled={phase === 'glue' ? gluePercent < 100 : phase !== 'silk'}
                  onClick={() => {
                    if (phase === 'glue' && gluePercent === 100) {
                      setFabric(true);
                      setTool('smoother');
                    }
                  }}
                  type="button"
                >
                  {phase === 'glue' ? 'Nhấn để phủ Lụa son Nhà Xá' : phase === 'silk' ? `Độ miết lụa: ${silkProgress}%` : '✓ Đã dán lụa'}
                </button>
              </div>
            </div>

            <div className="glue-facts">
              <div><b>⚒ Hồ Nếp Tinh Chế</b><span>Nấu từ bột nếp quấy kỹ, giữ độ dính tự nhiên qua hàng chục năm mà không làm mục nan tre.</span></div>
              <div><b>▧ Căn Cung 180 Độ</b><span>Hai nan cái khóa góc đối xứng tuyệt đối, giữ dải lụa phẳng phiu khi xòe tròn.</span></div>
              <div><b>✧ Miết Khí Chống Nhăn</b><span>Thanh miết sừng vuốt dọc sống nan, giải phóng bọt khí đọng dưới thớ tơ tằm.</span></div>
            </div>
          </div>

          <section className="process-gallery rebuilt-card">
            <header><div><span>TƯ LIỆU NGHỆ NHÂN</span><h3>Hình ảnh quy trình dán lụa thực tế</h3></div><small>▧ Kho lưu trữ KÉN</small></header>
            <div>{processPhotos.map((photo) => <article key={photo.label}><img alt={photo.title} src={photo.url} /><b>{photo.label}</b><strong>{photo.title}</strong></article>)}</div>
          </section>
        </section>

        <aside className="three-aside">
          <section className="rebuilt-card"><button className="silk-video" style={{ backgroundImage: `linear-gradient(180deg, transparent, rgb(0 0 0 / 72%)), url("${artisanVideo}")` }} type="button">▶ <b>Video Nghệ Nhân Hướng Dẫn　01:45</b></button><p>Theo dõi cách nghệ nhân giữ nhịp tay thoăn thoắt đưa cọ quét từ tim nan ra mép ngoài, giúp hồ thấm sâu mà không loang qua thớ lụa mỏng.</p></section>
          <section className="artisan-note"><b>SAU LỚP LỤA LÀ CẢ MỘT CÂU CHUYỆN</b><h3>Nghệ nhân Dương Văn Đoàn</h3><small>Làng quạt Chàng Sơn • 45 năm gắn bó</small><blockquote>“Lụa Chàng Sơn dán khéo là khi gấp mở tiếng quạt kêu giòn rụm, mặt lụa phẳng lì như tranh vẽ son rực rỡ.”</blockquote><p>Mỗi chiếc quạt trao đi là sự kết duyên giữa nan tre bền bỉ đất Thạch Thất và óng ả lụa tơ tằm Nha Xá Hà Nam.</p></section>
          <section className={`heritage-seal ${done ? 'is-earned' : ''}`}><div>扇<br /><small>KÉN<br />CHÀNG SƠN</small></div><h3>{done ? 'Đã Chứng Nhận Dán Mặt Quạt' : 'Triện chứng nhận Trạm 3'}</h3><b>{done ? 'XÁC THỰC MỘC ĐỎ SỐ #CS-03-2026' : 'Hoàn tất thao tác để mở khóa'}</b><p>Khung nan và tấm lụa đã hòa làm một thể trọn vẹn.</p></section>
          <section className="next-station-card"><span>{done ? 'TRẠM ĐÃ HOÀN THÀNH' : 'CHẶNG TIẾP THEO'}</span><h3>{done ? 'Quay về bản đồ làng' : 'Trạm 4: Hoàn thiện'}</h3><p>{done ? 'Dấu hoàn thành đã được lưu. Tiếp tục hành trình bằng cách chọn một địa điểm trên bản đồ.' : 'Tỉa diềm lụa, tra chốt đồng và in dấu triện vàng độc quyền KÉN.'}</p><button disabled={!done} onClick={() => navigate('/map')} type="button">{done ? 'Quay về bản đồ làng →' : 'Hoàn thành Trạm 3 để tiếp tục'}</button></section>
        </aside>
      </div>

      <div className="rebuilt-footer"><button onClick={() => navigate('/map')} type="button">⌖ Quay về bản đồ làng</button></div>
      <Modal footer={<button className="stitch-button" onClick={() => navigate('/map')} type="button">Quay về bản đồ làng</button>} open={done} onClose={() => navigate('/map')} title="Mặt quạt đã hoàn thành"><p className="body-md">Lớp lụa đã được căn và miết phẳng. Trạm 3 đã hoàn thành, tiến độ đã lưu trên bản đồ.</p></Modal>
    </main>
  );
}

function StationTop({ title, progress }) {
  return <div className="rebuilt-top"><span>⌂ Làng nghề Chàng Sơn　/　<b>{title}</b></span><strong>● ● ◉ ○　 Tiến độ di sản: {progress} Trạm</strong></div>;
}

function Stage({ steps, active }) {
  return <div className="rebuilt-stage">{steps.map((step, index) => <span className={index + 1 === active ? 'active' : index + 1 < active ? 'complete' : ''} key={step}><b>{index + 1}</b>{step}</span>)}</div>;
}
