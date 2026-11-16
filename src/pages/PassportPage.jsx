import { useState } from 'react';
import { stitchAssets } from '../data/content';

export function PassportPage() {
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  const downloadPassport = async () => {
    setDownloadError('');
    try {
      const response = await fetch(stitchAssets.passportFan);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ken-ho-chieu-van-hoa.jpg';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setSubmitted(true);
    } catch (error) {
      console.error('Không thể tải ảnh hộ chiếu KÉN.', error);
      setDownloadError('Không thể tải ảnh lúc này. Hãy thử lại hoặc mở ảnh sản phẩm rồi lưu ảnh.');
    }
  };

  return (
    <main className="passport-page">
      <div className="passport-crumb">▣ Hộ chiếu di sản KÉN / Hành trình 4 / 4 Trạm hoàn tất <b>◉ Đạt chứng nhận di sản 6</b></div>
      <section className="passport-hero">
        <div><span>⚑ VINH DANH NGHỆ NHÂN TRẺ TƯƠNG TÁC ⚑</span><h1>Chúc mừng bạn đã hoàn thành trọn vẹn hành trình làm quạt thủ công Việt!</h1><p>Mỗi công đoạn là một câu chuyện. Cảm ơn bạn đã cùng KÉN khám phá, thực hành từng nét đan, nhát đan, để gìn giữ và lan tỏa tinh hoa trăm năm của làng nghề quạt Chàng Sơn.</p><div><b>● 4 Trạm thực hành tương tác</b><b>♙ Bảo lưu số hóa di sản phi vật thể</b></div></div>
        <div className="passport-seal">✦<strong>100%</strong><small>CÔNG ĐOẠN HOÀN TẤT</small><b>◎ Đã khóa 4 Triện</b></div>
      </section>
      <div className="passport-grid">
        <section>
          <div className="passport-card">
            <header><span>▣ KÉN CRAFT PASSPORT</span><h2>Hộ Chiếu Nghề Quạt Chàng Sơn</h2><p>Chứng nhận dấu ấn thủ công truyền thống được số hóa bởi KÉN và các nghệ nhân dân gian.</p></header>
            <div className="passport-user"><b>NV</b><div><small>LỮ KHÁCH VĂN HÓA</small><strong>Nguyễn Văn An</strong><span>Hạng mục: Trải nghiệm tương tác</span></div><div><small>THỜI KHẮC ĐÓNG DẤU</small><strong>Năm 2026</strong><span>Số: KEN-VN-8869</span></div></div>
            <h3>◉ Bộ 4 Con Dấu Triện Sơn Mài Đã Mở Khóa <small>Đầy đủ 4/4</small></h3>
            <div className="passport-stamps">{['Nguyên Liệu', 'Khung Xương', 'Dán Giấy & Lụa', 'Thổi Hồn Di Sản'].map((name, index) => <article key={name}><b>◈</b><div><strong>Trạm {index + 1}: {name}</strong><p>{['Tre bánh tẻ Chàng Sơn', 'Tạo Nan Bán Nguyệt', 'Dán Lụa Tơ Tằm', 'Thổi Hồn Di Sản'][index]}</p></div></article>)}</div>
            <footer>◉ Chứng thực bởi Hiệp hội Nghệ nhân truyền thống Chàng Sơn <b>KÉN DIGITAL ARCHIVE 2026</b></footer>
          </div>
          <div className="passport-actions"><button type="button" onClick={downloadPassport}>⇩ TẢI ẢNH HỘ CHIẾU VĂN HÓA</button><button type="button" onClick={() => setSubmitted(true)}>⌯ CHIA SẺ LÊN MẠNG XÃ HỘI</button></div>
          {downloadError && <p className="passport-download-error" role="alert">{downloadError}</p>}
        </section>
        <aside className="passport-side">
          <section className="passport-artifact"><header><b>THÀNH PHẨM THỦ CÔNG SỐ HÓA</b><small>Tỉ lệ 1:1</small></header><img alt="Quạt lụa Chim Lạc Sắc Đỏ Son" src={stitchAssets.passportFan} /><b>● Quạt Lụa Chim Lạc Sắc Đỏ Son</b><div><span>Nan cốt<strong>11 nan</strong></span><span>Chất liệu<strong>Lụa tơ tằm</strong></span><span>Họa tiết<strong>Chim Lạc</strong></span></div></section>
          <section className="passport-voucher"><b>▣ PHẦN THƯỞNG ĐỘC QUYỀN</b><h3>Giảm 10% cho Lần Mua Sắm Tiếp Theo</h3><p>Áp dụng cho toàn bộ sưu tập quạt lụa, quạt nan tre và phụ kiện văn hóa KÉN trên tuyến phố nghề tại làng nghề.</p><strong>KENCRAFT10</strong><button type="button" onClick={() => setSubmitted(true)}>▣ Sao chép mã</button></section>
          <section className="passport-workshop"><h3>▣ Workshop Trải Nghiệm Thực Tế</h3><p>Về Chàng Sơn, tự tay cầm dao vót nan tre, cùng nghệ nhân già nhấp trà và hoàn thiện chiếc quạt đời thật mang về.</p><button type="button" onClick={() => setWorkshopOpen(true)}>▣ ĐĂNG KÝ WORKSHOP NGAY</button></section>
        </aside>
      </div>
      <section className="passport-next"><span>HÀNH TRÌNH TIẾP NỐI</span><h2>Giá Trị Đọng Lại Sau Hành Trình</h2><p>KÉN không chỉ số hóa công đoạn, mà đưa bạn chạm vào văn hóa bằng lòng tự hào và tri thức làng nghề Việt.</p><div>{['Kết Nối Nghệ Nhân', 'Kỹ Thuật Xưa Cổ', 'Biểu Tượng Chim Lạc', 'Bảo Tồn Di Sản'].map((title) => <article key={title}><b>✦</b><strong>{title}</strong><p>Mỗi trải nghiệm là một ký ức được lưu giữ và lan tỏa.</p></article>)}</div></section>
      {workshopOpen && <div className="passport-modal"><form onSubmit={(event) => { event.preventDefault(); setWorkshopOpen(false); setSubmitted(true); }}><button type="button" onClick={() => setWorkshopOpen(false)}>×</button><h2>Đăng Ký Workshop Thực Tế</h2><p>Trực tiếp tại Không gian Di sản Làng Quạt Chàng Sơn, Hà Nội</p><input required placeholder="Họ và tên" /><input required type="email" placeholder="Email" /><button type="submit">Gửi đăng ký</button></form></div>}
      {submitted && <button className="passport-toast" onClick={() => setSubmitted(false)} type="button">Đã ghi nhận thao tác • ×</button>}
    </main>
  );
}
