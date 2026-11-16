import { useState } from 'react';
import { navigate } from '../routes/routes';
import { Modal } from '../components/ui/Modal';
import { stitchAssets } from '../data/content';
import { markStationCompleted } from '../data/journeyProgress';

const samples = [
  {
    id: 'A',
    name: 'Tre non (1-2 năm)',
    meta: 'Thân xanh nhạt • Ngậm nước',
    description: 'Thớ tre mềm, nhiều tinh bột ẩm, dễ biến dạng khi hong khô và thu hút mọt tre tấn công.',
    image: stitchAssets.bamboo,
    result: 'Mẫu A: Tre non - Chưa đủ tiêu chuẩn',
    detail: 'Thân tre non còn quá nhiều nước và tinh bột hữu cơ. Khi phơi khô nan sẽ bị ngót, co rút vặn xoắn.',
    correct: false,
  },
  {
    id: 'B',
    name: 'Tre bánh tẻ (3-4 năm)',
    meta: 'Vàng óng mộc • Gióng đanh',
    description: 'Thớ tre đặc quánh, lượng nước tối thiểu, độ uốn dẻo tuyệt vời chịu lực mở gập hàng nghìn lần.',
    image: stitchAssets.mapStation,
    result: 'Mẫu B: Tuyệt hảo! Tre bánh tẻ già vừa độ',
    detail: 'Chính xác! Nghệ nhân Chàng Sơn luôn chọn tre từ 3 đến 4 năm tuổi. Thân tre đanh chắc, mật độ thớ thịt mịn đồng đều.',
    correct: true,
  },
  {
    id: 'C',
    name: 'Tre già cỗi (>5 năm)',
    meta: 'Nâu sẫm nứt vỏ • Giòn xơ',
    description: 'Vỏ bì nứt răm, liên kết sợi khô kiệt, khi chẻ mỏng hay bị tước nan và dễ gãy ngang khi uốn lượn.',
    image: stitchAssets.ribs,
    result: 'Mẫu C: Tre già khô - Quá giòn',
    detail: 'Cây tre già quá tuổi đã hóa gỗ thô ráp, mất đi chất keo thực vật dẻo dai và dễ nứt dọc thớ.',
    correct: false,
  },
];

export function StationOnePage() {
  const [selected, setSelected] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);

  const selectSample = (sample) => setSelected(sample);
  const reset = () => setSelected(null);

  if (completed) {
    return (
      <main className="stitch-station stitch-station--completed">
        <div className="stitch-completion">
          <span className="stitch-seal">✓</span>
          <p className="stitch-kicker">Trạm 1 đã hoàn thành</p>
          <h1>Nguyên liệu đã được xác nhận</h1>
          <p>Tre bánh tẻ Chàng Sơn của bạn đã được kiểm duyệt trong mô phỏng trải nghiệm KÉN.</p>
          <div className="stitch-actions">
            <button className="stitch-button" onClick={() => navigate('/map')} type="button">Quay về bản đồ làng</button>
          </div>
        </div>
        <Modal open={guideOpen} onClose={() => setGuideOpen(false)} title="Cẩm nang tuyển tre Chàng Sơn"><p className="body-md">Hãy quan sát màu thân, gióng tre và lớp thịt tre trước khi chọn mẫu.</p></Modal>
      </main>
    );
  }

  const feedback = selected
    ? { title: selected.result, message: selected.detail, isCorrect: selected.correct }
    : { title: 'Gợi ý từ nghệ nhân Chàng Sơn', message: 'Hãy nhấp vào một trong ba mẫu tre để nghe nghệ nhân phân tích đặc tính cấu trúc sớ sợi trước khi đưa vào khâu chẻ nan quạt.' };

  return (
    <main className="stitch-station">
      <div className="stitch-station__subnav">
        <div className="stitch-breadcrumb"><span>⌂</span><span>Làng nghề Chàng Sơn</span><b>/</b><strong>Trạm 1: Chọn tre</strong></div>
        <div className="stitch-subnav-actions">
          <button className="stitch-guide-button" onClick={() => setGuideOpen(true)} type="button">💡 Hướng dẫn cách làm</button>
          <button className="stitch-map-button" onClick={() => navigate('/map')} type="button">⌖ Trở về bản đồ làng</button>
        </div>
      </div>

      <div className="stitch-station__grid">
        <aside className="stitch-column stitch-column--sidebar">
          <section className="stitch-card stitch-process-card">
            <div className="stitch-card-heading"><div><span className="stitch-label">Quy trình thủ công</span><strong>Trạm 1: Chọn Tre</strong></div><b className="stitch-step-badge">{selected ? 'Bước 2/3' : 'Bước 1/3'}</b></div>
            <div className="stitch-steps">
              <div className="stitch-step is-active"><span>1</span><div><strong>Khám phá tre Chàng Sơn</strong><p>Phân tích mật độ thớ và tuổi tre bánh tẻ vùng Xứ Đoài.</p></div></div>
              <div className={`stitch-step ${selected ? 'is-active' : ''}`}><span>2</span><div><strong>Quan sát & Chọn mẫu</strong><p>Tìm gióng tre thẳng, thớ thịt dày dặn không mắt khuyết.</p></div></div>
              <div className="stitch-step"><span>3</span><div><strong>Đóng dấu triện xác nhận</strong><p>Nhận ấn ký KÉN và mở khóa sang trạm chẻ nan.</p></div></div>
            </div>
            <div className="stitch-insight"><strong>♧ Tiêu chuẩn nan Chàng Sơn</strong><p>Nghệ nhân chỉ lấy phần cật và lớp thịt sát cật của thân tre. Bỏ ruột xốp để nan quạt khi xếp khít lại không bị xô lệch hoặc gãy ngậm.</p><div><span>Tuổi thu hoạch: 3 - 4 năm</span><span>Gióng dài: &gt; 45cm</span></div></div>
          </section>
          <section className="stitch-atmosphere"><span>♜</span><div><strong>Rừng tre Thạch Thất</strong><p>Hấp thu tinh khí vùng gò đồi bán sơn địa, cho tre độ dẻo đàn hồi cực đại.</p></div></section>
        </aside>

        <section className="stitch-column stitch-column--arena">
          <div className="stitch-card stitch-arena-card">
            <div className="stitch-arena-intro"><div><span className="stitch-label">◉ Tương tác trực quan</span><h1>Đấu trường tuyển chọn thanh tre mẫu</h1><p>Hãy quan sát kỹ màu sắc vỏ, độ dày thớ thịt và mật độ nước bên trong từng mẫu. Chọn gióng tre bánh tẻ đạt độ dẻo dai thích hợp nhất để làm nan quạt truyền thống.</p></div><span className={`stitch-status ${selected?.correct ? 'is-good' : ''}`}>{selected?.correct ? 'Mẫu tre thượng hạng' : 'Chưa chọn mẫu tre'}</span></div>
            <div className="stitch-sample-grid">
              {samples.map((sample) => <button className={`stitch-sample ${selected?.id === sample.id ? 'is-selected' : ''} ${sample.correct ? 'is-recommended' : ''}`} key={sample.id} onClick={() => selectSample(sample)} type="button">
                {sample.correct && <span className="stitch-recommended">★ Đề xuất nghệ nhân</span>}
                <div className="stitch-sample-image"><img alt={sample.name} src={sample.image} /><b>Mẫu {sample.id}</b><span>{sample.correct ? '✥' : '◌'}</span></div>
                <strong>{sample.name}</strong><em>{sample.meta}</em><p>{sample.description}</p><small>Kiểm định mẫu {sample.id} ›</small>
              </button>)}
            </div>
            <div className={`stitch-feedback ${selected?.correct ? 'is-success' : selected ? 'is-error' : ''}`}><strong>{selected?.correct ? '✥' : selected ? '⚠' : '♧'} {feedback.title}</strong><p>{feedback.message}</p>{selected && <div><span>Độ dẻo: {selected.correct ? 'Thượng hạng' : 'Chưa đạt'}</span><span>Khuyến nghị: {selected.correct ? 'Đạt chuẩn tuyệt đối' : 'Không dùng'}</span></div>}</div>
          </div>
          <div className="stitch-card stitch-flex-card"><div><strong>⚒ Thử nghiệm uốn nan mô phỏng</strong><span>Áp lực đàn hồi 180°</span></div><div className="stitch-flex-curve"><svg viewBox="0 0 400 60"><path d={selected?.correct ? 'M 20 45 Q 200 15 380 45' : 'M 20 45 Q 200 45 380 45'} fill="none" stroke={selected?.correct ? '#7d5714' : '#c99a52'} strokeLinecap="round" strokeWidth="4" /><circle cx="20" cy="45" fill="#6f1110" r="5" /><circle cx="380" cy="45" fill="#6f1110" r="5" /></svg><div><span>Đầu chốt nan (Họng quạt)</span><b>{selected ? (selected.correct ? 'Trạng thái: Đàn hồi cánh cung hoàn mỹ' : 'Trạng thái: Chưa đạt tiêu chuẩn') : 'Trạng thái: Tĩnh'}</b><span>Ngọn vót thon</span></div></div></div>
        </section>

        <aside className="stitch-column stitch-column--artisan">
          <section className="stitch-card stitch-artisan-card"><div className="stitch-artisan-heading"><img alt="Nghệ nhân" src={stitchAssets.artisan} /><div><strong>Nghệ nhân Nguyễn Khắc</strong><span>Đệ nhị thế gia quạt Chàng Sơn</span></div></div><div className="stitch-artisan-image"><img alt="Kỹ nghệ vót nan tinh xảo" src={stitchAssets.ribs} /><span>▣ Kỹ nghệ vót nan tinh xảo</span></div><blockquote><b>BÍ QUYẾT GIA TRUYỀN</b>“Cây tre làm quạt sau khi đốn phải được ngâm nước bùn ao 3-4 tháng để tiêu hết đường bột chống mối mọt, rồi đem gác bếp hoặc phơi sương tạo độ dẻo tự nhiên như gân thép.”</blockquote></section>
          <section className="stitch-card stitch-confirm-card"><div className="stitch-card-heading"><strong>Xác nhận nguyên liệu</strong><span>Con dấu triện</span></div><div className="stitch-seal-placeholder">{selected?.correct ? '✥' : '♧'}<span>{selected?.correct ? 'Đã chọn đúng mẫu tre bánh tẻ' : 'Chọn đúng mẫu tre bánh tẻ để kích hoạt con dấu Trạm 1 vào hộ chiếu di sản.'}</span></div><button className="stitch-confirm-button" disabled={!selected?.correct} onClick={() => { markStationCompleted(1); setCompleted(true); }} type="button">⚙ XÁC NHẬN & ĐÓNG DẤU TRẠM 1</button><small>▣ Hộ chiếu thủ công sẽ lưu lại ký ức vật liệu</small></section>
        </aside>
      </div>
      <Modal open={guideOpen} onClose={() => setGuideOpen(false)} title="Cẩm nang tuyển tre Chàng Sơn"><p className="body-md">Hãy quan sát màu thân, gióng tre và lớp thịt tre trước khi chọn mẫu. Đây là mô phỏng trong trải nghiệm KÉN, không thay thế hướng dẫn kỹ thuật thực tế.</p></Modal>
    </main>
  );
}
