import { useEffect, useState } from 'react';
import {
  getCompletedStations,
  getVisitedLocations,
  markLocationVisited,
} from '../data/journeyProgress';
import { navigate } from '../routes/routes';

const villageBackground = '/assets/stitch/ken-village-map.jpg';

const mapNodes = [
  {
    id: 'gate',
    kind: 'landmark',
    title: 'Cổng làng',
    subtitle: 'Nơi bắt đầu hành trình',
    description: 'Bước qua cánh cổng này, bạn sẽ đến với làng nghề làm quạt truyền thống, nơi lưu giữ tinh hoa thủ công Việt Nam qua bao thế hệ.',
    detail: 'Cổng làng Chàng Sơn',
    x: 17,
    y: 44,
    icon: '⌂',
  },
  {
    id: 'station-1',
    kind: 'station',
    station: 1,
    title: 'Chọn tre',
    subtitle: 'Sân tre nguyên liệu',
    description: 'Tìm hiểu cách chọn gióng tre bánh tẻ, kiểm tra độ già và lựa vật liệu tốt để bắt đầu làm quạt.',
    detail: 'Trạm 1 · Chọn tre',
    x: 38,
    y: 47,
    icon: '♧',
  },
  {
    id: 'station-2',
    kind: 'station',
    station: 2,
    title: 'Tạo nan quạt',
    subtitle: 'Xưởng vót nan',
    description: 'Khám phá xưởng vót nan và thử sắp xếp những nan tre thành khung quạt cân đối.',
    detail: 'Trạm 2 · Tạo nan',
    x: 61,
    y: 41,
    icon: '⚒',
  },
  {
    id: 'station-3',
    kind: 'station',
    station: 3,
    title: 'Dán mặt quạt',
    subtitle: 'Xưởng lụa Nha Xá',
    description: 'Phết hồ nếp, phủ lụa đỏ son và miết phẳng mặt quạt bằng thao tác thủ công.',
    detail: 'Trạm 3 · Dán mặt quạt',
    x: 84,
    y: 63,
    icon: '◉',
  },
  {
    id: 'station-4',
    kind: 'station',
    station: 4,
    title: 'Hoàn thiện',
    subtitle: 'Góc trưng bày quạt',
    description: 'Chọn hoa văn, phối màu và đóng dấu triện để hoàn thiện chiếc quạt độc bản của riêng bạn.',
    detail: 'Trạm 4 · Hoàn thiện',
    x: 92,
    y: 85,
    icon: '✦',
  },
  {
    id: 'pond',
    kind: 'landmark',
    title: 'Ao sen đầu làng',
    subtitle: 'Khoảng nghỉ bên lối vào',
    description: 'Ao sen và hàng rào tre tạo nên một khoảng yên bình giữa nhịp sống của làng nghề.',
    detail: 'Ao sen Chàng Sơn',
    x: 15,
    y: 82,
    icon: '❀',
  },
  {
    id: 'courtyard',
    kind: 'landmark',
    title: 'Sân đình',
    subtitle: 'Nhịp sống cộng đồng',
    description: 'Sân đình là nơi người làng gặp gỡ, trò chuyện và truyền lại những câu chuyện về nghề quạt.',
    detail: 'Sân đình Chàng Sơn',
    x: 50,
    y: 58,
    icon: '▦',
  },
  {
    id: 'bamboo-cart',
    kind: 'landmark',
    title: 'Xe tre nguyên liệu',
    subtitle: 'Tre già từ vùng Thạch Thất',
    description: 'Những thân tre được chở về xưởng, hong khô và chuẩn bị cho các công đoạn chế tác.',
    detail: 'Vật liệu nghề quạt',
    x: 52,
    y: 84,
    icon: '⌁',
  },
];

const stations = mapNodes.filter((node) => node.kind === 'station');
const SCENE_ZOOM = 1.55;

function readVisited() {
  return getVisitedLocations();
}

export function VillageMapPage() {
  const [selectedId, setSelectedId] = useState('gate');
  const [sceneId, setSceneId] = useState(null);
  const [visited, setVisited] = useState(readVisited);
  const [completedStations, setCompletedStations] = useState(getCompletedStations);
  const selected = mapNodes.find((node) => node.id === selectedId) ?? mapNodes[0];
  const activeScene = mapNodes.find((node) => node.id === sceneId);

  const selectNode = (node) => {
    setSelectedId(node.id);
    setSceneId(node.id);
    setVisited(markLocationVisited(node.id));
  };

  useEffect(() => {
    const refreshProgress = () => {
      setVisited(readVisited());
      setCompletedStations(getCompletedStations());
    };
    window.addEventListener('ken:station-progress', refreshProgress);
    window.addEventListener('ken:map-progress', refreshProgress);
    return () => {
      window.removeEventListener('ken:station-progress', refreshProgress);
      window.removeEventListener('ken:map-progress', refreshProgress);
    };
  }, []);

  return (
    <main className="village-map-adventure">
      <section className="village-map-layout">
        <div className={`village-map-scene ${activeScene ? 'has-focused-scene' : ''}`}>
          <div
            className="village-map-world"
            style={{
              transform: activeScene
                ? `translate(calc(50% - ${activeScene.x * SCENE_ZOOM}%), calc(50% - ${activeScene.y * SCENE_ZOOM}%)) scale(${SCENE_ZOOM})`
                : 'none',
            }}
          >
            <img className="village-map-background" src={villageBackground} alt="Toàn cảnh làng nghề quạt Chàng Sơn" />
            <div className="village-map-hotspots">
              {mapNodes.map((node) => {
                const completed = node.kind === 'station' && completedStations.includes(node.station);
                return (
                  <button
                    aria-label={`Khám phá ${node.detail}`}
                    className={`village-map-hotspot is-${node.kind} ${selectedId === node.id ? 'is-selected' : ''} ${visited.includes(node.id) ? 'is-visited' : ''} ${completed ? 'is-completed' : ''}`}
                    data-tooltip={node.detail}
                    key={node.id}
                    onClick={() => selectNode(node)}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    type="button"
                  >
                    <span>{node.icon}</span>
                    {completed && <em aria-label="Đã hoàn thành">✓</em>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="village-map-scene-top">
            <span className="village-map-brand"><b>KÉN</b><small>LÀNG NGHỀ CHÀNG SƠN</small></span>
            <span className="village-map-scene-label">{activeScene ? activeScene.detail : 'Khám phá làng nghề'}</span>
            {activeScene && (
              <button className="village-map-back" onClick={() => setSceneId(null)} type="button">
                ← Toàn cảnh làng
              </button>
            )}
          </div>
          <div className="village-map-hint"><span>⌖</span> Chọn một địa điểm để khám phá <b>✦</b></div>
          <div className="village-map-count">{visited.length} điểm đã ghé</div>
        </div>

        <aside className="village-map-inspector" aria-live="polite">
          <div className="village-map-inspector__top">
            <span>ĐIỂM ĐANG KHÁM PHÁ</span>
            <b>{completedStations.length}/4 trạm</b>
          </div>
          <div className="village-map-thumb">
            <img
              src={villageBackground}
              alt=""
              style={{ objectPosition: `${selected.x}% ${selected.y}%` }}
            />
            <span>{selected.kind === 'station' ? `TRẠM 0${selected.station}` : 'CHÀNG SƠN'}</span>
          </div>
          <h1>{selected.title}</h1>
          <h2>{selected.subtitle}</h2>
          <p>{selected.description}</p>
          <div className="village-map-special">
            <img
              src={villageBackground}
              alt=""
              style={{ objectPosition: `${selected.x}% ${selected.y}%` }}
            />
            <div><b>{selected.detail}</b><span>{selected.kind === 'station' ? 'Một chặng trong hành trình làm quạt' : 'Một dấu ấn đặc biệt của làng nghề'}</span></div>
          </div>
          {selected.kind === 'station' ? (
            <button className="village-map-enter" onClick={() => navigate(`/station/${selected.station}`)} type="button">
              Vào Trạm {selected.station} <b>→</b>
            </button>
          ) : (
            <button className="village-map-enter" onClick={() => setSceneId(null)} type="button">
              Trở lại khám phá <b>→</b>
            </button>
          )}
          <div className="village-map-progress">
            <div><b>Hành trình trong làng</b><span>{visited.length} địa điểm đã ghé</span></div>
            <div className="village-map-progress__dots">
              {stations.map((station) => (
                <i className={completedStations.includes(station.station) ? 'is-completed' : ''} key={station.id} title={`${station.title}${completedStations.includes(station.station) ? ' · Đã hoàn thành' : ''}`} />
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
