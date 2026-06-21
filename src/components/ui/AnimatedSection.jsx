// Staggered fade-up sections — matches Memory Nodes / Data Streams animation
export function AnimatedSection({ delay = 0, children, className = '', style = {} }) {
  const delayClass = delay === 0 ? 'animate-fade-up' : `animate-fade-up-delay-${Math.min(delay, 3)}`;
  return (
    <div className={`${delayClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
