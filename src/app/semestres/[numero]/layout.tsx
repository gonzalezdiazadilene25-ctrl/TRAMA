export default async function SemestreLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;
  return <div data-semestre={numero}>{children}</div>;
}
