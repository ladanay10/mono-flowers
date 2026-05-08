import { ContactForm } from '@/app/components/ContactForm'

const contacts = [
  { label: 'Телефон',       val: '+380 680 540 955', href: 'tel:+380680540955' },
  { label: 'Instagram',     val: '@mono__flowers_',  href: 'https://www.instagram.com/mono__flowers_', external: true },
  { label: 'Години роботи', val: '09:00 – 18:00',   href: null },
]

export function Booking() {
  return (
    <section
      id="cta"
      className="grid min-h-screen [grid-template-columns:5fr_6fr] max-md:grid-cols-1"
    >
      {/* Info panel */}
      <div className="bg-olive-dark flex flex-col justify-center px-[72px] py-[120px]
                      max-[1100px]:px-11 max-[1100px]:py-20
                      max-md:px-7 max-md:py-20 max-md:min-h-0
                      max-sm:px-[18px] max-sm:py-[62px]">
        <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-6 reveal">Замовити</p>

        <h2 className="font-display text-[clamp(32px,3vw,48px)] font-light leading-[1.2] text-cream mb-7 reveal reveal-d1">
          Залиште запит —<br />
          <em className="font-script not-italic text-mint-light text-[1.1em] tracking-[0.02em]">
            ми зв&apos;яжемося
          </em><br />
          найближчим часом
        </h2>

        <p className="text-[15px] leading-[1.9] text-mint-light/70 mb-[52px] max-w-[380px] reveal reveal-d2">
          Зв&apos;яжіться з нами для безкоштовної консультації та індивідуальної пропозиції для вашого заходу.
        </p>

        <div className="flex flex-col gap-6 border-t border-mint-light/20 pt-10 reveal reveal-d3">
          {contacts.map(({ label, val, href, external }) => {
            const inner = (
              <>
                <span className="text-[10px] tracking-[0.26em] uppercase text-gold">{label}</span>
                <span className="font-display text-[19px] font-light text-cream">{val}</span>
              </>
            )
            return href ? (
              <a
                key={label}
                href={href}
                className="flex flex-col gap-[5px] no-underline text-inherit transition-opacity hover:opacity-80"
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="flex flex-col gap-[5px]">{inner}</div>
            )
          })}
        </div>
      </div>

      {/* Form panel */}
      <div className="bg-warm-white flex flex-col justify-center px-[72px] py-20
                      max-[1100px]:px-11
                      max-md:px-7 max-md:py-[60px]
                      max-sm:px-[18px] max-sm:py-[62px]">
        <div className="mb-9">
          <p className="text-[10px] tracking-[0.28em] uppercase text-gold mb-[14px]">Форма замовлення</p>
          <h3 className="font-display text-[26px] font-light text-ink m-0">Розкажіть про вашу подію</h3>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
