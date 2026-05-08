const items = ['Весілля', 'День народження', 'Фотозони', 'Оформлення столів', 'Арки та конструкції', 'Корпоративи', 'Заручини']

export function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-olive-dark py-5 overflow-hidden relative">
      <div className="marquee-track flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="font-display text-[15px] italic tracking-[0.08em] text-mint-light px-10 flex items-center gap-10
                       max-sm:px-5 max-sm:gap-5 max-sm:text-[13px]
                       after:content-['✦'] after:text-gold after:text-[10px] after:not-italic"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}
