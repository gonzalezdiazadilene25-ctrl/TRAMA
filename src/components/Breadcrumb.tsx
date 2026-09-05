import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Ruta de navegación" className="mb-6 text-sm text-trama-gris">
      {items.map((item, i) => (
        <span key={i}>
          {item.href ? (
            <Link href={item.href} className="hover:text-[var(--acento)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-trama-texto">{item.label}</span>
          )}
          {i < items.length - 1 && <span className="mx-2">›</span>}
        </span>
      ))}
    </nav>
  );
}
