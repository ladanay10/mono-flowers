const services = ['Весільне оформлення', 'День народження', 'Фотозони', 'Оформлення столів']
const company  = [
  { href: '#about',   label: 'Про нас' },
  { href: '#gallery', label: 'Роботи' },
  { href: '#process', label: 'Як ми працюємо' },
]

export function Footer() {
  return (
    <footer className="bg-ink px-[80px] pt-20 pb-10 max-md:px-7 max-sm:px-[18px]">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-[60px] mb-[60px] max-md:grid-cols-2 max-sm:grid-cols-1 max-sm:gap-7 max-sm:mb-[34px]">
        <div>
          <span className="font-display text-[26px] text-cream mb-5 inline-block">
            MONO <em className="italic text-gold">flowers</em>
          </span>
          <p className="text-[13px] leading-[1.8] text-cream/55">
            Квіткова студія для особливих моментів вашого життя. Створюємо красу, що залишається в серці.
          </p>
        </div>

        <div className="flex flex-col">
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-gold mb-6">Послуги</h4>
          {services.map((s) => (
            <a key={s} href="#services" className="text-[13px] text-cream/55 no-underline mb-3 transition-colors hover:text-mint-light">
              {s}
            </a>
          ))}
        </div>

        <div className="flex flex-col">
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-gold mb-6">Компанія</h4>
          {company.map(({ href, label }) => (
            <a key={href} href={href} className="text-[13px] text-cream/55 no-underline mb-3 transition-colors hover:text-mint-light">
              {label}
            </a>
          ))}
        </div>

        <div className="flex flex-col">
          <h4 className="text-[11px] tracking-[0.22em] uppercase text-gold mb-6">Контакти</h4>
          <p className="text-[13px] text-cream/55 mb-3">Самбір, Україна</p>
          <a href="tel:+380680540955" className="text-[13px] text-cream/55 no-underline mb-3 transition-colors hover:text-mint-light">
            +380 680 540 955
          </a>
          <a
            href="https://www.instagram.com/mono__flowers_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-cream/55 no-underline transition-colors hover:text-mint-light"
          >
            @mono__flowers_
          </a>
        </div>
      </div>

      <div className="border-t border-white/[0.07] pt-8">
        <p className="text-[12px] text-cream/40">© 2026 MONO flowers. Усі права захищені.</p>
      </div>
    </footer>
  )
}
