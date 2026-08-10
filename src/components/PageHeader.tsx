"use client";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative bg-navy-900 text-white pb-12 md:pb-20 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="animate-fade-in-left">
          <div className="w-10 h-0.5 bg-gold-400 mb-6" />
          <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-3">{title}</h1>
          <p className="text-navy-300 text-sm sm:text-base md:text-lg leading-relaxed whitespace-pre-line">{subtitle}</p>
        </div>
      </div>
    </section>
  );
}
