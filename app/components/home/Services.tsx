import { SectionHeader } from '@/app/components/ui/SectionHeader'

const services = [
  {
    num: '01', name: 'Весільне оформлення', kind: 'Wedding',
    icon: '🌸',
    desc: 'Повне флористичне оформлення весілля: арки, фотозони, декор залу, букет нареченої та бутоньєрка.',
    gradient: 'bg-[linear-gradient(145deg,#c9ddd4,#8a9d72_80%)]',
  },
  {
    num: '02', name: 'День народження', kind: 'Birthday',
    icon: '🎂',
    desc: 'Яскраві та ніжні флористичні декорації для днів народження будь-якого стилю та масштабу.',
    gradient: 'bg-[linear-gradient(145deg,#a8c5b5,#4a5740_80%)]',
  },
  {
    num: '03', name: 'Фотозони', kind: 'Photo Zone',
    icon: '📸',
    desc: 'Неповторні квіткові інсталяції для фотографування: фони з живих квітів, арки та квіткові стіни.',
    gradient: 'bg-[linear-gradient(145deg,#8a9d72,#6b7c5a_50%,#c9ddd4)]',
  },
  {
    num: '04', name: 'Оформлення столів', kind: 'Table Design',
    icon: '🍽️',
    desc: 'Стильні центральні композиції та флористичні акценти для банкетних столів.',
    gradient: 'bg-[linear-gradient(145deg,#e8f2ee,#a8c5b5_60%,#6b7c5a)]',
  },
  {
    num: '05', name: 'Декор приміщень', kind: 'Hall Decor',
    icon: '🏛️',
    desc: 'Комплексне оформлення залів, вхідних груп та вуличних зон з використанням сезонних квітів.',
    gradient: 'bg-[linear-gradient(145deg,#6b7c5a,#8aac9a_60%,#e8f2ee)]',
  },
  {
    num: '06', name: 'Корпоративні події', kind: 'Corporate',
    icon: '💼',
    desc: 'Представницьке флористичне оформлення конференцій, прийомів та корпоративних вечірок.',
    gradient: 'bg-[linear-gradient(145deg,#c4a96a,#a8c5b5_50%,#4a5740)]',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="bg-sand px-20 py-[120px] max-md:px-7 max-md:py-20 max-sm:px-[18px] max-sm:py-[62px]"
    >
      <SectionHeader
        tag="Що ми пропонуємо"
        title={<>Наші <em className="italic text-olive">послуги</em></>}
      />

      <div className="grid grid-cols-3 gap-[3px] max-md:grid-cols-2 max-sm:grid-cols-1">
        {services.map(({ num, name, kind, icon, desc, gradient }, i) => (
          <article
            key={name}
            className={`bg-warm-white transition-transform duration-[400ms] hover:-translate-y-[6px] reveal reveal-d${i % 3}`}
          >
            <div className="h-[280px] overflow-hidden max-md:h-60 max-sm:h-[200px]">
              <div className={`${gradient} svc-img-inner w-full h-full transition-transform duration-700 ease hover:scale-[1.06] flex flex-col items-center justify-center gap-3 text-white/80 font-display tracking-[0.2em] uppercase`}>
                <span className="text-[42px]">{icon}</span>
                <span className="text-[12px]">{kind}</span>
              </div>
            </div>

            <div className="p-8 max-md:p-6">
              <p className="font-display text-[13px] text-gold mb-[10px]">{num}</p>
              <h3 className="font-display text-[26px] mb-[14px] max-sm:text-[22px]">{name}</h3>
              <p className="text-[13px] leading-[1.8] text-ink-light">{desc}</p>
              <a href="#cta" className="inline-flex mt-6 text-[11px] tracking-[0.15em] uppercase text-olive no-underline max-sm:tracking-[0.1em]">
                Дізнатись більше →
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
