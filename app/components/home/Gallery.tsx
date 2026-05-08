import { SectionHeader } from '@/app/components/ui/SectionHeader'

const items = [
  { label: 'Весільна арка · 2026', gradient: 'bg-[linear-gradient(135deg,#6b7c5a_0%,#8a9d72_40%,#a8c5b5_100%)]', tall: true },
  { label: 'Фотозона',             gradient: 'bg-[linear-gradient(160deg,#e8f2ee_0%,#a8c5b5_100%)]' },
  { label: 'Декор столу',          gradient: 'bg-[linear-gradient(160deg,#c9ddd4_0%,#6b8f7d_100%)]' },
  { label: 'День народження',      gradient: 'bg-[linear-gradient(145deg,#8a9d72,#4a5740)]' },
  { label: 'Квіткова стіна',       gradient: 'bg-[linear-gradient(145deg,#c4a96a_0%,#8a9d72_100%)]' },
]

export function Gallery() {
  return (
    <section
      id="gallery"
      className="px-20 py-[120px] max-md:px-7 max-md:py-20 max-sm:px-[18px] max-sm:py-[62px]"
    >
      <SectionHeader
        tag="Наші роботи"
        title={<>Галерея <em className="italic text-olive">проєктів</em></>}
      />

      <div className="grid gap-1 mt-[-20px]
                      [grid-template-columns:2fr_1fr_1fr]
                      max-md:[grid-template-columns:1fr_1fr]
                      max-sm:grid-cols-1"
           style={{ marginTop: '60px' }}>
        {items.map(({ label, gradient, tall }, i) => (
          <article
            key={label}
            className={`overflow-hidden relative reveal reveal-d${i % 3}
                        ${tall ? 'row-span-2 max-md:col-span-2 max-md:row-span-1 max-sm:col-auto' : ''}`}
          >
            <div className={`gal-inner ${gradient} w-full transition-transform duration-700 ease group-hover:scale-[1.04] relative
                            ${tall ? 'min-h-[504px] max-md:min-h-[320px] max-sm:min-h-[320px]' : 'min-h-[250px] max-sm:min-h-[190px]'}
                            flex items-end p-5
                            [&:hover_.gal-overlay]:opacity-100 [&:hover_.gal-label]:opacity-100 [&:hover_.gal-label]:translate-y-0`}
            >
              <div className="gal-overlay absolute inset-0 bg-[linear-gradient(to_top,rgba(42,46,38,0.6)_0%,transparent_60%)] opacity-0 transition-opacity duration-[400ms]
                              max-sm:opacity-100" />
              <p className={`gal-label relative z-[1] font-display text-[18px] italic text-white opacity-0 translate-y-2 transition-all duration-[400ms]
                            max-sm:opacity-100 max-sm:translate-y-0 max-sm:text-[16px]`}>
                {label}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
