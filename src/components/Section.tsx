export default function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent animate-fade-in-up">
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