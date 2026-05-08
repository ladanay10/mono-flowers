'use client'

import { useActionState } from 'react'
import { submitInquiry } from '@/app/actions'

const EVENT_TYPES = [
  { v: 'wedding',     l: 'Весілля' },
  { v: 'birthday',    l: 'День народження' },
  { v: 'christening', l: 'Хрестини' },
  { v: 'engagement',  l: 'Заручини' },
  { v: 'corporate',   l: 'Корпоратив' },
  { v: 'photoshoot',  l: 'Фотосесія' },
  { v: 'other',       l: 'Інше' },
]

const BUDGETS = [
  { v: '400-800',  l: 'від 400 до 800 грн' },
  { v: '800-3000', l: 'від 800 до 3 000 грн' },
  { v: '3000+',    l: 'від 3 000 грн' },
  { v: 'discuss',  l: 'Обговоримо' },
]

const inputCls = `
  w-full font-body text-[14px] text-ink bg-cream border border-mint
  px-4 py-[13px] min-h-[48px] outline-none appearance-none rounded-none
  transition-[border-color,box-shadow] duration-[250ms]
  focus:border-olive focus:shadow-[0_0_0_3px_rgba(107,124,90,0.1)]
`
const labelCls = 'block text-[10px] tracking-[0.22em] uppercase text-ink-mid mb-[7px] [&>span]:text-gold'

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitInquiry, null)

  if (state?.ok) {
    return (
      <div className="py-[60px] px-8 text-center flex flex-col items-center gap-[18px]">
        <div className="w-[60px] h-[60px] flex items-center justify-center border border-gold text-gold text-[22px]">
          ✦
        </div>
        <h3 className="font-display text-[32px] font-light text-olive-dark m-0">Дякуємо за запит!</h3>
        <p className="text-[14px] leading-[1.8] text-ink-light max-w-[340px] m-0">
          Ми отримали ваше звернення і зв&apos;яжемося найближчим часом.
        </p>
      </div>
    )
  }

  return (
    <form className="flex flex-col gap-[18px]" action={formAction} noValidate>
      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div>
          <label className={labelCls} htmlFor="bf-name">Ваше ім&apos;я <span>*</span></label>
          <input className={inputCls} type="text" id="bf-name" name="name" placeholder="Олена Іваненко" required autoComplete="name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="bf-phone">Телефон <span>*</span></label>
          <input className={inputCls} type="tel"  id="bf-phone" name="phone" placeholder="+380 68 054 09 55" required autoComplete="tel" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div>
          <label className={labelCls} htmlFor="bf-email">Email</label>
          <input className={inputCls} type="email" id="bf-email" name="email" placeholder="elena@gmail.com" autoComplete="email" />
        </div>
        <div>
          <label className={labelCls} htmlFor="bf-event">Тип події <span>*</span></label>
          <select className={`${inputCls} form-select cursor-pointer`} id="bf-event" name="eventType" required defaultValue="">
            <option value="" disabled>Оберіть тип події</option>
            {EVENT_TYPES.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
        <div>
          <label className={labelCls} htmlFor="bf-date">Дата події</label>
          <input className={inputCls} type="date" id="bf-date" name="eventDate" />
        </div>
        <div>
          <label className={labelCls} htmlFor="bf-budget">Бюджет</label>
          <select className={`${inputCls} form-select cursor-pointer`} id="bf-budget" name="budget" defaultValue="">
            <option value="" disabled>Оберіть бюджет</option>
            {BUDGETS.map(({ v, l }) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="bf-msg">Побажання</label>
        <textarea
          className={`${inputCls} resize-y min-h-[112px]`}
          id="bf-msg" name="message" rows={4}
          placeholder="Розкажіть про захід, стиль, кількість гостей..."
        />
      </div>

      {state?.err && (
        <p className="text-[13px] text-red-700 px-[14px] py-[10px] bg-red-50 border-l-[3px] border-red-700" role="alert">
          {state.err}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full font-body text-[12px] tracking-[0.24em] uppercase text-cream bg-olive border-none py-[18px] px-8 transition-all duration-300 hover:not-disabled:bg-olive-dark hover:not-disabled:-translate-y-px disabled:opacity-55"
      >
        {isPending ? 'Надсилаємо…' : 'Надіслати запит →'}
      </button>
    </form>
  )
}
