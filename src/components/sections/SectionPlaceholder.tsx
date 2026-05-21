export default function SectionPlaceholder({ title }: { title: string }) {
  return (
    <section className="flex min-h-[60vh] w-full flex-col items-center justify-center border-t border-white/5 bg-stadium-black px-4 py-20 text-center">
      <h2 className="mb-4 text-4xl font-bold uppercase tracking-tight text-white/90 sm:text-6xl">
        {title}
      </h2>
      <div className="h-1 w-20 bg-gold" />
      <p className="mt-8 max-w-lg text-white/40">
        [Contenido cinematográfico de {title} en desarrollo]
      </p>
    </section>
  )
}
