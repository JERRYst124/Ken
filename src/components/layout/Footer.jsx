import { navigate, routes } from '../../routes/routes';

export function Footer() {
  const handleNavigate = (path, event) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <a className="footer-brand" href={routes.home} onClick={(event) => handleNavigate(routes.home, event)}>KÉN</a>
          <p className="body-sm">Mỗi món quà, một câu chuyện Việt.</p>
        </div>
        <div>
          <p className="label-md footer-heading">Hành trình KÉN</p>
          <a href={routes.map} onClick={(event) => handleNavigate(routes.map, event)}>Bản đồ làng quạt ảo</a>
          <a href={routes.station1} onClick={(event) => handleNavigate(routes.station1, event)}>4 trạm chế tác thủ công</a>
          <a href={routes.passport} onClick={(event) => handleNavigate(routes.passport, event)}>Hộ chiếu & Workshop</a>
        </div>
        <div>
          <p className="label-md footer-heading">Kết nối di sản</p>
          <a href="https://linktr.ee/ken.quatangviet" rel="noreferrer" target="_blank">
            linktr.ee/ken.quatangviet
          </a>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span className="body-sm">© 2026 KÉN — Digital Craft Experience</span>
        <span className="body-sm">Chàng Sơn · Thạch Thất · Hà Nội</span>
      </div>
    </footer>
  );
}
