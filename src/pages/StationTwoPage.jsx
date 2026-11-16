import { useState } from 'react';
import { Modal } from '../components/ui/Modal';
import { navigate } from '../routes/routes';
import { stitchAssets } from '../data/content';
import { markStationCompleted } from '../data/journeyProgress';

const ribs = Array.from({ length: 11 }, (_, index) => index);

export function StationTwoPage() {
  const [placed, setPlaced] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [guide, setGuide] = useState(false);
  const placeRib = (index) => setPlaced((current) => current.includes(index) ? current : [...current, index]);
  const handleDrop = (event, index) => {
    event.preventDefault();
    const ribIndex = Number(event.dataTransfer.getData('rib'));
    if (Number.isInteger(ribIndex)) placeRib(index);
  };
  return <main className="rebuilt-station station-two-rebuilt">
    <StationTop title="Trạm 2: Tạo nan quạt" progress="1/4" />
    <section className="rebuilt-hero"><div><span>⚒ THỰC HÀNH TAY NGHỀ THỦ CÔNG • LEARNING BY DOING</span><h1>Nhiệm vụ tại Trạm 2 — Tạo nan quạt</h1><p>Tạo nên khung xương linh hồn của chiếc quạt Chàng Sơn. Kéo thả từng nan tre già dẻo dai vào đúng vị trí cung tròn bán nguyệt, cố định vào chốt trục đồng thau.</p></div><div className="rebuilt-seal"><b>扇</b><span>TRIỆN KÉN CHÀNG SƠN<small>Khung Quạt Thạch Thất</small></span></div></section>
    <div className="rebuilt-three-columns">
      <aside className="rebuilt-column"><section className="rebuilt-card"><header><b>● Video Nghệ Nhân Chỉ Dạy</b><small>1:28 HD</small></header><button className="rebuilt-video" onClick={() => setPlaying((value) => !value)} style={{ backgroundImage: `linear-gradient(180deg, transparent, rgb(0 0 0 / 75%)), url("${stitchAssets.stationTwoVideo}")` }} type="button"><i>{playing ? 'Ⅱ' : '▶'}</i><strong>Bài học 02</strong><span>Nghệ nhân Dương Văn Mơ<br /><small>Bí quyết chọn tre và chốt nan chuẩn độ mở</small></span></button><blockquote>💡 <b>MẸO VÓT NAN CHÀNG SƠN</b><br />“Nan cái cần dày bản để chịu lực. Nan con bên trong vót mỏng hơn đều tay.”</blockquote></section><section className="rebuilt-card rebuilt-check"><h3>☑ Các bước tạo khung quạt</h3><p>✓ Chọn gióng tre ngâm đủ 3 tháng <b>Xong</b></p><p className="current">2. Sắp xếp 11 nan theo góc xòe <b>Đang làm</b></p><p>3. Tán đinh nhôm cổ & buộc chỉ neo <b>Chờ</b></p></section></aside>
      <section className="rebuilt-card rebuilt-workbench"><header><div><span>KHU VỰC TƯƠNG TÁC TRỰC QUAN</span><h2>Bàn Chế Tác Nan Tre Ảo</h2></div><b>Tiến độ nan: {placed.length}/11</b></header><div className="workbench-instruction">◉ Kéo nan tre từ khay dưới và thả vào đúng khe trống <button onClick={() => setPlaced([])} type="button">↻ Đặt lại</button></div><div className="rib-canvas">{ribs.map((index) => <button aria-label={`Nan tre ${index + 1}`} className={`rib-slot ${placed.includes(index) ? 'filled' : ''}`} key={index} onDragOver={(event) => event.preventDefault()} onDrop={(event) => handleDrop(event, index)} style={{ transform: `rotate(${(index - 5) * 15}deg)` }} type="button"><span>{index + 1}</span></button>)}<i className="rib-pivot">●</i></div><div aria-label="Khay nan tre có thể kéo thả" className="rib-tray" role="group"><div>{ribs.filter((index) => !placed.includes(index)).map((index) => <button draggable key={index} onDragStart={(event) => event.dataTransfer.setData('rib', String(index))} type="button"><i />Nan Tre #{index + 1}</button>)}</div></div></section>
      <aside className="rebuilt-column"><section className="rebuilt-card rebuilt-inspection"><h3>⚙ Thông Số Khung Quạt</h3><p>Số lượng nan chuẩn: <b>11 nan tre</b></p><p>Góc xòe tối đa: <b>180° Bán Nguyệt</b></p><p>Khoảng cách góc: <b>15° mỗi khoảng</b></p><div>扇</div><button disabled={placed.length !== 11} onClick={() => { markStationCompleted(2); setGuide(true); }} type="button">✓ Kiểm tra khung nan</button></section></aside>
    </div>
    <StationFooter />
    <Modal footer={<button className="stitch-button" onClick={() => navigate('/map')} type="button">Quay về bản đồ làng</button>} open={guide} onClose={() => navigate('/map')} title="Khung nan hoàn hảo"><p className="body-md">11/11 nan tre đã căng đều góc 180°. Trạm 2 đã hoàn thành. Quay về bản đồ để tiếp tục khám phá.</p></Modal>
  </main>;
}

function StationTop({ title, progress }) { return <div className="rebuilt-top"><span>⌂ Làng nghề Chàng Sơn　/　<b>{title}</b></span><strong>● ● ◉ ○　 Tiến độ di sản: {progress} Trạm</strong></div>; }
function StationFooter() { return <div className="rebuilt-footer"><button onClick={() => navigate('/map')} type="button">⌖ Quay về bản đồ làng</button></div>; }
