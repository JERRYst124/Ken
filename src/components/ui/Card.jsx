export function Card({ children, className = '', elevated = false, ...props }) {
  return (
    <section className={`card ${elevated ? 'card--elevated' : ''} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
