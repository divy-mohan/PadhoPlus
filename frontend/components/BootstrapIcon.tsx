export function BootstrapIcon({ name, className = '' }: { name: string; className?: string }) {
  return <i className={`bi bi-${name} ${className}`}></i>
}
