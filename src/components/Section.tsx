export default function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-8 text-foreground">
            {title}
          </h2>
        )}
        <div className="relative">
          {children}
        </div>
      </div>
    </section>
  );
} 