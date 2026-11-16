import { useEffect, useState } from 'react';
import { navigate, routes } from '../../routes/routes';
import { getCompletedStations } from '../../data/journeyProgress';
import { Navigation } from './Navigation';

const logoPath = 'https://lh3.googleusercontent.com/aida/ALJJyrB01AdEL6e4xlErhhzTQJvNtQlOApaXQ6jL--fVgyIUej0aPZI9QSTolQBJ9Ih6Y5zg7Awpx8SpgMMTrlZfUglnWaf2bSNiKcrstuvnwFDB--bI5NSbu8bJ7tHyA8l6QrjuLccda4bUYJeq8mHruaik9dvyy2lP__owTJ2aXk_hI2ReL7Xk4K_zVA4dSJe6q4pQamPDsllM9njqYJ9PBu5kUQTgImrej-hEzonPs5kkdw';

export function Header({ activePath }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [completedCount, setCompletedCount] = useState(() => getCompletedStations().length);

  useEffect(() => {
    const updateProgress = () => setCompletedCount(getCompletedStations().length);
    window.addEventListener('ken:station-progress', updateProgress);
    window.addEventListener('storage', updateProgress);
    return () => {
      window.removeEventListener('ken:station-progress', updateProgress);
      window.removeEventListener('storage', updateProgress);
    };
  }, []);

  const goHome = (event) => {
    event.preventDefault();
    navigate(routes.home);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="site-header__inner container">
        <a className="brand" href={routes.home} onClick={goHome}>
          <img alt="" className="brand__mark" onError={(event) => { event.currentTarget.style.display = 'none'; }} src={logoPath} />
          <span className="brand__name"><b>KÉN</b><small>Chàng Sơn • Hà Nội</small></span>
        </a>
        <button
          aria-expanded={menuOpen}
          aria-label="Mở menu"
          className="menu-toggle"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`site-header__navigation ${menuOpen ? 'is-open' : ''}`}>
          <Navigation activePath={activePath} onNavigate={() => setMenuOpen(false)} />
          <div className="site-header__actions">
            <div className="header-journey"><span>Hành trình di sản</span><b>{completedCount}/4 trạm</b><i><em style={{ width: `${completedCount / 4 * 100}%` }} /></i></div>
            <button className="language-switcher" type="button">VI</button>
            <button className="language-switcher language-switcher--muted" type="button">EN</button>
            <button aria-label="Trợ giúp" className="help-button" type="button">?</button>
            <button aria-label="Tài khoản" className="help-button help-button--person" type="button" onClick={() => navigate(routes.account)}>●</button>
          </div>
        </div>
      </div>
    </header>
  );
}
