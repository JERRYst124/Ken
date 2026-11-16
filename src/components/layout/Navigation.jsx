import { navigationItems, navigate } from '../../routes/routes';

export function Navigation({ activePath, onNavigate }) {
  return (
    <nav aria-label="Điều hướng chính" className="site-navigation">
      {navigationItems.map((item) => (
        <a
          className={activePath === item.path ? 'is-active' : ''}
          href={item.path}
          key={item.path}
          onClick={(event) => {
            event.preventDefault();
            navigate(item.path);
            onNavigate?.();
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
