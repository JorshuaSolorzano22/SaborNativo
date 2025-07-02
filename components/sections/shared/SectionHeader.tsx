interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl font-semibold mb-6 text-brand-foreground">{title}</h2>
      {subtitle && <p className="text-lg max-w-2xl mx-auto text-brand-foreground">{subtitle}</p>}
    </div>
  );
}