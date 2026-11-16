import { stitchAssets, stations } from '../data/content';
import { navigate, routes } from '../routes/routes';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const stationImages = [stitchAssets.bamboo, stitchAssets.ribs, stitchAssets.silk, stitchAssets.finish];

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy">
            <p className="eyebrow">Tinh hoa Thạch Thất · Di sản trăm năm</p>
            <h1 className="display-xl">Chạm vào tinh hoa làng nghề Chàng Sơn.</h1>
            <p className="body-lg">
              Khám phá hành trình làm nên chiếc quạt tre và lụa truyền thống. Từ những nan tre mộc mạc đến
              chiếc quạt hoàn thiện, mỗi công đoạn đều lưu giữ sự khéo léo, nhẫn nại và tâm hồn của người thợ xứ Đoài.
            </p>
            <div className="button-row">
              <Button onClick={() => navigate(routes.map)}>Bắt đầu hành trình</Button>
              <Button onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })} variant="ghost">
                Khám phá câu chuyện
              </Button>
            </div>
          </div>
          <div className="home-hero__visual">
            <img alt="Quạt lụa nan tre thủ công Chàng Sơn" src={stitchAssets.homeHero} />
            <div className="home-hero__stamp">KÉN<br /><span>CHÀNG SƠN</span></div>
          </div>
        </div>
      </section>

      <section className="home-intro container" id="story">
        <div className="home-intro__heading">
          <Badge tone="seal">Câu chuyện KÉN</Badge>
          <h2 className="headline-lg">Giá trị truyền thống vẫn còn đó, nhưng cách tiếp cận cần được đổi mới.</h2>
        </div>
        <div className="home-intro__content">
          <p className="body-lg">
            Việt Nam có 1.975 làng nghề, làng nghề truyền thống được công nhận, nhưng tiềm năng văn hóa và thương mại
            vẫn còn dư địa khai thác chưa từng thấy.
          </p>
          <div className="story-grid">
            <Card>
              <span className="story-grid__number">01</span>
              <h3 className="title-lg">Hạn chế xây dựng thương hiệu</h3>
              <p className="body-md">Nhiều làng nghề còn gặp khó khăn trong việc xây dựng câu chuyện thương hiệu và truyền tải trọn vẹn giá trị văn hóa.</p>
            </Card>
            <Card>
              <span className="story-grid__number">02</span>
              <h3 className="title-lg">Khoảng cách với du lịch</h3>
              <p className="body-md">Phần lớn làng nghề chưa kết nối trực tiếp với thị trường trải nghiệm du lịch số hóa.</p>
            </Card>
            <Card>
              <span className="story-grid__number">03</span>
              <h3 className="title-lg">Nhu cầu khám phá văn hóa</h3>
              <p className="body-md">Nhu cầu tìm hiểu bản sắc địa phương tạo cơ hội cho sản phẩm và trải nghiệm tương tác số.</p>
            </Card>
          </div>
        </div>
      </section>

      <section className="home-materials">
        <div className="container home-materials__grid">
          <div className="home-materials__image">
            <img alt="Nghệ nhân Chàng Sơn chuốt nan tre" src={stitchAssets.artisan} />
          </div>
          <div className="home-materials__copy">
            <p className="eyebrow">Nan tre & Tơ lụa</p>
            <h2 className="headline-lg">Từ làng nghề trăm năm đến vật phẩm mang dấu ấn riêng.</h2>
            <p className="body-lg">
              Chàng Sơn từ lâu đã nổi tiếng với nghề làm quạt thủ công lừng lẫy xứ Đoài. Những chiếc nan tre được chuốt
              tỉ mỉ từ cây tre bánh tẻ dẻo dai, kết nối bằng đôi bàn tay khéo léo của người thợ già cùng sợi chỉ tơ đỏ thắm.
            </p>
            <p className="body-md">
              KÉN kế thừa kỹ thuật chế tác ấy, tuyển lựa chất liệu nan tre tự nhiên và lụa tơ tằm dệt thủ công để mang
              đến diện mạo mới mẻ, thanh thoát cho phong cách sống hiện đại.
            </p>
            <div className="materials-tags">
              <Badge>Nan tre vót tay</Badge>
              <Badge>Tơ tằm Nha Xá</Badge>
              <Badge>Sắc đỏ Sơn Mài</Badge>
            </div>
          </div>
        </div>
      </section>

      <section className="home-stations container" id="stations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Chạm nghề · Thử làm</p>
            <h2 className="headline-lg">4 Trạm trải nghiệm nghệ nhân</h2>
          </div>
          <p className="body-md home-stations__lead">Từng công đoạn làm quạt được số hóa thành trải nghiệm tương tác sống động.</p>
        </div>
        <div className="station-cards">
          {stations.map((station, index) => (
            <Card className="station-card" key={station.id}>
              <img alt="" className="station-card__image" src={stationImages[index]} />
              <div className="station-card__body">
                <span className="eyebrow">Trạm {String(station.id).padStart(2, '0')}</span>
                <h3 className="title-lg">{station.shortTitle}</h3>
                <p className="body-md">{station.description}</p>
                <Button onClick={() => navigate(station.path)} variant="ghost">Bắt đầu Trạm {station.id} →</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="home-map-cta">
        <div className="container home-map-cta__inner">
          <div>
            <p className="eyebrow">Bước vào làng nghề ảo Chàng Sơn</p>
            <h2 className="headline-lg">Dạo bước qua từng con ngõ cổ.</h2>
            <p className="body-lg">Ngắm nhìn sân phơi nan quạt đỏ thắm và tương tác trực tiếp cùng nghệ nhân làm quạt truyền thống.</p>
          </div>
          <div className="button-row">
            <Button onClick={() => navigate(routes.map)}>Khám phá bản đồ ảo</Button>
            <Button onClick={() => navigate(routes.passport)} variant="secondary">Đăng ký Hộ chiếu di sản</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
