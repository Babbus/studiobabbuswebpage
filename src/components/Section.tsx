export default function Section({ id, title, children }: { id?: string; title?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="py-16 sm:py-20 relative">
      <div className="max-w-6xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-8 text-foreground dark:bg-gradient-to-r dark:from-white dark:via-teal-100 dark:to-white dark:bg-clip-text dark:text-transparent animate-fade-in-up">
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