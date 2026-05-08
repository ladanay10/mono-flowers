const stats = [
  { n: '340+', l: 'Подій оформлено' },
  { n: '98%',  l: 'Задоволених клієнтів' },
  { n: '12',   l: 'Флористів у команді' },
]

export function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-2 gap-[100px] items-center px-20 py-[120px]
                 max-md:grid-cols-1 max-md:gap-[60px] max-md:px-7 max-md:py-20
                 max-sm:gap-9 max-sm:px-[18px] max-sm:py-[62px]"
    >
      {/* Visual */}
      <div className="relative reveal">
        <div className="w-full aspect-[4/5] bg-[linear-gradient(155deg,#8a9d72,#4a5740_50%,#6b7c5a)]" />
        <div className="absolute -bottom-8 -right-10 w-[200px] bg-cream p-7 shadow-[0_20px_60px_rgba(0,0,0,0.1)]
                        max-md:right-4 max-md:-bottom-6 max-md:w-[180px] max-md:p-[22px]
                        max-sm:static max-sm:w-full max-sm:mt-3">
          <div className="font-display text-[52px] text-olive leading-none mb-2 max-sm:text-[42px]">7+</div>
          <p className="text-[13px] text-ink-light leading-[1.5]">Років досвіду у флористиці</p>
        </div>
      </div>

      {/* Content */}
      <div>
        <p className="text-[11px] tracking-[0.28em] uppercase text-gold mb-6 reveal">Наша історія</p>

        <h2 className="font-display text-[clamp(36px,4vw,54px)] font-light leading-[1.2] mb-7 reveal reveal-d1
                       max-sm:text-[clamp(32px,8vw,44px)] max-sm:mb-4">
          Ми перетворюємо<br />
          мрії на <em className="italic text-olive">живі квіткові</em><br />
          шедеври
        </h2>

        <p className="text-[15px] leading-[1.9] text-ink-light mb-5 reveal reveal-d1 max-sm:text-[14px] max-sm:leading-[1.75]">
          MONO flowers — команда флористів-художників, які вірять, що кожне свято заслуговує
          на особливий квітковий образ.
        </p>
        <p className="text-[15px] leading-[1.9] text-ink-light reveal reveal-d2 max-sm:text-[14px] max-sm:leading-[1.75]">
          Від ніжних весільних арок до яскравих інсталяцій на день народження — ми беремо на себе
          кожну деталь, щоб ваш захід залишився в пам&apos;яті назавжди.
        </p>

        <div className="flex gap-10 mt-12 pt-10 border-t border-mint-light reveal reveal-d3
                        max-sm:flex-col max-sm:gap-5 max-sm:mt-6 max-sm:pt-6">
          {stats.map(({ n, l }) => (
            <div key={n}>
              <div className="font-display text-[40px] text-olive-dark max-sm:text-[34px]">{n}</div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-ink-light">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
