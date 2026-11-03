interface Props {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: Props) {
  return (
    <header className="ust-alan">
      <h1>{title}</h1>
      {subtitle && <p className="ust-alt">{subtitle}</p>}
    </header>
  );
}
