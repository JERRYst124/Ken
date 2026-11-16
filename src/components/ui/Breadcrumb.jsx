export function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb">
      {items.map((item, index) => (
        <span className="breadcrumb__item" key={item.label}>
          {index > 0 && <span className="breadcrumb__separator">/</span>}
          <span className={index === items.length - 1 ? 'breadcrumb__current' : ''}>
            {item.label}
          </span>
        </span>
      ))}
    </nav>
  );
}
