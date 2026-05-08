import { SectionHeader } from '@/app/components/ui/SectionHeader'

const steps = [
  { num: '01', title: 'Консультація', text: 'Зустрічаємось або спілкуємось онлайн, дізнаємось про ваші побажання, стиль і бюджет.' },
  { num: '02', title: 'Концепція',    text: 'Розробляємо індивідуальну концепцію оформлення з мудбордами та ескізами.' },
  { num: '03', title: 'Підготовка',   text: 'Підбираємо свіжі квіти, матеріали та готуємо всі елементи декору.' },
  { num: '04', title: 'Оформлення',   text: 'Приїжджаємо на локацію та створюємо атмосферу вашого свята під ключ.' },
]

export function Process() {
  return (
    <section
      id="process"
      className="bg-olive-dark px-20 py-[120px] max-md:px-7 max-md:py-20 max-sm:px-[18px] max-sm:py-[62px]"
    >
      <SectionHeader
        tag="Як ми працюємо"
        title={<>Від ідеї до <em className="italic text-mint-light">втілення</em></>}
        light
      />

      <div className="grid grid-cols-4 gap-[2px] mt-20 max-md:grid-cols-2 max-sm:grid-cols-1 max-md:mt-14 max-sm:mt-14">
        {steps.map(({ num, title, text }, i) => (
          <article
            key={num}
            className={`p-10 border border-mint-light/[0.12] bg-white/[0.04] reveal reveal-d${i}
                        max-md:p-7 max-sm:p-[22px]`}
          >
            <div className="w-14 h-14 border border-gold flex items-center justify-center font-display text-[22px] text-gold mb-8
                            max-sm:w-12 max-sm:h-12 max-sm:text-[19px] max-sm:mb-5">
              {num}
            </div>
            <h3 className="font-display text-[22px] text-mint-light mb-[14px] max-sm:text-[20px]">{title}</h3>
            <p className="text-[13px] leading-[1.8] text-mint-light/70">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
