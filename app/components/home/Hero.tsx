const images = [
  { label: 'Весільна фотозона', gradient: 'bg-[linear-gradient(145deg,#8a9d72_0%,#4a5740_60%,#6b7c5a_100%)]' },
  { label: 'Оформлення столів', gradient: 'bg-[linear-gradient(135deg,#a8c5b5_0%,#6b8f7d_100%)]' },
  { label: 'Декор залу',        gradient: 'bg-[linear-gradient(160deg,#c9ddd4_0%,#8aac9a_100%)]' },
]

export function Hero() {
  return (
    <section id="home" className="min-h-screen grid grid-cols-2 max-md:grid-cols-1 relative overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-center px-20 pt-[140px] pb-20 relative z-[2] max-md:px-7 max-md:pt-[120px] max-md:pb-[60px] max-sm:px-[18px] max-sm:pt-[104px] max-sm:pb-9">
        <div className="hero-anim-1 inline-flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-olive mb-10 max-sm:mb-[18px] before:content-[''] before:w-8 before:h-px before:bg-gold">
          MONO flowers · Квіткова студія
        </div>

        <h1 className="hero-anim-2 font-display text-[clamp(54px,6vw,88px)] font-light leading-[1.05] text-ink mb-8 max-sm:text-[clamp(40px,12vw,56px)] max-sm:leading-[1.02] max-sm:mb-4">
          Ваше свято —<br />
          <em className="font-script not-italic text-olive block text-[1.08em] tracking-[0.02em]">
            наша пристрасть
          </em>
          <strong className="font-normal">до краси</strong>
        </h1>

        <p className="hero-anim-3 text-[15px] font-light leading-[1.8] text-ink-light max-w-[440px] mb-14 max-sm:text-[14px] max-sm:leading-[1.65] max-sm:mb-7">
          Створюємо неповторні флористичні простори для весіль, днів народження та корпоративних подій.
          Кожна деталь, від фотозони до оформлення столів, продумана з любов&apos;ю.
        </p>

        <div className="hero-anim-4 flex gap-5 items-center max-sm:flex-col max-sm:items-stretch">
          <a
            href="#services"
            className="btn-fill inline-block bg-olive text-cream text-[12px] tracking-[0.18em] uppercase no-underline px-10 py-4 transition-all duration-300"
          >
            <span>Наші послуги</span>
          </a>
          <a
            href="#gallery"
            className="text-[12px] tracking-[0.18em] uppercase text-ink-mid no-underline transition-colors hover:text-olive max-sm:text-center"
          >
            Переглянути роботи
          </a>
        </div>

        {/* Scroll hint */}
        <div className="hero-anim-6 absolute bottom-12 left-0 hidden md:flex items-center gap-[14px] text-[11px] tracking-[0.2em] uppercase text-ink-light">
          <div className="scroll-line w-10 h-px bg-ink-light" />
          Гортати
        </div>
      </div>

      {/* Right — image mosaic */}
      <div className="hero-anim-5 relative overflow-hidden max-md:h-[62vw] max-md:min-h-[250px] max-md:max-h-[420px] max-sm:h-[70vw] max-sm:min-h-[220px]">
        <div className="absolute inset-0 grid gap-[3px] p-[3px_0_3px_3px]" style={{ gridTemplateColumns: '3fr 2fr', gridTemplateRows: '1fr 1fr' }}>
          {images.map(({ label, gradient }, i) => (
            <div
              key={label}
              className={`overflow-hidden relative ${i === 0 ? 'row-span-2' : ''}`}
            >
              <div className={`${gradient} w-full h-full flex items-center justify-center font-display text-[13px] tracking-[0.1em] text-white/80 transition-transform duration-[7s] ease hover:scale-[1.04]`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
